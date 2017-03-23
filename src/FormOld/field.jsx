import React,{Component} from 'react'
import classnames from 'classnames'
import '../../style/higherOrdder/field.scss'

export default function(ComposedComponent){
    return class field extends Component{
        static hasFormType='field'
        static defaultProps={
            value:'',
            onDataChange:()=>{}
        }
        constructor(){
            super();
            this.state={
                active:false
            };
        }
        setValue(value,isInit){
            const {onDataChange,name}=this.props;
            onDataChange(name,value,isInit);
        }
        dataChangeHandler=(value,isInit=false)=>{
            this.setValue(value,isInit);
        }
        activeChangeHandler=(isActive)=>{
            this.setState({
                active:isActive
            });
        }
        render(){
            const {onChange,className,name,onDataChange,onActiveChange,rule,label,extra,...reset}=this.props;
            return <div className={classnames("candy-mob-field",{
                "candy-mob-field--active":this.state.active
            },className)}><ComposedComponent onChange={this.dataChangeHandler} onActiveChange={this.activeChangeHandler} {...reset}/></div>;
        }
    }
}