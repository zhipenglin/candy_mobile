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

var _dec, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _field = require('../higherOrder/field');

var _field2 = _interopRequireDefault(_field);

var _fieldDecorator = require('../higherOrder/fieldDecorator');

var _fieldDecorator2 = _interopRequireDefault(_fieldDecorator);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = (_dec = (0, _recompose.compose)(_field2.default, _fieldDecorator2.default), _dec(_class = (_temp = _class2 = function (_PureComponent) {
    (0, _inherits3.default)(Input, _PureComponent);

    function Input() {
        (0, _classCallCheck3.default)(this, Input);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Input.__proto__ || (0, _getPrototypeOf2.default)(Input)).call(this));

        _this.onBlurHandler = _this.onBlurHandler.bind(_this);
        _this.onChangeHandler = _this.onChangeHandler.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Input, [{
        key: 'onBlurHandler',
        value: function onBlurHandler(event) {
            var _props = this.props,
                onValueChange = _props.onValueChange,
                onBlur = _props.onBlur;

            onValueChange(event.target.value);
            typeof onBlur == 'function' && onBlur(event);
        }
    }, {
        key: 'onChangeHandler',
        value: function onChangeHandler(event) {
            var _props2 = this.props,
                onValueChange = _props2.onValueChange,
                onChange = _props2.onChange;

            onValueChange(event.target.value, true);
            typeof onChange == 'function' && onChange(event);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                value = _props3.value,
                type = _props3.type,
                maxLength = _props3.maxLength,
                onValueChange = _props3.onValueChange,
                others = (0, _objectWithoutProperties3.default)(_props3, ['value', 'type', 'maxLength', 'onValueChange']);

            if (type == 'textarea') {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('textarea', (0, _extends3.default)({}, others, { value: value, onBlur: this.onBlurHandler, onChange: this.onChangeHandler })),
                    maxLength ? _react2.default.createElement(
                        'span',
                        { className: 'font-number' },
                        maxLength - value.length >= 0 ? maxLength - value.length + '/' + maxLength : '超出' + (value.length - maxLength) + '字符'
                    ) : null
                );
            }
            if (type == 'password') {
                return _react2.default.createElement('input', (0, _extends3.default)({ type: 'password' }, others, { value: value, onBlur: this.onBlurHandler, onChange: this.onChangeHandler }));
            }
            return _react2.default.createElement('input', (0, _extends3.default)({ type: 'text' }, others, { value: value, onBlur: this.onBlurHandler, onChange: this.onChangeHandler }));
        }
    }]);
    return Input;
}(_react.PureComponent), _class2.propTypes = {
    value: _react.PropTypes.string,
    onValueChange: _react.PropTypes.func
}, _class2.defaultProps = {
    value: '',
    onValueChange: function onValueChange() {}
}, _temp)) || _class);
exports.default = Input;