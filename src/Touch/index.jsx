import React,{Component} from 'react';
import classnames from 'classnames'
import '../../style/Touch/style.scss'

export default class Touch extends Component{
    static defaultProps={
        onTap(){},onMultipointStart(){},onLongTap(){},onTouchStart(){},onTouchEnd(){},onSwipe(){},onPinch(){},onRotate(){},onPressMove(){},onMultipointEnd(){},onDoubleTap(){}
    }
    constructor(props) {
        super(props);

        this.preV = { x: null, y: null };
        this.pinchStartLen = null;
        this.scale = 1;
        this.isDoubleTap = false;
        this.delta = null;
        this.last = null;
        this.now = null;
        this.tapTimeout = null;
        this.longTapTimeout = null;
        this.swipeTimeout=null;
        this.x1 = this.x2 = this.y1 = this.y2 = null;
        this.preTapPosition={x:null,y:null};
        this.superEvent={};
    }

    getLen(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    getAngle(v1, v2) {
        var mr = getLen(v1) * getLen(v2);
        if (mr === 0) return 0;
        var r = dot(v1, v2) / mr;
        if (r > 1) r = 1;
        return Math.acos(r);
    }

    cross(v1, v2) {
        return v1.x * v2.y - v2.x * v1.y;
    }

    getRotateAngle(v1, v2) {
        var angle = getAngle(v1, v2);
        if (cross(v1, v2) > 0) {
            angle *= -1;
        }

        return angle * 180 / Math.PI;
    }

    _resetState() {
        this.setState({x: null, y: null, swiping: false, start: 0 });
    }


    _emitEvent = (name, e) => {
        if (this.props[name]) {
            this.props[name](e,this.superEvent);
        }
    }

    _handleTouchStart=(evt)=>{
        this.now = Date.now();
        this.superEvent={
            startTime:this.now,
            distanceX:0,
            distanceY:0
        };
        this._emitEvent('onTouchStart', evt);
        this.x1 = evt.touches[0].pageX;
        this.y1 = evt.touches[0].pageY;
        this.delta = this.now - (this.last || this.now);
        if(this.preTapPosition.x!==null){
            this.isDoubleTap = (this.delta > 0 && this.delta <= 250&&Math.abs(this.preTapPosition.x-this.x1)<30&&Math.abs(this.preTapPosition.y-this.y1)<30);
        }
        this.preTapPosition.x=this.x1;
        this.preTapPosition.y=this.y1;
        this.last = this.now;
        var preV = this.preV,
            len = evt.touches.length;
        if (len > 1) {
            var v = { x: evt.touches[1].pageX - this.x1, y: evt.touches[1].pageY - this.y1 };
            preV.x = v.x;
            preV.y = v.y;
            this.pinchStartLen = getLen(preV);
            this._emitEvent('onMultipointStart', evt);
        }
        this.longTapTimeout = setTimeout(function(){
            this._emitEvent('onLongTap', evt);
        }.bind(this), 750);
    }

    _handleTouchMove=(evt)=>{
        var preV = this.preV,
            len = evt.touches.length,
            currentX = evt.touches[0].pageX,
            currentY = evt.touches[0].pageY;
        this.isDoubleTap=false;
        if (len > 1) {
            var v = { x: evt.touches[1].pageX - currentX, y: evt.touches[1].pageY - currentY };

            if (preV.x !== null) {
                if (this.pinchStartLen > 0) {
                    this.superEvent.scale=getLen(v);
                    //evt.scale = getLen(v) / this.pinchStartLen;
                    this._emitEvent('onPinch', evt);
                }

                this.superEvent.angle=getRotateAngle(v, preV);
                //evt.angle = getRotateAngle(v, preV);
                this._emitEvent('onRotate', evt);
            }
            preV.x = v.x;
            preV.y = v.y;
        } else {
            if (this.x2 !== null) {
                this.superEvent.deltaX = currentX - this.x2;
                this.superEvent.deltaY = currentY - this.y2;
                this.superEvent.distanceX+=this.superEvent.deltaX;
                this.superEvent.distanceY+=this.superEvent.deltaY;
                //evt.deltaX = currentX - this.x2;
                //evt.deltaY = currentY - this.y2;
            }else{
                this.superEvent.deltaX = 0;
                this.superEvent.deltaY = 0;
                //evt.deltaX = 0;
                //evt.deltaY = 0;
            }
            if(!this.moveTime){
                this.moveTime=this.superEvent.startTime;
            }
            var interval=(Date.now()-this.moveTime)/1000;
            if(interval>0){
                this.superEvent.speedX=this.superEvent.deltaX/interval;
                this.superEvent.speedY=this.superEvent.deltaY/interval;
            }else{
                this.superEvent.speedX=0;
                this.superEvent.speedY=0;
            }
            this._emitEvent('onPressMove', evt);
        }
        this._cancelLongTap();
        this.x2 = currentX;
        this.y2 = currentY;
        if(len > 1) {
            evt.preventDefault();
        }
    }

    _handleTouchCancel=(evt)=>{
        clearInterval(this.tapTimeout);
        clearInterval(this.longTapTimeout);
        clearInterval(this.swipeTimeout);
        this.superEvent.endTime=Date.now();
        this._emitEvent('onTouchEnd', evt);
    }

    _handleTouchEnd=(evt)=>{
        this.superEvent.endTime=Date.now();
        this._cancelLongTap();
        var self = this;
        this._emitEvent('onTouchEnd', evt);
        if( evt.touches.length<2){
            this._emitEvent('onMultipointEnd', evt);
        }

        if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
            (this.y2 && Math.abs(this.preV.y - this.y2) > 30)) {
            this.superEvent.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
            //evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
            this.swipeTimeout = setTimeout(function () {
                self._emitEvent('onSwipe', evt);
            }, 0)
        } else {
            this.tapTimeout = setTimeout(function () {
                self._emitEvent('onTap', evt);
                if (self.isDoubleTap) {
                    self._emitEvent('onDoubleTap', evt);
                    self.isDoubleTap = false;
                }
            }, 0)
        }

        this.preV.x = 0;
        this.preV.y = 0;
        this.scale = 1;
        this.pinchStartLen = null;
        this.x1 = this.x2 = this.y1 = this.y2 = null;
    }

    _cancelLongTap () {
        clearTimeout(this.longTapTimeout);
    }

    _swipeDirection (x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
    }

    render() {
        const {className,onTap, onMultipointStart, onTouchEnd, onTouchStart, onLongTap, onSwipe, onPinch, onRotate, onPressMove, onMultipointEnd, onDoubleTap, ...reset}=this.props;
        return (
            <div className={classnames("candy-mob-touch",className)} onTouchStart={this._handleTouchStart}
                 onTouchMove={this._handleTouchMove}
                 onTouchCancel={this._handleTouchCancel}
                 onTouchEnd={this._handleTouchEnd} {...reset} />
        );
    }
}