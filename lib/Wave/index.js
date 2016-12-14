'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _class, _temp; /**
                    * Created by ifchangetoclzp on 2016/10/24.
                    */


var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ReactTransitionGroup = require('react/lib/ReactTransitionGroup');

var _ReactTransitionGroup2 = _interopRequireDefault(_ReactTransitionGroup);

var _CircleRipple = require('./CircleRipple');

var _CircleRipple2 = _interopRequireDefault(_CircleRipple);

var _dom = require('../fn/dom');

var _dom2 = _interopRequireDefault(_dom);

require('../../style/Wave/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shift = function shift(_ref) {
    var _ref2 = (0, _toArray3.default)(_ref),
        newArray = _ref2.slice(1);

    return newArray;
};
var calcDiag = function calcDiag(a, b) {
    return Math.sqrt(a * a + b * b);
};
var Wave = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Wave, _Component);

    function Wave() {
        (0, _classCallCheck3.default)(this, Wave);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Wave.__proto__ || (0, _getPrototypeOf2.default)(Wave)).call(this));

        _this.handleTouchStart = function (event) {
            //event.stopPropagation();
            event.preventDefault();
            if (_this.props.abortOnScroll && event.touches) {
                _this.startListeningForScrollAbort(event);
                _this.startTime = Date.now();
                _this.start(event);
            }
        };

        _this.handleTouchEnd = function () {
            _this.end();
        };

        _this.handleTouchMove = function (event) {
            var timeSinceStart = Math.abs(Date.now() - _this.startTime);
            if (!_this.state.hasRipples) {
                return;
            }
            if (timeSinceStart > 300) {
                _this.stopListeningForScrollAbort();
                return;
            }

            var deltaY = Math.abs(event.touches[0].clientY - _this.firstTouchY);
            var deltaX = Math.abs(event.touches[0].clientX - _this.firstTouchX);
            if (deltaX > 6 || deltaY > 6) {
                var currentRipples = _this.state.ripples;
                var ripple = currentRipples[0];
                var abortRipple = (0, _react.cloneElement)(ripple, { aborted: true });
                currentRipples = shift(currentRipples);
                currentRipples = [].concat((0, _toConsumableArray3.default)(currentRipples), [abortRipple]);
                _this.setState({ ripples: currentRipples }, function () {
                    _this.end();
                });
            }
        };

        _this.state = {
            hasRipples: false,
            nextKey: 0,
            ripples: []
        };
        return _this;
    }

    (0, _createClass3.default)(Wave, [{
        key: 'start',
        value: function start(event) {
            if (this.props.disabled) {
                return;
            }
            var ripples = this.state.ripples;
            ripples = [].concat((0, _toConsumableArray3.default)(ripples), [_react2.default.createElement(_CircleRipple2.default, {
                key: this.state.nextKey,
                style: !this.props.centerRipple ? this.getRippleStyle(event) : {},
                white: this.props.white,
                opacity: this.props.opacity,
                outside: this.props.outside
            })]);
            this.setState({
                hasRipples: true,
                nextKey: this.state.nextKey + 1,
                ripples: ripples
            });
        }
    }, {
        key: 'end',
        value: function end() {
            var currentRipples = this.state.ripples;
            this.setState({
                hasRipples: currentRipples.length > 1,
                ripples: shift(currentRipples)
            });
            if (this.props.abortOnScroll) {
                this.stopListeningForScrollAbort();
            }
        }
    }, {
        key: 'startListeningForScrollAbort',
        value: function startListeningForScrollAbort(event) {
            this.firstTouchY = event.touches[0].clientY;
            this.firstTouchX = event.touches[0].clientX;

            document.body.addEventListener('touchmove', this.handleTouchMove);
        }
    }, {
        key: 'stopListeningForScrollAbort',
        value: function stopListeningForScrollAbort() {
            document.body.addEventListener('touchmove', this.handleTouchMove);
        }
    }, {
        key: 'getRippleStyle',
        value: function getRippleStyle(event) {
            var el = _reactDom2.default.findDOMNode(this);
            var elHeight = el.offsetHeight;
            var elWidth = el.offsetWidth;
            var offset = _dom2.default.offset(el);
            var pageX = event.touches[0].pageX;
            var pageY = event.touches[0].pageY;
            var pointerX = pageX - offset.left;
            var pointerY = pageY - offset.top;
            var topLeftDiag = calcDiag(pointerX, pointerY);
            var topRightDiag = calcDiag(elWidth - pointerX, pointerY);
            var botRightDiag = calcDiag(elWidth - pointerX, elHeight - pointerY);
            var botLeftDiag = calcDiag(pointerX, elHeight - pointerY);
            var rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
            var rippleSize = rippleRadius * 2;
            var left = pointerX - rippleRadius;
            var top = pointerY - rippleRadius;
            return {
                directionInvariant: true,
                height: rippleSize,
                width: rippleSize,
                top: top,
                left: left
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
            var className = props.className,
                white = props.white,
                outside = props.outside,
                disabled = props.disabled,
                children = props.children;
            var ripples = this.state.ripples;


            var rippleGroup = _react2.default.createElement(
                _ReactTransitionGroup2.default,
                null,
                ripples
            );

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)("candy-mob-wave", className),
                    onTouchStart: this.handleTouchStart,
                    onTouchEnd: this.handleTouchEnd, ref: 'waveRoot' },
                _react2.default.createElement(
                    'div',
                    { className: 'candy-mob-wave__content' },
                    children
                ),
                _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)('candy-mob-wave__wave-list', {
                            'candy-mob-wave__wave-list--white': white,
                            'candy-mob-wave__wave-list--outside': outside
                        }) },
                    rippleGroup
                )
            );
        }
    }]);
    return Wave;
}(_react.Component), _class.propTypes = {
    centerRipple: _react.PropTypes.bool,
    abortOnScroll: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    white: _react.PropTypes.bool,
    outside: _react.PropTypes.bool,
    opacity: _react.PropTypes.number
}, _class.defaultProps = {
    abortOnScroll: true,
    opacity: 0.2
}, _temp);
exports.default = Wave;