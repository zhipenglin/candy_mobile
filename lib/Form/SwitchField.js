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

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _field = require('../higherOrder/field');

var _field2 = _interopRequireDefault(_field);

var _fieldDecorator = require('../higherOrder/fieldDecorator');

var _fieldDecorator2 = _interopRequireDefault(_fieldDecorator);

var _Switch = require('../Switch');

var _Switch2 = _interopRequireDefault(_Switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwitchField = (_dec = (0, _recompose.compose)(_field2.default, _fieldDecorator2.default), _dec(_class = function (_PureComponent) {
    (0, _inherits3.default)(SwitchField, _PureComponent);

    function SwitchField() {
        (0, _classCallCheck3.default)(this, SwitchField);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SwitchField.__proto__ || (0, _getPrototypeOf2.default)(SwitchField)).call(this));

        _this.onChangeHandler = _this.onChangeHandler.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(SwitchField, [{
        key: 'onChangeHandler',
        value: function onChangeHandler(value) {
            var onValueChange = this.props.onValueChange;

            onValueChange(value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                value = _props.value,
                onValueChange = _props.onValueChange,
                onActiveChange = _props.onActiveChange,
                others = (0, _objectWithoutProperties3.default)(_props, ['value', 'onValueChange', 'onActiveChange']);

            return _react2.default.createElement(_Switch2.default, (0, _extends3.default)({}, others, { value: value, onChange: this.onChangeHandler }));
        }
    }]);
    return SwitchField;
}(_react.PureComponent)) || _class);
exports.default = SwitchField;