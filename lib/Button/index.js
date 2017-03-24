'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Wave = require('../Wave');

var _Wave2 = _interopRequireDefault(_Wave);

var _Touch = require('../Touch');

var _Touch2 = _interopRequireDefault(_Touch);

require('../../style/Buttton/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function (_Component) {
    (0, _inherits3.default)(Button, _Component);

    function Button() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Button);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            press: false
        }, _this.touchStartHandler = function () {
            if (_this.props.disabled) {
                return;
            }
            _this.setState({
                press: true
            });
        }, _this.touchEndHandler = function () {
            _this.setState({
                press: false
            });
        }, _this.clickHandler = function (event, superEvent) {
            if (_this.props.disabled) {
                return;
            }
            _this.props.onClick && _this.props.onClick(event, superEvent);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Button, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                noWave = _props.noWave,
                disabled = _props.disabled,
                style = _props.style,
                onClick = _props.onClick,
                size = _props.size,
                children = _props.children,
                type = _props.type,
                reset = (0, _objectWithoutProperties3.default)(_props, ['className', 'noWave', 'disabled', 'style', 'onClick', 'size', 'children', 'type']);

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('candy-mob-button', {
                        'candy-mob-button--disabled': disabled,
                        'candy-mob-button--primary': type == 'primary',
                        'candy-mob-button--ghost': type == 'ghost',
                        'candy-mob-button--link': type == 'link',
                        'candy-mob-button--small': size == 'small',
                        'candy-mob-button--mini': size == 'mini',
                        'candy-mob-button--press': this.state.press
                    }, className), style: style },
                _react2.default.createElement(
                    _Touch2.default,
                    { onTap: this.clickHandler, onTouchStart: this.touchStartHandler, onTouchEnd: this.touchEndHandler, onTouchCancel: this.touchEndHandler },
                    noWave === true ? children : _react2.default.createElement(
                        _Wave2.default,
                        { white: type == 'primary', disabled: disabled, outside: type == 'link' || size == 'mini' },
                        children
                    )
                )
            );
        }
    }]);
    return Button;
}(_react.Component);

exports.default = Button;