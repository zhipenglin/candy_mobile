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

var _class, _temp2, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Wave = require('../Wave');

var _Wave2 = _interopRequireDefault(_Wave);

var _Touch = require('../Touch');

var _Touch2 = _interopRequireDefault(_Touch);

require('../../style/Buttton/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = (_temp2 = _class = function (_Component) {
    (0, _inherits3.default)(Button, _Component);

    function Button() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Button);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Button, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                disabled = _props.disabled,
                onClick = _props.onClick,
                size = _props.size,
                children = _props.children,
                type = _props.type,
                reset = (0, _objectWithoutProperties3.default)(_props, ['className', 'disabled', 'onClick', 'size', 'children', 'type']);

            return _react2.default.createElement(
                'a',
                (0, _extends3.default)({ className: (0, _classnames2.default)('candy-mob-button', {
                        'candy-mob-button--disabled': disabled,
                        'candy-mob-button--primary': type == 'primary',
                        'candy-mob-button--ghost': type == 'ghost',
                        'candy-mob-button--link': type == 'link',
                        'candy-mob-button--small': size == 'small',
                        'candy-mob-button--mini': size == 'mini',
                        'candy-mob-button--press': this.state.press
                    }, className) }, reset),
                _react2.default.createElement(
                    _Touch2.default,
                    { onTap: this.clickHandler, onTouchStart: this.touchStartHandler, onTouchEnd: this.touchEndHandler, onTouchCancel: this.touchEndHandler },
                    _react2.default.createElement(
                        _Wave2.default,
                        { white: type == 'primary', disabled: disabled, outside: type == 'link' || size == 'mini' },
                        children
                    )
                )
            );
        }
    }]);
    return Button;
}(_react.Component), _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.state = {
        press: false
    };

    this.touchStartHandler = function () {
        if (_this2.props.disabled) {
            return;
        }
        _this2.setState({
            press: true
        });
    };

    this.touchEndHandler = function () {
        _this2.setState({
            press: false
        });
    };

    this.clickHandler = function () {
        var _props2;

        if (_this2.props.disabled) {
            return;
        }
        _this2.props.onClick && (_props2 = _this2.props).onClick.apply(_props2, arguments);
    };
}, _temp2);
exports.default = Button;