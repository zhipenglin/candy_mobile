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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _shallowEqual = require('recompose/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _transitions = require('../fn/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _autoPrefixer = require('../fn/autoPrefixer');

var _autoPrefixer2 = _interopRequireDefault(_autoPrefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CircleRipple = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(CircleRipple, _Component);

    function CircleRipple() {
        (0, _classCallCheck3.default)(this, CircleRipple);
        return (0, _possibleConstructorReturn3.default)(this, (CircleRipple.__proto__ || (0, _getPrototypeOf2.default)(CircleRipple)).apply(this, arguments));
    }

    (0, _createClass3.default)(CircleRipple, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2.default)(this.props, nextProps);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.enterTimer);
            clearTimeout(this.leaveTimer);
        }
    }, {
        key: 'componentWillAppear',
        value: function componentWillAppear(callback) {
            this.initializeAnimation(callback);
        }
    }, {
        key: 'componentWillEnter',
        value: function componentWillEnter(callback) {
            this.initializeAnimation(callback);
        }
    }, {
        key: 'componentDidAppear',
        value: function componentDidAppear() {
            this.animate();
        }
    }, {
        key: 'componentDidEnter',
        value: function componentDidEnter() {
            this.animate();
        }
    }, {
        key: 'componentWillLeave',
        value: function componentWillLeave(callback) {
            var style = _reactDom2.default.findDOMNode(this).style;
            style.opacity = 0;
            var removeAfter = this.props.aborted ? 0 : 2000;
            this.enterTimer = setTimeout(callback, removeAfter);
        }
    }, {
        key: 'animate',
        value: function animate() {
            var style = _reactDom2.default.findDOMNode(this).style;
            var transitionValue = _transitions2.default.easeOut('2s', 'opacity') + ', ' + _transitions2.default.easeOut('1s', 'transform');
            (0, _autoPrefixer2.default)(style, 'transition', transitionValue);
            (0, _autoPrefixer2.default)(style, 'transform', 'scale(1)');
        }
    }, {
        key: 'initializeAnimation',
        value: function initializeAnimation(callback) {
            var style = _reactDom2.default.findDOMNode(this).style;
            style.opacity = this.props.opacity;
            (0, _autoPrefixer2.default)(style, 'transform', 'scale(0)');
            this.leaveTimer = setTimeout(callback, 0);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                style = _props.style,
                white = _props.white,
                outside = _props.outside;

            return _react2.default.createElement('div', { className: (0, _classnames2.default)("candy-mob-wave__circle-ripple", {
                    "candy-mob-wave__circle-ripple--white": white,
                    "candy-mob-wave__circle-ripple--outside": outside
                }), style: style });
        }
    }]);
    return CircleRipple;
}(_react.Component), _class.propTypes = {
    aborted: _react.PropTypes.bool,
    color: _react.PropTypes.string,
    opacity: _react.PropTypes.number
}, _class.defaultProps = {
    opacity: 0.1,
    aborted: false
}, _temp);
exports.default = CircleRipple;