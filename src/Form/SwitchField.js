import React,{PureComponent} from 'react'
import {compose} from 'recompose'
import field from '../higherOrder/field'
import fieldDecorator from '../higherOrder/fieldDecorator'
import Switch from '../Switch'

@compose(field,fieldDecorator)
export default class SwitchField extends PureComponent{
    constructor(){
        super();
        this.onChangeHandler=this.onChangeHandler.bind(this);
    }
    onChangeHandler(value){
        const {onValueChange}=this.props;
        onValueChange(value);
    }
    render(){
        const {value,onValueChange,onActiveChange,...others}=this.props;
        return <Switch {...others} value={value} onChange={this.onChangeHandler}></Switch>
    }
}