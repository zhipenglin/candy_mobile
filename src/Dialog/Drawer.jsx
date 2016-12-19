import React,{Component,cloneElement} from 'react'
import classnames from 'classnames'
import layer from '../higherOrder/layer'
import '../../style/Dialog/drawer.scss'

@layer
export default class Drawer extends Component{
    touchStartHandler=(e)=>{
        e.preventDefault();
        const {remove}=this.props;
        remove();
    }
    render(){
        const {className,children,remove,right}=this.props;

        return (
            <div className={classnames('candy-mob-drawer',{
                'candy-mob-drawer--right':right
            },className)}>
                <div className="candy-mob-drawer__cover" onTouchStart={this.touchStartHandler}></div>
                <div className="candy-mob-drawer__inner">
                    {cloneElement(children,{
                        remove:remove
                    })}
                </div>
            </div>
        );
    }
}