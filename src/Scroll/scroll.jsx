import React,{PureComponent} from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Touch from '../Touch'
import raf,{cancelRaf} from '../fn/raf'
import '../../style/Scroll/style.scss'

export default class Scroll extends PureComponent{
    state={
        deltaX:0,
        deltaY:0,
        active:true
    }
    componentDidMount(){
        const {initY}=this.props;
        this.setState({
            deltaY:initY||0
        });
    }
    componentDidUpdate(){
        const {onScrollEnd}=this.props;
        if(this.state.active){
            if(!this.notReachSide(false)){
                setTimeout(()=>{
                    onScrollEnd(this.state.deltaY);
                },0);
            }
        }
    }
    componentWillUnmount(){
        cancelRaf(this.raf);
    }
    touchStartHandler=(e)=>{
        e.preventDefault();
        this.setState({
            active:false
        });
        this.cancelAnimate();
    }
    pressMoveHandler=(event,superEvent)=>{
        var deltaY=superEvent.deltaY,top=this.state.deltaY,bottom=ReactDOM.findDOMNode(this).clientHeight-this.state.deltaY-this.refs.inner.offsetHeight;
        if(top>0){
            deltaY*=0.2;
        }else if(bottom>0){
            deltaY*=0.2;
        }
        this.setState({
            deltaY:this.state.deltaY+deltaY
        });
    }
    touchEndHandler=(event,superEvent)=>{
        const {itemHeight,onScrollEnd}=this.props;
        var speed=superEvent.deltaY;
        if(this.notReachSide()){
            this.animation(speed,()=>{
                if(itemHeight){
                    this.setState({
                        active:true,
                        deltaY:Math.round(this.state.deltaY/itemHeight)*itemHeight
                    });
                    this.notReachSide();
                }
                setTimeout(()=>{
                    onScrollEnd(this.state.deltaY);
                },0);
            });
        }else{
            setTimeout(()=>{
                onScrollEnd(this.state.deltaY);
            },0);
        }
    }
    notReachSide(trans=true){
        if(this.state.deltaY>0){
            this.setState({
                deltaY:0,
                active:trans
            });
        }else if(ReactDOM.findDOMNode(this).clientHeight-this.state.deltaY>this.refs.inner.offsetHeight){
            this.setState({
                deltaY:ReactDOM.findDOMNode(this).clientHeight-this.refs.inner.offsetHeight,
                active:trans
            });
        }else{
            return true;
        }
    }
    animation(speed,callback){
        var step=()=>{
            this.raf=raf(()=>{
                this.setState({
                    deltaY:this.state.deltaY+speed
                },()=>{
                    if(this.state.deltaY>0||ReactDOM.findDOMNode(this).clientHeight-this.state.deltaY>this.refs.inner.offsetHeight){
                        if(speed>8){
                            speed=8;
                        }
                        speed*=0.5;
                    }else{
                        speed*=0.95;
                    }
                    if(Math.abs(speed)>0.5){
                        step();
                    }else{
                        this.notReachSide();
                        callback&&callback();
                    }
                });
            });
        };
        if(Math.abs(speed)>2){//去抖动 判断边界
            step();
        }else{
            callback&&callback();
        }
    }
    cancelAnimate(){
        if(this.raf){
            cancelRaf(this.raf);
        }
    }
    render(){
        const {children}=this.props;
        return <div className={classnames('candy-mob-scroll')}>
            <Touch onTouchStart={this.touchStartHandler} onPressMove={this.pressMoveHandler} onTouchEnd={this.touchEndHandler}>
                <div className={classnames("candy-mob-scroll__inner",{
                    "candy-mob-scroll__inner--active":this.state.active
                })}ref="inner" style={{transform:`translate(${this.state.deltaX}px,${this.state.deltaY}px)`}}>
                    {children}
                </div>
            </Touch>
        </div>
    }
}