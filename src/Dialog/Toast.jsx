import React,{PureComponent} from 'react'
import classnames from 'classnames'
import layer from '../higherOrder/layerTouchClose'
import '../../style/Dialog/toast.scss'

@layer
export default class Toast extends PureComponent{
    static defaultProps={
        type:'error',
        time:2000
    }
    componentDidMount(){
        const {remove,callback,time}=this.props;
        if(time){
            this.timer=setTimeout(()=>{
                remove();
                if(typeof callback=='function'){
                    callback();
                }
            },time);
        }
    }
    render(){
        const {className,type,children}=this.props;
        return (
            <div className={classnames("candy-mob-toast",className)}>
                <div className="candy-mob-toast__inner">
                    <div className={classnames("candy-mob-toast__icon",{
                            "candy-mob-toast__icon--error":type=='error',
                            "candy-mob-toast__icon--success":type=='success',
                            "candy-mob-toast__icon--loading":type=='loading'
                        })}></div>
                    <div className="candy-mob-toast__content">{children||'正在加载中...'}</div>
                </div>
            </div>
        );
    }
}