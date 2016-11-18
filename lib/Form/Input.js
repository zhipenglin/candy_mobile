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

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

var _active = require('./active');

var _active2 = _interopRequireDefault(_active);

require('../../style/Form/input.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = (0, _field2.default)(_class = (0, _active2.default)(_class = function (_Component) {
    (0, _inherits3.default)(Input, _Component);

    function Input() {
        (0, _classCallCheck3.default)(this, Input);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Input.__proto__ || (0, _getPrototypeOf2.default)(Input)).call(this));

        _this.changeHandler = function (e) {
            var value = e.target.value;
            _this.setState({
                value: value
            });
            var onChange = _this.props.onChange;

            onChange(value.trim());
        };

        _this.state = {
            value: ''
        };
        return _this;
    }

    (0, _createClass3.default)(Input, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                value = _props.value,
                onChange = _props.onChange;

            onChange(value.trim(), true);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                value = _props2.value,
                onChange = _props2.onChange,
                reset = (0, _objectWithoutProperties3.default)(_props2, ['value', 'onChange']);

            return _react2.default.createElement('input', (0, _extends3.default)({ className: 'candy-mob-input', onChange: this.changeHandler, type: 'text', value: this.state.value }, reset));
        }
    }]);
    return Input;
}(_react.Component)) || _class) || _class;

exports.default = Input;