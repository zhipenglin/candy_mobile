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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Wave = require('../Wave');

var _Wave2 = _interopRequireDefault(_Wave);

require('../../style/Buttton/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function (_Component) {
    (0, _inherits3.default)(Button, _Component);

    function Button() {
        (0, _classCallCheck3.default)(this, Button);
        return (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).apply(this, arguments));
    }

    (0, _createClass3.default)(Button, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                disabled = _props.disabled,
                children = _props.children,
                type = _props.type,
                reset = (0, _objectWithoutProperties3.default)(_props, ['className', 'disabled', 'children', 'type']);

            return _react2.default.createElement(
                'a',
                (0, _extends3.default)({ className: (0, _classnames2.default)('candy-mob-button', {
                        'candy-mob-button--disabled': disabled,
                        'candy-mob-button--primary': type == 'primary',
                        'candy-mob-button--ghost': type == 'ghost'
                    }, className) }, reset),
                _react2.default.createElement(
                    _Wave2.default,
                    { white: type == 'primary', disabled: disabled },
                    children
                )
            );
        }
    }]);
    return Button;
}(_react.Component);

exports.default = Button;