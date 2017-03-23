import React,{PureComponent,PropTypes} from 'react'
import classnames from 'classnames'
import field from '../higherOrder/field'
import fieldDecorator from '../higherOrder/fieldDecorator'
import {compose,withHandlers} from 'recompose'

@compose(field,fieldDecorator)
export default class Input extends PureComponent {
    static propTypes={
        value:PropTypes.string,
        onValueChange:PropTypes.func
    }
    static defaultProps={
        value:'',
        onValueChange:()=>{}
    }
    constructor(){
        super();
        this.onBlurHandler=this.onBlurHandler.bind(this);
        this.onChangeHandler=this.onChangeHandler.bind(this);
    }
    onBlurHandler(event){
        const {onValueChange,onBlur}=this.props;
        onValueChange(event.target.value);
        typeof onBlur=='function'&&onBlur(event);
    }
    onChangeHandler(event){
        const {onValueChange,onChange}=this.props;
        onValueChange(event.target.value,true);
        typeof onChange=='function'&&onChange(event);
    }
    render(){
        const {value,type,maxLength,onValueChange,...others}=this.props;
        if(type=='textarea'){
            return (
                <div>
                    <textarea {...others} value={value} onBlur={this.onBlurHandler} onChange={this.onChangeHandler}></textarea>
                    {maxLength?<span className="font-number">{maxLength-value.length>=0?(maxLength-value.length)+'/'+maxLength:'超出'+(value.length-maxLength)+'字符'}</span>:null}
                </div>
            );
        }
        if(type=='password'){
            return <input type="password" {...others} value={value} onBlur={this.onBlurHandler} onChange={this.onChangeHandler}/>
        }
        return <input type="text" {...others} value={value} onBlur={this.onBlurHandler} onChange={this.onChangeHandler}/>
    }
}