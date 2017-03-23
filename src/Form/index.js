import React,{PropTypes,PureComponent,Children,cloneElement} from 'react'
import Toast from '../Dialog/Toast'
import classnames from 'classnames'
import map from 'lodash/map'
import '../../style/Form/form.scss'

export default class Form extends PureComponent{
    static rules={
        username:{
            func(value){
                return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)||/^1[0-9]{10}$/.test(value);
            },
            des:'%s格式不正确'
        },
        tel:{
            regExp:/^1[0-9]{10}$/,
            des:'%s必须是手机号'
        },
        email:{
            regExp:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            des:'%s必须是邮箱'
        },
        pwd:{
            regExp:/(?!\d+$)\w+/i,
            des:'%s可以包含数字或字母，但不可全为数字'
        }
    }
    constructor(){
        super();
        this.data={};
        this.fields={};
        this.extraValidateCache={};
        this.validateField=this.validateField.bind(this);
        this.submit=this.submit.bind(this);
    }
    componentWillMount(){
        const {children}=this.props;
        this.children=this.mapChildren(children);
    }
    dispatch(name,data){
        return this.validateField(name,data).then((res)=>{
            if(res){
                this.data[name]=data;
                return true;
            }else{
                return this.fields[name].msg;
            }
        });
    }
    validateField(name,value){
        let field=this.fields[name];
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
            if(value===''||value===undefined||(Array.isArray(value)&&value.length==0)){
                if(isRequired){
                    field.msg=`${field.label}不能为空`;
                    return Promise.resolve(field.pass=false);
                }else{
                    return Promise.resolve(field.pass=true);
                }
            }

            //执行长度校验
            if(length&&!Array.isArray(value)){
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
                            return Promise.resolve(field.pass=false);
                        }
                    }
                }else{
                    if(value.length<start){
                        pass[name]=`${field.label}必须大于${start}个字符`;
                        return Promise.resolve(field.pass=false);
                    }
                }
            }

            //执行类型校验
            if(type.length>0&&!Array.isArray(value)){
                for(let rule of type){
                    rule=Form.rules[rule];
                    if(rule.func&&typeof rule.func=='function'&&!rule.func(value)){
                        field.msg=rule.des.replace('%s',field.label);
                        return Promise.resolve(field.pass=false);
                    }else if(rule.regExp&&rule.regExp instanceof RegExp&&!rule.regExp.test(value)){
                        field.msg=rule.des.replace('%s',field.label);
                        return Promise.resolve(field.pass=false);
                    }
                }
            }
        }
        //执行用户自定义校验
        if(typeof field.extra=='function'){
            return new Promise((resolve)=>{
                if(!Array.isArray(value)&&this.extraValidateCache[`${field.name}-${value}`]!==undefined){
                    resolve(this.extraValidateCache[`${field.name}-${value}`]);
                    return;
                }
                field.extra({field,value,callback:(result)=>{
                    !Array.isArray(value)?this.extraValidateCache[`${field.name}-${value}`]=result:'';
                    resolve(result);
                }});
            }).then((result)=>{
                if(result!==true){
                    field.msg=result;
                    return field.pass=false;
                }else{
                    return field.pass=true;
                }
            });
        }else{
            return Promise.resolve(field.pass=true);
        }
    }
    submit(){
        const {submit}=this.props;
        var errors=[];
        return Promise.all(map(this.fields,(field)=>{
            if(field.pass===undefined){
                return this.validateField(field.name,this.data[field.name]||'').then((res)=>{
                    if(res===false){
                        errors.push(field.msg);
                    }
                    return res;
                });
            }else if(field.pass===false){
                errors.push(field.msg);
                return Promise.resolve(false);
            }else{
                return Promise.resolve(true);
            }
        })).then((res)=>{
            if(errors.length==0){
                if(submit){
                    let res=submit(this.data);
                    if(res&&typeof res.then=='function'){
                        return res;
                    }
                }
            }else{
                new Toast(errors[0]);
            }
        });
    }
    mapChildren(component){
        return Children.map(component,(child)=>{
            if(child.type.formType=='field'&&child.props.name){
                this.fields[child.props.name]={
                    name:child.props.name,
                    rule:child.props.rule,
                    label:child.props.label||'该字段',
                    extra:child.props.extra
                };
                return cloneElement(child,{dispatch:this.dispatch.bind(this,child.props.name),data:Object.assign({},this.data)});
            }else if(child.type.formType=='SubmitButton'){
                return cloneElement(child,{submit:this.submit});
            }else if(child.props.children){
                return cloneElement(child,{
                    children:this.mapChildren(child.props.children)
                });
            }
            return child;
        });
    }
    render(){
        const {inline,className}=this.props;
        return (
            <div className={classnames(className,"candy-mob-form",{
                "candy-mob-form--inline":inline
            })}>
                {this.children}
            </div>
        );
    }
}