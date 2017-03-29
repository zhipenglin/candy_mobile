import React,{PureComponent} from 'react'
import classnames from 'classnames'
import {compose} from 'recompose'
import field from '../higherOrder/field'
import fieldDecorator from '../higherOrder/fieldDecorator'
import SelectDate,{SelectDateTime,SelectTime} from '../Select/SelectDate'

const core=function(Component){
    return class extends PureComponent{
        static defaultProps={
            placeholder:'请选择'
        }
        constructor(){
            super();
            this.clickHandler=this.clickHandler.bind(this);
        }
        componentWillMount(){
            const {value,onValueChange,onActiveChange,...others}=this.props;
            this.select=new Component({
                onChange:(value,data)=>{
                    onValueChange(value);
                    onActiveChange();
                    this.select.change({children:data});
                },onCancel(){
                    onValueChange();
                    onActiveChange();
                },persistent:true,...others
            });
        }
        componentWillUnmount(){
            this.select.destroy();
        }
        clickHandler(){
            const {onActiveChange}=this.props;
            onActiveChange(true);
            this.select.show();
        }
        render(){
            const {value,placeholder,className,children}=this.props;
            return (
                <div className={classnames('candy-mob-form-select',className)} onClick={this.clickHandler}>{value?value:<span className="candy-mob-form-select__placeholder">{placeholder}</span>}</div>
            );
        }
    }
}

export default compose(field,fieldDecorator,core)(SelectDate);
export const SelectDateTimeField=compose(field,fieldDecorator,core)(SelectDateTime);
export const SelectTimeField=compose(field,fieldDecorator,core)(SelectTime);