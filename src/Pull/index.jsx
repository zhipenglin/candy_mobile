import React,{PureComponent} from 'react'
import classnames from 'classnames'
import Scroll from '../Scroll'
import '../../style/Pull/style.scss'

export default class Pull extends PureComponent{
    static defaultProps={
        upLoad(){},
        downLoad(){},
        type:'up-down'
    }
    constructor(){
        super();
        this.state={
            upStatus:2,//1:正常状态 2:未达到触发条件 11:正在加载状态 12:禁用状态 13:加载完成
            downStatus:1//1:正常状态 11:正在加载状态 12:禁用状态 13:加载完成
        };
    }
    componentDidMount(){
        const {type}=this.props;
        switch (type){
            case 'up-down':
                break;
            case 'up':
                this.setState({
                    downStatus:12
                });
                break;
            case 'down':
                this.setState({
                    upStatus:12
                });
                break;
            default:
                this.setState({
                    upStatus:12,
                    downStatus:12
                });
        }
    }
    _downLoadHandler=()=>{
        const {downLoad}=this.props;
        if(this.state.downStatus==1){
            var result=downLoad();
            if(result instanceof Promise){
                this.setState({
                    downStatus:11
                });
                result.then((complete)=>{
                    this.setState({
                        downStatus:complete===true?13:1
                    });
                }).catch(()=>{
                    this.setState({
                        downStatus:1
                    });
                });
            }
        }

    }
    _upLoadHandler=()=>{
        const {upLoad}=this.props;
        if(this.state.upStatus==1){
            var result=upLoad();
            if(result instanceof Promise){
                this.setState({
                    upStatus:11
                });
                result.then((complete)=>{
                    this.setState({
                        upStatus:complete===true?13:1
                    });
                }).catch(()=>{
                    this.setState({
                        upStatus:1
                    });
                });
            }
        }
    }
    _scrollHandler=(delta)=>{
        if(this.refs.upIcon&&delta>0&&(this.state.upStatus===1||this.state.upStatus===2)){
            if(delta>this.refs.upIcon.clientHeight){
                this.setState({
                    upStatus:1
                });
            }else{
                this.setState({
                    upStatus:2
                });
            }
        }
    }
    render(){
        const {upLoad,downLoad,type,height,children,...reset}=this.props;
        var pullUpIcon=null,pullDownIcon=null;
        if(this.state.upStatus!==12){
            pullUpIcon=<div ref="upIcon" className={classnames('candy-mob-pull__up-icon',{
                    "candy-mob-pull__up-icon--loading":this.state.upStatus===11,
                    "candy-mob-pull__up-icon--complete":this.state.upStatus===13,
                    'candy-mob-pull__up-icon--reach':this.state.upStatus===1
                })} />
        }
        if(this.state.downStatus!==12){
            pullDownIcon=<div ref="downIcon" className={classnames("candy-mob-pull__down-icon",{
                    "candy-mob-pull__down-icon--loading":this.state.downStatus===11,
                    "candy-mob-pull__down-icon--complete":this.state.downStatus===13
                })}/>
        }
        return (
            <div className="candy-mob-pull" {...reset}>
                <Scroll onReachBottom={this._downLoadHandler} onReachTop={this._upLoadHandler} onMove={this._scrollHandler}>
                    <div className="candy-mob-pull__content">
                        {pullUpIcon}
                        <div className="candy-mob-pull__list">
                            {children}
                        </div>
                        {pullDownIcon}
                    </div>
                </Scroll>
            </div>
        );
    }
}