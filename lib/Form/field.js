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
    var _class, _temp;

    return _temp = _class = function (_Component) {
        (0, _inherits3.default)(field, _Component);

        function field() {
            (0, _classCallCheck3.default)(this, field);

            var _this = (0, _possibleConstructorReturn3.default)(this, (field.__proto__ || (0, _getPrototypeOf2.default)(field)).call(this));

            _this.dataChangeHandler = function (value) {
                var isInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                _this.setValue(value, isInit);
            };

            _this.activeChangeHandler = function (isActive) {
                _this.setState({
                    active: isActive
                });
            };

            _this.state = {
                active: false
            };
            return _this;
        }

        (0, _createClass3.default)(field, [{
            key: 'setValue',
            value: function setValue(value, isInit) {
                var _props = this.props,
                    onDataChange = _props.onDataChange,
                    name = _props.name;

                onDataChange(name, value, isInit);
            }
        }, {
            key: 'render',
            value: function render() {
                var _props2 = this.props,
                    onChange = _props2.onChange,
                    className = _props2.className,
                    name = _props2.name,
                    onDataChange = _props2.onDataChange,
                    onActiveChange = _props2.onActiveChange,
                    rule = _props2.rule,
                    label = _props2.label,
                    extra = _props2.extra,
                    reset = (0, _objectWithoutProperties3.default)(_props2, ['onChange', 'className', 'name', 'onDataChange', 'onActiveChange', 'rule', 'label', 'extra']);

                return _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)("candy-mob-field", {
                            "candy-mob-field--active": this.state.active
                        }, className) },
                    _react2.default.createElement(ComposedComponent, (0, _extends3.default)({ onChange: this.dataChangeHandler, onActiveChange: this.activeChangeHandler }, reset))
                );
            }
        }]);
        return field;
    }(_react.Component), _class.hasFormType = 'field', _class.defaultProps = {
        value: '',
        onDataChange: function onDataChange() {}
    }, _temp;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('../../style/Form/field.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }