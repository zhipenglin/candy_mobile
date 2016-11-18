import React,{Component} from 'react'
import classnames from 'classnames'
import layer from '../higherOrder/layer'
import '../../style/Dialog/toast.scss'

@layer
export default class Toast extends Component{
    static defaultProps={
        type:'error',
        time:2000
    }
    componentDidMount(){
        const {remove,time}=this.props;
        if(time){
            setTimeout(()=>{
                remove();
            },time);
        }
    }
    render(){
        const {show,className,type,children}=this.props;
        if(show){
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
        }else{
            return null;
        }
    }
}