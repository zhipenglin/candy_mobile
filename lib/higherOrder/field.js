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

exports.default = field;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function field(MiddleComponent) {
    var _class, _temp;

    return _temp = _class = function (_PureComponent) {
        (0, _inherits3.default)(Field, _PureComponent);

        function Field() {
            (0, _classCallCheck3.default)(this, Field);

            var _this = (0, _possibleConstructorReturn3.default)(this, (Field.__proto__ || (0, _getPrototypeOf2.default)(Field)).call(this));

            _this.state = {
                value: '',
                active: false,
                status: 0, //0 初始化状态 1 正在校验中 2 错误
                errMsg: ''
            };

            _this.onActiveChange = _this.onActiveChange.bind(_this);
            _this.onValueChangeHandler = _this.onValueChangeHandler.bind(_this);
            return _this;
        }

        (0, _createClass3.default)(Field, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var value = this.props.value;

                this.setState({ value: value });
            }
        }, {
            key: 'onValueChangeHandler',
            value: function onValueChangeHandler(value, noDispatch) {
                var _this2 = this;

                var dispatch = this.props.dispatch;

                if (noDispatch) {
                    this.setState({ status: 0, value: value, errMsg: '' });
                    return;
                }
                if (value === undefined) {
                    value = this.state.value;
                }
                dispatch(value).then(function (res) {
                    if (res === true) {
                        _this2.setState({ status: 0, value: value, errMsg: '' });
                    } else {
                        _this2.setState({ status: 2, errMsg: res });
                    }
                });
                this.setState({ status: 1 });
            }
        }, {
            key: 'onActiveChange',
            value: function onActiveChange() {
                var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                this.setState({
                    active: !!status
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    value = _props.value,
                    dispatch = _props.dispatch,
                    data = _props.data,
                    name = _props.name,
                    rule = _props.rule,
                    label = _props.label,
                    extra = _props.extra,
                    others = (0, _objectWithoutProperties3.default)(_props, ['value', 'dispatch', 'data', 'name', 'rule', 'label', 'extra']);

                return _react2.default.createElement(MiddleComponent, (0, _extends3.default)({}, others, { label: label, active: this.state.active, value: this.state.value, status: this.state.status, errMsg: this.state.errMsg, onValueChange: this.onValueChangeHandler, onActiveChange: this.onActiveChange }));
            }
        }]);
        return Field;
    }(_react.PureComponent), _class.formType = 'field', _class.propTypes = {
        name: _react.PropTypes.string.isRequired,
        rule: _react.PropTypes.string,
        label: _react.PropTypes.string,
        extra: _react.PropTypes.func
    }, _temp;
}