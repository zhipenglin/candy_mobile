import React,{Component,cloneElement} from 'react'
import classnames from 'classnames'
import {pure} from 'recompose'
import layer from '../higherOrder/layerTouchClose'
import '../../style/Dialog/drawer.scss'

export default layer(pure(({className,children,remove,right})=>{
    if(!React.isValidElement(children)){
        throw new Error('该组件的第一个参数必须为react dom');
    }
    return (
        <div className={classnames('candy-mob-drawer',{
                'candy-mob-drawer--right':right
            },className)}>
            <div className="candy-mob-drawer__inner">
                {cloneElement(children,{
                    remove:remove
                })}
            </div>
        </div>
    );
}));