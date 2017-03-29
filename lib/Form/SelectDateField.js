'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectTimeField = exports.SelectDateTimeField = undefined;

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

var _recompose = require('recompose');

var _field = require('../higherOrder/field');

var _field2 = _interopRequireDefault(_field);

var _fieldDecorator = require('../higherOrder/fieldDecorator');

var _fieldDecorator2 = _interopRequireDefault(_fieldDecorator);

var _SelectDate = require('../Select/SelectDate');

var _SelectDate2 = _interopRequireDefault(_SelectDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var core = function core(Component) {
    var _class, _temp;

    return _temp = _class = function (_PureComponent) {
        (0, _inherits3.default)(_class, _PureComponent);

        function _class() {
            (0, _classCallCheck3.default)(this, _class);

            var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this));

            _this.clickHandler = _this.clickHandler.bind(_this);
            return _this;
        }

        (0, _createClass3.default)(_class, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _this2 = this;

                var _props = this.props,
                    value = _props.value,
                    onValueChange = _props.onValueChange,
                    onActiveChange = _props.onActiveChange,
                    others = (0, _objectWithoutProperties3.default)(_props, ['value', 'onValueChange', 'onActiveChange']);

                this.select = new Component((0, _extends3.default)({
                    onChange: function onChange(value, data) {
                        onValueChange(value);
                        onActiveChange();
                        _this2.select.change({ children: data });
                    }, onCancel: function onCancel() {
                        onValueChange();
                        onActiveChange();
                    },
                    persistent: true }, others));
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.select.destroy();
            }
        }, {
            key: 'clickHandler',
            value: function clickHandler() {
                var onActiveChange = this.props.onActiveChange;

                onActiveChange(true);
                this.select.show();
            }
        }, {
            key: 'render',
            value: function render() {
                var _props2 = this.props,
                    value = _props2.value,
                    placeholder = _props2.placeholder,
                    className = _props2.className,
                    children = _props2.children;

                return _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)('candy-mob-form-select', className), onClick: this.clickHandler },
                    value ? value : _react2.default.createElement(
                        'span',
                        { className: 'candy-mob-form-select__placeholder' },
                        placeholder
                    )
                );
            }
        }]);
        return _class;
    }(_react.PureComponent), _class.defaultProps = {
        placeholder: '请选择'
    }, _temp;
};

exports.default = (0, _recompose.compose)(_field2.default, _fieldDecorator2.default, core)(_SelectDate2.default);
var SelectDateTimeField = exports.SelectDateTimeField = (0, _recompose.compose)(_field2.default, _fieldDecorator2.default, core)(_SelectDate.SelectDateTime);
var SelectTimeField = exports.SelectTimeField = (0, _recompose.compose)(_field2.default, _fieldDecorator2.default, core)(_SelectDate.SelectTime);