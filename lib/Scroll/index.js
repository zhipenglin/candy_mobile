'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dom = require('../fn/dom');

var _dom2 = _interopRequireDefault(_dom);

var _autoPrefixer = require('../fn/autoPrefixer');

var _autoPrefixer2 = _interopRequireDefault(_autoPrefixer);

var _Touch = require('../Touch');

var _Touch2 = _interopRequireDefault(_Touch);

var _raf = require('../fn/raf');

var _raf2 = _interopRequireDefault(_raf);

require('../../style/Scroll/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scroll = (_temp = _class = function (_PureComponent) {
    (0, _inherits3.default)(Scroll, _PureComponent);

    function Scroll() {
        (0, _classCallCheck3.default)(this, Scroll);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Scroll.__proto__ || (0, _getPrototypeOf2.default)(Scroll)).call(this));

        _this._moveHandler = function (event, superEvent) {
            var _this$props = _this.props,
                onScroll = _this$props.onScroll,
                onMove = _this$props.onMove;

            _this.cancelAnimate();
            (0, _raf.cancelRaf)(_this.raf);
            var deltaY = superEvent.deltaY,
                top = _this.state.deltaY,
                bottom = _this.state.height - _this.state.deltaY - _this.refs.inner.clientHeight;
            if (top > 0) {
                deltaY *= 0.2;
            } else if (bottom > 0) {
                deltaY *= 0.2;
            } else {
                onScroll(_this.state.deltaY + deltaY);
            }
            _this.setState({
                deltaY: _this.state.deltaY + deltaY
            }, function () {
                onMove(_this.state.deltaY);
            });
        };

        _this._endHandler = function (event, superEvent) {
            var onScrollEnd = _this.props.onScrollEnd;

            var speed = superEvent.deltaY;
            var step = function step() {
                _this.raf = (0, _raf2.default)(function () {
                    _this.setState({
                        deltaY: _this.state.deltaY + speed
                    }, function () {
                        if (_this.state.deltaY > 0 || _this.state.height - _this.state.deltaY > _this.refs.inner.clientHeight) {
                            if (speed > 8) {
                                speed = 8;
                            }
                            speed *= 0.5;
                        } else {
                            speed *= 0.96;
                        }
                        if (Math.abs(speed) > 0.5) {
                            step();
                        } else {
                            onScrollEnd(_this.state.deltaY);
                            _this._notReachSide();
                        }
                    });
                });
            };
            if (_this._notReachSide() && Math.abs(speed) > 4) {
                //去抖动 判断边界
                step();
            }
        };

        _this.touchStartHandler = function (e) {
            e.preventDefault();
        };

        _this.state = {
            height: 0,
            deltaY: 0
        };
        return _this;
    }

    (0, _createClass3.default)(Scroll, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var height = this.props.height;

            this.setState({
                height: height || document.body.clientHeight - _dom2.default.offset(_reactDom2.default.findDOMNode(this)).top
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _raf.cancelRaf)(this.raf);
        }
    }, {
        key: '_notReachSide',
        value: function _notReachSide() {
            var _props = this.props,
                onReachTop = _props.onReachTop,
                onReachBottom = _props.onReachBottom;

            if (this.state.deltaY > 0) {
                this.animate(400);
                this.setState({
                    deltaY: 0
                });
                onReachTop(this.state.deltaY);
            } else if (this.state.height - this.state.deltaY > this.refs.inner.clientHeight) {
                this.animate(400);
                this.setState({
                    deltaY: this.state.height - this.refs.inner.clientHeight
                });
                onReachBottom(this.state.deltaY);
            } else {
                this.animate();
                return true;
            }
        }
    }, {
        key: 'animate',
        value: function animate() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;

            var style = this.refs.inner.style;
            (0, _autoPrefixer2.default)(style, 'transition', 'transform ' + time + 'ms');
        }
    }, {
        key: 'cancelAnimate',
        value: function cancelAnimate() {
            var style = this.refs.inner.style;
            (0, _autoPrefixer2.default)(style, 'transition-duration', '0ms');
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                className = _props2.className,
                style = _props2.style,
                children = _props2.children,
                onScroll = _props2.onScroll,
                onMove = _props2.onMove,
                onScrollEnd = _props2.onScrollEnd,
                onReachTop = _props2.onReachTop,
                onReachBottom = _props2.onReachBottom,
                reset = (0, _objectWithoutProperties3.default)(_props2, ['className', 'style', 'children', 'onScroll', 'onMove', 'onScrollEnd', 'onReachTop', 'onReachBottom']);

            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({ className: (0, _classnames2.default)('candy-mob-scroll', className), style: (0, _assign2.default)({}, style, { height: this.state.height + 'px' }) }, reset),
                _react2.default.createElement(
                    _Touch2.default,
                    { onPressMove: this._moveHandler, onTouchStart: this.touchStartHandler, onTouchEnd: this._endHandler },
                    _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-sroll__inner', ref: 'inner', style: { transform: 'translateY(' + this.state.deltaY + 'px)' } },
                        children
                    )
                )
            );
        }
    }]);
    return Scroll;
}(_react.PureComponent), _class.defaultProps = {
    onScroll: function onScroll() {},
    onMove: function onMove() {},
    onScrollEnd: function onScrollEnd() {},
    onReachTop: function onReachTop() {},
    onReachBottom: function onReachBottom() {}
}, _temp);
exports.default = Scroll;