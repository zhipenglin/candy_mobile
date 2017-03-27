'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _recompose = require('recompose');

var _field = require('../higherOrder/field');

var _field2 = _interopRequireDefault(_field);

var _fieldDecorator = require('../higherOrder/fieldDecorator');

var _fieldDecorator2 = _interopRequireDefault(_fieldDecorator);

var _Select = require('../Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectField = (_dec = (0, _recompose.compose)(_field2.default, _fieldDecorator2.default), _dec(_class = (_temp = _class2 = function (_PureComponent) {
    (0, _inherits3.default)(SelectField, _PureComponent);

    function SelectField() {
        (0, _classCallCheck3.default)(this, SelectField);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SelectField.__proto__ || (0, _getPrototypeOf2.default)(SelectField)).call(this));

        _this.clickHandler = _this.clickHandler.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(SelectField, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var _props = this.props,
                value = _props.value,
                children = _props.children,
                onValueChange = _props.onValueChange,
                onActiveChange = _props.onActiveChange,
                others = (0, _objectWithoutProperties3.default)(_props, ['value', 'children', 'onValueChange', 'onActiveChange']);

            this.selectData = (0, _Select.dataFormat)(children);
            this.setDefaultValue();
            this.select = new _Select2.default(this.selectData, (0, _extends3.default)({ onChange: function onChange(value, data) {
                    onValueChange(value);
                    onActiveChange();
                    _this2.select.change({ children: data });
                }, onCancel: function onCancel() {
                    onValueChange();
                    onActiveChange();
                }, persistent: true }, others));
        }
    }, {
        key: 'clickHandler',
        value: function clickHandler() {
            var onActiveChange = this.props.onActiveChange;

            onActiveChange(true);
            this.select.show();
        }
    }, {
        key: 'setDefaultValue',
        value: function setDefaultValue() {
            var _this3 = this;

            var value = this.props.value;

            if (Array.isArray(value)) {
                value.forEach(function (item, i) {
                    _this3.selectData[i].defaultValue = item;
                });
            } else {
                this.selectData[0].defaultValue = value;
            }
            this.selectData = (0, _Select.dataFormat)(this.selectData);
        }
    }, {
        key: 'mapValue',
        value: function mapValue() {
            var _this4 = this;

            var value = this.props.value;

            var list = [];
            if (!value) {
                return;
            }
            if (Array.isArray(value)) {
                if (value.length != this.selectData.length) {
                    return;
                }

                var _loop = function _loop(i) {
                    var selected = _this4.selectData[i].list.find(function (group) {
                        return group.value == value[i];
                    });
                    if (!selected) {
                        return {
                            v: void 0
                        };
                    }
                    list.push(selected.text);
                };

                for (var i = 0; i < value.length; i++) {
                    var _ret = _loop(i);

                    if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
                }
                return list.join(',');
            } else {
                if (this.selectData.length != 1) {
                    return;
                }
                var selected = this.selectData[0].list.find(function (group) {
                    return group.value == value;
                });
                if (!selected) {
                    return;
                }
                return selected.text;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                value = _props2.value,
                placeholder = _props2.placeholder,
                className = _props2.className,
                children = _props2.children;

            var text = this.mapValue();
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('candy-mob-form-select', className), onClick: this.clickHandler },
                text ? text : _react2.default.createElement(
                    'span',
                    { className: 'candy-mob-form-select__placeholder' },
                    placeholder
                )
            );
        }
    }]);
    return SelectField;
}(_react.PureComponent), _class2.defaultProps = {
    placeholder: '请选择'
}, _temp)) || _class);
exports.default = SelectField;