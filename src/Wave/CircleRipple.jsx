import React,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom'
import shallowEqual from 'recompose/shallowEqual';
import classnames from 'classnames'
import transitions from '../fn/transitions'
import autoPrefix from '../fn/autoPrefixer'

export default class CircleRipple extends Component{
    static propTypes = {
        aborted: PropTypes.bool,
        color: PropTypes.string,
        opacity: PropTypes.number
    };
    static defaultProps = {
        opacity: 0.1,
        aborted: false,
    };
    shouldComponentUpdate(nextProps) {
        return !shallowEqual(this.props, nextProps);
    }

    componentWillUnmount() {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
    }

    componentWillAppear(callback) {
        this.initializeAnimation(callback);
    }

    componentWillEnter(callback) {
        this.initializeAnimation(callback);
    }

    componentDidAppear() {
        this.animate();
    }

    componentDidEnter() {
        this.animate();
    }

    componentWillLeave(callback) {
        const style = ReactDOM.findDOMNode(this).style;
        style.opacity = 0;
        const removeAfter = this.props.aborted ? 0 : 2000;
        this.enterTimer = setTimeout(callback, removeAfter);
    }

    animate() {
        const style = ReactDOM.findDOMNode(this).style;
        const transitionValue = `${transitions.easeOut('2s', 'opacity')}, ${
            transitions.easeOut('1s', 'transform')}`;
        autoPrefix(style, 'transition', transitionValue);
        autoPrefix(style, 'transform', 'scale(1)');
    }

    initializeAnimation(callback) {
        const style = ReactDOM.findDOMNode(this).style;
        style.opacity = this.props.opacity;
        autoPrefix(style, 'transform', 'scale(0)');
        this.leaveTimer = setTimeout(callback, 0);
    }
    render(){
        const {style,white,outside}=this.props;
        return (
            <div className={classnames("candy-mob-wave__circle-ripple",{
                "candy-mob-wave__circle-ripple--white":white,
                "candy-mob-wave__circle-ripple--outside":outside
            })} style={style}></div>
        );
    }
}