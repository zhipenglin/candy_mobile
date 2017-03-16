/**
 * Created by ifchangetoclzp on 2016/12/15.
 */
import React,{Component} from 'react'
import classnames from 'classnames'
import {pure} from 'recompose'
import layer from '../higherOrder/layer'
import '../../style/Dialog/confirm.scss'
import Button from '../Button'

export default layer(pure(({className,title,cancelCallback,confirmCallback,textCancel,textConfirm,remove,children})=>{
    var cancelClickHandler=()=>{
        if(typeof cancelCallback=='function'){
            if(cancelCallback(remove)!==false){
                remove();
            }
        }else{
            remove();
        }
    },confirmClickHandler=()=>{
        if(typeof confirmCallback=='function'){
            if(confirmCallback(remove)!==false){
                remove();
            }
        }else{
            remove();
        }
    }
    return (
        <div className={classnames("candy-mob-confirm",className)}>
            <div className="candy-mob-confirm__inner">
                <div className="candy-mob-confirm__animate">
                    <div className="candy-mob-confirm__content">
                        {title?<div className="candy-mob-confirm__title">{title}</div>:null}
                        <div className="candy-mob-confirm__msg">{children}</div>
                    </div>
                    <div className={classnames("candy-mob-confirm__buttons",{
                            "candy-mob-confirm__buttons--has-cancel":cancelCallback||textCancel
                        })}>
                        {cancelCallback||textCancel?<Button className="candy-mob-confirm__button" type="ghost" onClick={cancelClickHandler}>{textCancel||'取消'}</Button>:null}
                        <Button className="candy-mob-confirm__button" type="ghost" onClick={confirmClickHandler}>{textConfirm||'确定'}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}));