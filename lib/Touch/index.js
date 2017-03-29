'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('../../style/Touch/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Touch = (_temp = _class = function (_PureComponent) {
    (0, _inherits3.default)(Touch, _PureComponent);

    function Touch(props) {
        (0, _classCallCheck3.default)(this, Touch);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Touch.__proto__ || (0, _getPrototypeOf2.default)(Touch)).call(this, props));

        _this._emitEvent = function (name, e) {
            if (_this.props[name]) {
                _this.props[name](e, _this.superEvent);
            }
        };

        _this._handleTouchStart = function (evt) {
            _this.now = Date.now();
            _this.superEvent = {
                startTime: _this.now,
                distanceX: 0,
                distanceY: 0
            };
            _this._emitEvent('onTouchStart', evt);
            _this.x1 = evt.touches[0].pageX;
            _this.y1 = evt.touches[0].pageY;
            _this.delta = _this.now - (_this.last || _this.now);
            if (_this.preTapPosition.x !== null) {
                _this.isDoubleTap = _this.delta > 0 && _this.delta <= 250 && Math.abs(_this.preTapPosition.x - _this.x1) < 30 && Math.abs(_this.preTapPosition.y - _this.y1) < 30;
            }
            _this.preTapPosition.x = _this.x1;
            _this.preTapPosition.y = _this.y1;
            _this.last = _this.now;
            var preV = _this.preV,
                len = evt.touches.length;
            if (len > 1) {
                var v = { x: evt.touches[1].pageX - _this.x1, y: evt.touches[1].pageY - _this.y1 };
                preV.x = v.x;
                preV.y = v.y;
                _this.pinchStartLen = getLen(preV);
                _this._emitEvent('onMultipointStart', evt);
            }
            _this.longTapTimeout = setTimeout(function () {
                this._emitEvent('onLongTap', evt);
            }.bind(_this), 750);
        };

        _this._handleTouchMove = function (evt) {
            var preV = _this.preV,
                len = evt.touches.length,
                currentX = evt.touches[0].pageX,
                currentY = evt.touches[0].pageY;
            _this.isDoubleTap = false;
            if (len > 1) {
                var v = { x: evt.touches[1].pageX - currentX, y: evt.touches[1].pageY - currentY };

                if (preV.x !== null) {
                    if (_this.pinchStartLen > 0) {
                        _this.superEvent.scale = getLen(v);
                        //evt.scale = getLen(v) / this.pinchStartLen;
                        _this._emitEvent('onPinch', evt);
                    }

                    _this.superEvent.angle = getRotateAngle(v, preV);
                    //evt.angle = getRotateAngle(v, preV);
                    _this._emitEvent('onRotate', evt);
                }
                preV.x = v.x;
                preV.y = v.y;
            } else {
                if (_this.x2 !== null) {
                    _this.superEvent.deltaX = currentX - _this.x2;
                    _this.superEvent.deltaY = currentY - _this.y2;
                    _this.superEvent.distanceX += _this.superEvent.deltaX;
                    _this.superEvent.distanceY += _this.superEvent.deltaY;
                    //evt.deltaX = currentX - this.x2;
                    //evt.deltaY = currentY - this.y2;
                } else {
                    _this.superEvent.deltaX = 0;
                    _this.superEvent.deltaY = 0;
                    //evt.deltaX = 0;
                    //evt.deltaY = 0;
                }
                if (!_this.moveTime) {
                    _this.moveTime = _this.superEvent.startTime;
                }
                var interval = (Date.now() - _this.moveTime) / 1000;
                if (interval > 0) {
                    _this.superEvent.speedX = _this.superEvent.deltaX / interval;
                    _this.superEvent.speedY = _this.superEvent.deltaY / interval;
                } else {
                    _this.superEvent.speedX = 0;
                    _this.superEvent.speedY = 0;
                }
                _this._emitEvent('onPressMove', evt);
            }
            _this._cancelLongTap();
            _this.x2 = currentX;
            _this.y2 = currentY;
            if (len > 1) {
                evt.preventDefault();
            }
        };

        _this._handleTouchCancel = function (evt) {
            clearInterval(_this.tapTimeout);
            clearInterval(_this.longTapTimeout);
            clearInterval(_this.swipeTimeout);
            _this.superEvent.endTime = Date.now();
            _this._emitEvent('onTouchEnd', evt);
        };

        _this._handleTouchEnd = function (evt) {
            _this.superEvent.endTime = Date.now();
            _this._cancelLongTap();
            var self = _this;
            _this._emitEvent('onTouchEnd', evt);
            if (evt.touches.length < 2) {
                _this._emitEvent('onMultipointEnd', evt);
            }

            if (_this.x2 && Math.abs(_this.x1 - _this.x2) > 30 || _this.y2 && Math.abs(_this.preV.y - _this.y2) > 30) {
                _this.superEvent.direction = _this._swipeDirection(_this.x1, _this.x2, _this.y1, _this.y2);
                //evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
                _this.swipeTimeout = setTimeout(function () {
                    self._emitEvent('onSwipe', evt);
                }, 0);
            } else {
                _this.tapTimeout = setTimeout(function () {
                    self._emitEvent('onTap', evt);
                    if (self.isDoubleTap) {
                        self._emitEvent('onDoubleTap', evt);
                        self.isDoubleTap = false;
                    }
                }, 0);
            }

            _this.preV.x = 0;
            _this.preV.y = 0;
            _this.scale = 1;
            _this.pinchStartLen = null;
            _this.x1 = _this.x2 = _this.y1 = _this.y2 = null;
        };

        _this.preV = { x: null, y: null };
        _this.pinchStartLen = null;
        _this.scale = 1;
        _this.isDoubleTap = false;
        _this.delta = null;
        _this.last = null;
        _this.now = null;
        _this.tapTimeout = null;
        _this.longTapTimeout = null;
        _this.swipeTimeout = null;
        _this.x1 = _this.x2 = _this.y1 = _this.y2 = null;
        _this.preTapPosition = { x: null, y: null };
        _this.superEvent = {};
        return _this;
    }

    (0, _createClass3.default)(Touch, [{
        key: 'getLen',
        value: function getLen(v) {
            return Math.sqrt(v.x * v.x + v.y * v.y);
        }
    }, {
        key: 'dot',
        value: function dot(v1, v2) {
            return v1.x * v2.x + v1.y * v2.y;
        }
    }, {
        key: 'getAngle',
        value: function getAngle(v1, v2) {
            var mr = getLen(v1) * getLen(v2);
            if (mr === 0) return 0;
            var r = dot(v1, v2) / mr;
            if (r > 1) r = 1;
            return Math.acos(r);
        }
    }, {
        key: 'cross',
        value: function cross(v1, v2) {
            return v1.x * v2.y - v2.x * v1.y;
        }
    }, {
        key: 'getRotateAngle',
        value: function getRotateAngle(v1, v2) {
            var angle = getAngle(v1, v2);
            if (cross(v1, v2) > 0) {
                angle *= -1;
            }

            return angle * 180 / Math.PI;
        }
    }, {
        key: '_resetState',
        value: function _resetState() {
            this.setState({ x: null, y: null, swiping: false, start: 0 });
        }
    }, {
        key: '_cancelLongTap',
        value: function _cancelLongTap() {
            clearTimeout(this.longTapTimeout);
        }
    }, {
        key: '_swipeDirection',
        value: function _swipeDirection(x1, x2, y1, y2) {
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                onTap = _props.onTap,
                onMultipointStart = _props.onMultipointStart,
                onTouchEnd = _props.onTouchEnd,
                onTouchStart = _props.onTouchStart,
                onLongTap = _props.onLongTap,
                onSwipe = _props.onSwipe,
                onPinch = _props.onPinch,
                onRotate = _props.onRotate,
                onPressMove = _props.onPressMove,
                onMultipointEnd = _props.onMultipointEnd,
                onDoubleTap = _props.onDoubleTap,
                reset = (0, _objectWithoutProperties3.default)(_props, ['className', 'onTap', 'onMultipointStart', 'onTouchEnd', 'onTouchStart', 'onLongTap', 'onSwipe', 'onPinch', 'onRotate', 'onPressMove', 'onMultipointEnd', 'onDoubleTap']);

            return _react2.default.createElement('div', (0, _extends3.default)({ className: (0, _classnames2.default)("candy-mob-touch", className), onTouchStart: this._handleTouchStart,
                onTouchMove: this._handleTouchMove,
                onTouchCancel: this._handleTouchCancel,
                onTouchEnd: this._handleTouchEnd }, reset));
        }
    }]);
    return Touch;
}(_react.PureComponent), _class.defaultProps = {
    onTap: function onTap() {},
    onMultipointStart: function onMultipointStart() {},
    onLongTap: function onLongTap() {},
    onTouchStart: function onTouchStart() {},
    onTouchEnd: function onTouchEnd() {},
    onSwipe: function onSwipe() {},
    onPinch: function onPinch() {},
    onRotate: function onRotate() {},
    onPressMove: function onPressMove() {},
    onMultipointEnd: function onMultipointEnd() {},
    onDoubleTap: function onDoubleTap() {}
}, _temp);
exports.default = Touch;