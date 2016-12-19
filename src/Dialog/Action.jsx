import React,{Component} from 'react'
import classnames from 'classnames'
import layer from '../higherOrder/layer'
import '../../style/Dialog/action.scss'
import Button from '../Button'

@layer
export default class Action extends Component{
    actionClickHandler=(callback)=>{
        const {remove}=this.props;
        if(typeof callback=='function'){
            callback(remove);
        }else{
            remove();
        }
    }
    renderAction(data,key){
        return (
            <div className={classnames("candy-mob-action__item",{
                "candy-mob-action__item--label":data.label
            })} key={key}>{data.label?data.text:<Button className="candy-mob-action__button" type="ghost" style={{'color':data.color}} onClick={this.actionClickHandler.bind(this,data.callback)}>{data.text}</Button>}</div>
        );
    }
    touchStartHandler=(e)=>{
        e.preventDefault();
        const {remove}=this.props;
        remove();
    }
    renderGroup(data,key){
        return (
            <div className="candy-mob-action__group" key={key}>{
                data.map((item,i)=>{
                    return this.renderAction(item,i);
                })
            }</div>
        );
    }
    render(){
        const {className,children}=this.props;
        if(!Array.isArray(children)){
            throw Error('参数必须为数组');
        }
        const childrenContent=children.map((data,i)=>{
            if(Array.isArray(data)){
                return this.renderGroup(data,i);
            }else{
                return this.renderAction(data,i);
            }
        });
        return (
            <div className={classnames("candy-mob-action",className)}>
                <div className="candy-mob-action__cover" onTouchStart={this.touchStartHandler}></div>
                <div className="candy-mob-action__inner">
                    <div className="candy-mob-action__animate">
                        {childrenContent}
                    </div>
                </div>
            </div>
        );
    }
}