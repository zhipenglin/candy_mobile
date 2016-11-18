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

var _LoadingButton = require('../Button/LoadingButton');

var _LoadingButton2 = _interopRequireDefault(_LoadingButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubmitButton = (_temp2 = _class = function (_Component) {
	(0, _inherits3.default)(SubmitButton, _Component);

	function SubmitButton() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, SubmitButton);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SubmitButton.__proto__ || (0, _getPrototypeOf2.default)(SubmitButton)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(SubmitButton, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    submit = _props.submit,
			    onClick = _props.onClick,
			    reset = (0, _objectWithoutProperties3.default)(_props, ['submit', 'onClick']);

			return _react2.default.createElement(_LoadingButton2.default, (0, _extends3.default)({ onClick: this.clickHandler }, reset));
		}
	}]);
	return SubmitButton;
}(_react.Component), _class.hasFormType = 'SubmitButton', _class.defaultProps = {
	onClick: function onClick() {}
}, _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.clickHandler = function (change) {
		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		var _props2 = _this2.props,
		    onClick = _props2.onClick,
		    submit = _props2.submit;

		if (submit) {
			submit(change);
		}
		onClick.apply(undefined, args);
	};
}, _temp2);
exports.default = SubmitButton;