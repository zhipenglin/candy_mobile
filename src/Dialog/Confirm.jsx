/**
 * Created by ifchangetoclzp on 2016/12/15.
 */
import React,{Component} from 'react'
import classnames from 'classnames'
import layer from '../higherOrder/layer'
import '../../style/Dialog/confirm.scss'
import Button from '../Button'

@layer
export default class Confirm extends Component{
    cancelClickHandler=()=>{
        const {remove,cancelCallback}=this.props;
        if(typeof cancelCallback=='function'){
            cancelCallback(remove);
        }else{
            remove();
        }
    }
    confirmClickHandler=()=>{
        const {remove,confirmCallback}=this.props;
        if(typeof confirmCallback=='function'){
            confirmCallback(remove);
        }else{
            remove();
        }
    }
    render(){
        const {className,title,callbackCancel,textCancel,callbackConfirm,textConfirm,children}=this.props;
        return (
            <div className={classnames("candy-mob-confirm",className)}>
                <div className="candy-mob-confirm__inner">
                    <div className="candy-mob-confirm__animate">
                        <div className="candy-mob-confirm__content">
                            {title?<div className="candy-mob-confirm__title">{title}</div>:null}
                            <div className="candy-mob-confirm__msg">{children}</div>
                        </div>
                        <div className={classnames("candy-mob-confirm__buttons",{
                            "candy-mob-confirm__buttons--has-cancel":callbackCancel||textCancel
                        })}>
                            {callbackCancel||textCancel?<Button className="candy-mob-confirm__button" type="ghost" onClick={this.cancelClickHandler}>{textCancel||'取消'}</Button>:null}
                            <Button className="candy-mob-confirm__button" type="ghost" onClick={this.confirmClickHandler}>{textConfirm||'确定'}</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}