'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

exports.default = function (ComposedComponent) {
    return function (_Component) {
        (0, _inherits3.default)(active, _Component);

        function active() {
            var _ref;

            var _temp, _this, _ret;

            (0, _classCallCheck3.default)(this, active);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = active.__proto__ || (0, _getPrototypeOf2.default)(active)).call.apply(_ref, [this].concat(args))), _this), _this.onActiveChange = function (event) {
                var onActiveChange = _this.props.onActiveChange;

                if (event.type == 'focus') {
                    onActiveChange(true);
                } else if (event.type == 'blur') {
                    onActiveChange(false);
                }
            }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
        }

        (0, _createClass3.default)(active, [{
            key: 'render',
            value: function render() {
                var _props = this.props,
                    onActiveChange = _props.onActiveChange,
                    reset = (0, _objectWithoutProperties3.default)(_props, ['onActiveChange']);

                return _react2.default.createElement(ComposedComponent, (0, _extends3.default)({ className: 'candy-mob-input', onFocus: this.onActiveChange, onBlur: this.onActiveChange }, reset));
            }
        }]);
        return active;
    }(_react.Component);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }