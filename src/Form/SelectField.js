import React,{PureComponent} from 'react'
import classnames from 'classnames'
import {compose} from 'recompose'
import field from '../higherOrder/field'
import fieldDecorator from '../higherOrder/fieldDecorator'
import Select,{getDefault,dataFormat} from '../Select'

@compose(field,fieldDecorator)
export default class SelectField extends PureComponent{
    static defaultProps={
        placeholder:'请选择'
    }
    constructor(){
        super();
        this.clickHandler=this.clickHandler.bind(this);
    }
    componentWillMount(){
        const {value,children,onValueChange,onActiveChange,...others}=this.props;
        this.selectData=dataFormat(children);
        this.setDefaultValue();
        this.select=new Select(this.selectData,{onChange:(value,data)=>{
            onValueChange(value);
            onActiveChange();
            this.select.change({children:data});
        },onCancel:()=>{
            onValueChange();
            onActiveChange();
        },persistent:true,...others});
    }
    clickHandler(){
        const {onActiveChange}=this.props;
        onActiveChange(true);
        this.select.show();
    }
    setDefaultValue(){
        const {value}=this.props;
        if(Array.isArray(value)){
            value.forEach((item,i)=>{
                this.selectData[i].defaultValue=item;
            });
        }else{
            this.selectData[0].defaultValue=value;
        }
        this.selectData=dataFormat(this.selectData);
    }
    mapValue(){
        const {value}=this.props;
        var list=[];
        if(!value){
            return;
        }
        if(Array.isArray(value)){
            if(value.length!=this.selectData.length){
                return;
            }
            for(let i=0;i<value.length;i++){
                let selected=this.selectData[i].list.find(group=>group.value==value[i]);
                if(!selected){
                    return;
                }
                list.push(selected.text);
            }
            return list.join(',');
        }else{
            if(this.selectData.length!=1){
                return;
            }
            let selected=this.selectData[0].list.find(group=>group.value==value);
            if(!selected){
                return;
            }
            return selected.text;
        }
    }
    render(){
        const {value,placeholder,className,children}=this.props;
        const text=this.mapValue();
        return (
            <div className={classnames('candy-mob-form-select',className)} onClick={this.clickHandler}>{text?text:<span className="candy-mob-form-select__placeholder">{placeholder}</span>}</div>
        );
    }
}