import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import dom from '../fn/dom'
import autoPrefix from '../fn/autoPrefixer'
import Touch from '../Touch'
import raf,{cancelRaf} from '../fn/raf'
import '../../style/Scroll/style.scss'


export default class Scroll extends Component{
    static defaultProps={
        onScroll(){},
        onMove(){},
        onScrollEnd(){},
        onReachTop(){},
        onReachBottom(){}
    }
    constructor(){
        super();
        this.state={
            height:0,
            deltaY:0
        };
    }
    componentDidMount(){
        const {height}=this.props;
        this.setState({
            height:height||document.body.clientHeight-dom.offset(ReactDOM.findDOMNode(this)).top
        });
    }
    _notReachSide(){
        const {onReachTop,onReachBottom}=this.props;
        if(this.state.deltaY>0){
            this.animate(400);
            this.setState({
                deltaY:0
            });
            onReachTop(this.state.deltaY);
        }else if(this.state.height-this.state.deltaY>this.refs.inner.clientHeight){
            this.animate(400);
            this.setState({
                deltaY:this.state.height-this.refs.inner.clientHeight
            });
            onReachBottom(this.state.deltaY);
        }else{
            this.animate();
            return true;
        }
    }
    _moveHandler=(event,superEvent)=>{
        const {onScroll,onMove}=this.props;
        this.cancelAnimate();
        cancelRaf(this.raf);
        var deltaY=superEvent.deltaY,top=this.state.deltaY,bottom=this.state.height-this.state.deltaY-this.refs.inner.clientHeight;
        if(top>0){
            deltaY*=0.2;
        }else if(bottom>0){
            deltaY*=0.2;
        }else{
            onScroll(this.state.deltaY+deltaY);
        }
        this.setState({
            deltaY:this.state.deltaY+deltaY
        },()=>{
            onMove(this.state.deltaY);
        });
    }
    _endHandler=(event,superEvent)=>{
        const {onScrollEnd}=this.props;
        var speed=superEvent.deltaY;
        var step=()=>{
            this.raf=raf(()=>{
                this.setState({
                    deltaY:this.state.deltaY+speed
                },()=>{
                    if(this.state.deltaY>0||this.state.height-this.state.deltaY>this.refs.inner.clientHeight){
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
                        onScrollEnd(this.state.deltaY);
                        this._notReachSide()
                    }
                });
            });
        };
        if(this._notReachSide()&&Math.abs(speed)>4){//去抖动 判断边界
            step();
        }
    }
    animate(time=50){
        const style = this.refs.inner.style;
        autoPrefix(style, 'transition', `transform ${time}ms`);
    }
    cancelAnimate(){
        const style = this.refs.inner.style;
        autoPrefix(style, 'transition-duration', '0ms');
    }
    render(){
        const {className,style,children,onScroll,onMove,onScrollEnd,onReachTop,onReachBottom,...reset}=this.props;
        return (
            <div className={classnames('candy-mob-scroll',className)} style={Object.assign({},style,{height:`${this.state.height}px`})} {...reset}>
                <Touch onPressMove={this._moveHandler} onTouchEnd={this._endHandler}>
                    <div className="candy-mob-sroll__inner" ref="inner" style={{transform:`translateY(${this.state.deltaY}px)`}}>
                        {children}
                    </div>
                </Touch>
            </div>
        );
    }
}