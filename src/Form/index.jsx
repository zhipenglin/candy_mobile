import React,{Component,cloneElement} from 'react'
import classnames from 'classnames'
import Toast from '../Dialog/Toast'
import fetch from '../fn/fetch'
import debounce from 'lodash.debounce'
import '../../style/Form/form.scss';
export default class Form extends Component{
    static rules={
        username:{
            func(value){
                return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)||/^1[0-9]{10}$/.test(value);
            },
            des:'%s格式不正确'
        },
        pwd:{
            regExp:/(?!\d+$)\w+/i,
            des:'%s可以包含数字或字母，但不可全为数字'
        }
    }
    static defaultTypes={
        onChange:()=>{}
    }
    constructor(){
        super();
        this.data={};
        this.fields={};
        this.extraValidateCache={};
    }
    onDataChange=(key,value,isInit)=>{
        const {onChange}=this.props;
        this.fields[key].pass=undefined;
        if(value.toString()=='[object Object]'){
            this.data[key]=value.computed;
            if(!isInit){
                this.validateField(key,value.origin);
            }
        }else{
            this.data[key]=value;
            if(!isInit){
                this.validateField(key,value);
            }
        }
        onChange(this.data);
    }
    validateField=debounce(async (key,value)=>{
        console.log(key+'执行校验');
        let field=this.fields[key];
        if(field.rule){
            let isRequired,length,type=[],rule=field.rule.split(' ').filter((n)=>n);
            rule.forEach((n)=>{
                if(/^required|req$/i.test(n)){
                    isRequired=true;
                }else if(/^[0-9]+(-[0-9]+)?$/.test(n)){
                    length===undefined?length=n:'';
                }else if(Form.rules[n]){
                    type.push(n);
                }
            });

            //执行必须性校验
            if(value===''){
                if(isRequired){
                    this.fields[key].msg=`${field.label}不能为空`;
                    return field.pass=false;
                }else{
                    return field.pass=true;
                }
            }

            //执行长度校验
            if(length){
                let [start,end]=length.split('-');
                start=parseInt(start);
                if(end){
                    end=parseInt(end);
                    if(start>end){
                        throw new Error('rule设置错误,start不应该大于end');
                    }else{
                        if(value.length<start||value.length>end){
                            if(start==end){
                                field.msg=`${field.label}必须为${start}个字符`;
                            }else{
                                field.msg=`${field.label}必须为${start}-${end}个字符`;
                            }
                            return field.pass=false;
                        }
                    }
                }else{
                    if(value.length<start){
                        pass[name]=`${field.label}必须大于${start}个字符`;
                        return field.pass=false;
                    }
                }
            }

            //执行类型校验
            if(type.length>0){
                for(let rule of type){
                    rule=Form.rules[rule];
                    if(rule.func&&!rule.func(value)){
                        field.msg=rule.des.replace('%s',field.label);
                        return field.pass=false;
                    }else if(rule.regExp&&!rule.regExp.test(value)){
                        field.msg=rule.des.replace('%s',field.label);
                        return field.pass=false;
                    }
                }
            }
        }

        //执行用户自定义校验
        if(typeof field.extra=='function'){
            let result=await new Promise((resolve)=>{
                if(this.extraValidateCache[`${field.name}-${value}`]!==undefined){
                    resolve(this.extraValidateCache[`${field.name}-${value}`]);
                    return;
                }
                field.extra({field,value,callback:(result)=>{
                    this.extraValidateCache[`${field.name}-${value}`]=result;
                    resolve(result);
                }});
            });

            if(result!==true){
                field.msg=result;
                return field.pass=false;
            }
        }

        return field.pass=true;
    })
    async validateAll(){
        for(let key in this.fields){
            if(this.fields.hasOwnProperty(key)){
                if(this.fields[key].pass===undefined){
                    await this.validateField(key,this.data[key]);
                }
                if(this.fields[key].pass===false){
                    new Toast(this.fields[key].msg);
                    return false;
                }
            }
        }
        return true
    }
    submit=(change)=>{
        const {action}=this.props;
        this.validateAll().then((status)=>{
            if(status){
                if(action){
                    fetch(action,{
                        type:'post',
                        data:this.data
                    }).then((res)=>{
                        change();
                        if(res.status){
                            new Toast('登录成功',{type:'success'});
                        }
                    });
                }else{
                    console.warn('当前表单没有设置action');
                    change();
                }
            }else{
                change();
            }
        });
    }
    renderChildren(children){
        return React.Children.toArray(children).map((child,index)=>{
            if(!child.type){
                return child;
            }else if(child.type.hasFormType=='field'&&child.props.name){
                let props={
                    onDataChange:this.onDataChange
                };
                this.fields[child.props.name]={
                    name:child.props.name,
                    rule:child.props.rule,
                    label:child.props.label||'该字段',
                    extra:child.props.extra
                };
                return cloneElement(child,props);
            }else if(child.type.hasFormType=='SubmitButton'){
                return cloneElement(child,{
                    submit:this.submit,
                    loadingText:child.loadingText||'正在提交请求...'
                });
            }else if(child.props.children){
                return cloneElement(child,{
                    children:this.renderChildren(child.props.children)
                });
            }
            return child;
        });
    }
    render() {
        const {className,children}=this.props;
        return (
            <div className={classnames("candy-mob-form",className)}>{this.renderChildren(children)}</div>
        );
    }
}