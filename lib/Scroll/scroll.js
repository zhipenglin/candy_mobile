'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Touch = require('../Touch');

var _Touch2 = _interopRequireDefault(_Touch);

var _raf = require('../fn/raf');

var _raf2 = _interopRequireDefault(_raf);

require('../../style/Scroll/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scroll = function (_Component) {
    (0, _inherits3.default)(Scroll, _Component);

    function Scroll() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Scroll);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Scroll.__proto__ || (0, _getPrototypeOf2.default)(Scroll)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            deltaX: 0,
            deltaY: 0,
            active: true
        }, _this.touchStartHandler = function (e) {
            e.preventDefault();
            _this.setState({
                active: false
            });
            _this.cancelAnimate();
        }, _this.pressMoveHandler = function (event, superEvent) {
            var deltaY = superEvent.deltaY,
                top = _this.state.deltaY,
                bottom = _reactDom2.default.findDOMNode(_this).clientHeight - _this.state.deltaY - _this.refs.inner.offsetHeight;
            if (top > 0) {
                deltaY *= 0.2;
            } else if (bottom > 0) {
                deltaY *= 0.2;
            }
            _this.setState({
                deltaY: _this.state.deltaY + deltaY
            });
        }, _this.touchEndHandler = function (event, superEvent) {
            var _this$props = _this.props,
                itemHeight = _this$props.itemHeight,
                onScrollEnd = _this$props.onScrollEnd;

            var speed = superEvent.deltaY;
            if (_this.notReachSide()) {
                _this.animation(speed, function () {
                    if (itemHeight) {
                        _this.setState({
                            active: true,
                            deltaY: Math.round(_this.state.deltaY / itemHeight) * itemHeight
                        });
                        _this.notReachSide();
                    }
                    setTimeout(function () {
                        onScrollEnd(_this.state.deltaY);
                    }, 0);
                });
            } else {
                setTimeout(function () {
                    onScrollEnd(_this.state.deltaY);
                }, 0);
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Scroll, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var initY = this.props.initY;

            this.setState({
                deltaY: initY || 0
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            var onScrollEnd = this.props.onScrollEnd;

            if (this.state.active) {
                if (!this.notReachSide(false)) {
                    setTimeout(function () {
                        onScrollEnd(_this2.state.deltaY);
                    }, 0);
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _raf.cancelRaf)(this.raf);
        }
    }, {
        key: 'notReachSide',
        value: function notReachSide() {
            var trans = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (this.state.deltaY > 0) {
                this.setState({
                    deltaY: 0,
                    active: trans
                });
            } else if (_reactDom2.default.findDOMNode(this).clientHeight - this.state.deltaY > this.refs.inner.offsetHeight) {
                this.setState({
                    deltaY: _reactDom2.default.findDOMNode(this).clientHeight - this.refs.inner.offsetHeight,
                    active: trans
                });
            } else {
                return true;
            }
        }
    }, {
        key: 'animation',
        value: function animation(speed, callback) {
            var _this3 = this;

            var step = function step() {
                _this3.raf = (0, _raf2.default)(function () {
                    _this3.setState({
                        deltaY: _this3.state.deltaY + speed
                    }, function () {
                        if (_this3.state.deltaY > 0 || _reactDom2.default.findDOMNode(_this3).clientHeight - _this3.state.deltaY > _this3.refs.inner.offsetHeight) {
                            if (speed > 8) {
                                speed = 8;
                            }
                            speed *= 0.5;
                        } else {
                            speed *= 0.95;
                        }
                        if (Math.abs(speed) > 0.5) {
                            step();
                        } else {
                            _this3.notReachSide();
                            callback && callback();
                        }
                    });
                });
            };
            if (Math.abs(speed) > 2) {
                //去抖动 判断边界
                step();
            } else {
                callback && callback();
            }
        }
    }, {
        key: 'cancelAnimate',
        value: function cancelAnimate() {
            if (this.raf) {
                (0, _raf.cancelRaf)(this.raf);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('candy-mob-scroll') },
                _react2.default.createElement(
                    _Touch2.default,
                    { onTouchStart: this.touchStartHandler, onPressMove: this.pressMoveHandler, onTouchEnd: this.touchEndHandler },
                    _react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)("candy-mob-scroll__inner", {
                                "candy-mob-scroll__inner--active": this.state.active
                            }), ref: 'inner', style: { transform: 'translate(' + this.state.deltaX + 'px,' + this.state.deltaY + 'px)' } },
                        children
                    )
                )
            );
        }
    }]);
    return Scroll;
}(_react.Component);

exports.default = Scroll;