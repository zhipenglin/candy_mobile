/**
 * Created by ifchangetoclzp on 2016/10/24.
 */
import classnames from 'classnames'
import React,{Component,PropTypes,cloneElement} from 'react'
import ReactDOM from 'react-dom'
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup'
import CircleRipple from './CircleRipple'
import Dom from '../fn/dom'
import '../../style/Wave/style.scss'

const shift = ([, ...newArray]) => newArray;
const calcDiag=(a,b)=>{
    return Math.sqrt((a*a)+(b*b));
};
export default class Wave extends Component {
    static propTypes={
        centerRipple:PropTypes.bool,
        abortOnScroll:PropTypes.bool,
        disabled:PropTypes.bool,
        white:PropTypes.bool,
        outside:PropTypes.bool,
        opacity:PropTypes.number
    }
    static defaultProps={
        abortOnScroll:true,
        opacity:0.2
    }
    constructor(){
        super();

        this.state={
            hasRipples:false,
            nextKey:0,
            ripples:[]
        };
    }
    start(event){
        if(this.props.disabled){
            return;
        }
        let ripples=this.state.ripples;
        ripples=[...ripples,(
            <CircleRipple
                key={this.state.nextKey}
                style={!this.props.centerRipple?this.getRippleStyle(event):{}}
                white={this.props.white}
                opacity={this.props.opacity}
                outside={this.props.outside}
            ></CircleRipple>
        )];
        this.setState({
            hasRipples:true,
            nextKey:this.state.nextKey+1,
            ripples
        });
    }
    end(){
        const currentRipples=this.state.ripples;
        this.setState({
            hasRipples:currentRipples.length>1,
            ripples:shift(currentRipples)
        });
        if(this.props.abortOnScroll){
            this.stopListeningForScrollAbort();
        }
    }
    handleTouchStart=(event)=>{
        //event.stopPropagation();
        event.preventDefault();
        if(this.props.abortOnScroll&&event.touches){
            this.startListeningForScrollAbort(event);
            this.startTime=Date.now();
            this.start(event);
        }
    }
    handleTouchEnd=()=>{
        this.end();
    }
    handleTouchMove=(event)=>{
        const timeSinceStart=Math.abs(Date.now()-this.startTime);
        if(!this.state.hasRipples){
            return;
        }
        if(timeSinceStart>300){
            this.stopListeningForScrollAbort();
            return;
        }

        const deltaY=Math.abs(event.touches[0].clientY-this.firstTouchY);
        const deltaX=Math.abs(event.touches[0].clientX-this.firstTouchX);
        if(deltaX>6||deltaY>6){
            let currentRipples=this.state.ripples;
            const ripple=currentRipples[0];
            const abortRipple=cloneElement(ripple,{aborted:true});
            currentRipples=shift(currentRipples);
            currentRipples=[...currentRipples,abortRipple];
            this.setState({ripples:currentRipples},()=>{
                this.end();
            });
        }
    }
    startListeningForScrollAbort(event){
        this.firstTouchY=event.touches[0].clientY;
        this.firstTouchX=event.touches[0].clientX;

        document.body.addEventListener('touchmove',this.handleTouchMove);
    }
    stopListeningForScrollAbort(){
        document.body.addEventListener('touchmove',this.handleTouchMove);
    }
    getRippleStyle(event){
        const el=ReactDOM.findDOMNode(this);
        const elHeight=el.offsetHeight;
        const elWidth=el.offsetWidth;
        const offset=Dom.offset(el);
        const pageX=event.touches[0].pageX;
        const pageY=event.touches[0].pageY;
        const pointerX=pageX-offset.left;
        const pointerY=pageY-offset.top;
        const topLeftDiag = calcDiag(pointerX, pointerY);
        const topRightDiag = calcDiag(elWidth - pointerX, pointerY);
        const botRightDiag = calcDiag(elWidth - pointerX, elHeight - pointerY);
        const botLeftDiag = calcDiag(pointerX, elHeight - pointerY);
        const rippleRadius = Math.max(
            topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
        );
        const rippleSize = rippleRadius * 2;
        const left = (this.props.outside?elWidth/2:pointerX) - rippleRadius;
        const top = (this.props.outside?elHeight/2:pointerY) - rippleRadius;
        return {
            directionInvariant: true,
            height: rippleSize,
            width: rippleSize,
            top: top,
            left: left,
        }
    }
    render(props=this.props){
        const {className,white,outside,disabled,children}=props;
        const {ripples}=this.state;

        let rippleGroup=(
            <ReactTransitionGroup>
                {ripples}
            </ReactTransitionGroup>
        );

        return <div
            className={classnames("candy-mob-wave",className)}
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd} ref="waveRoot">
            <div className="candy-mob-wave__content">{children}</div>
            <div className={classnames('candy-mob-wave__wave-list',{
                'candy-mob-wave__wave-list--white':white,
                'candy-mob-wave__wave-list--outside':outside
            })}>{rippleGroup}</div>
        </div>
    }
}