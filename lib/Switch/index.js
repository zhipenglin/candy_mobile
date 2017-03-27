'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('../../style/Switch/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Switch = (_temp = _class = function (_PureComponent) {
    (0, _inherits3.default)(Switch, _PureComponent);

    function Switch() {
        (0, _classCallCheck3.default)(this, Switch);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Switch.__proto__ || (0, _getPrototypeOf2.default)(Switch)).call(this));

        _this.state = {
            value: true
        };

        _this.onClickHandler = _this.onClickHandler.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Switch, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ value: this.props.value });
        }
    }, {
        key: 'onClickHandler',
        value: function onClickHandler() {
            var _this2 = this;

            var onChange = this.props.onChange;

            this.setState({ value: !this.state.value }, function () {
                onChange(_this2.state.value);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                openLabel = _props.openLabel,
                closeLabel = _props.closeLabel;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)("candy-mob-switch", {
                        "candy-mob-switch--open": this.state.value
                    }, className), onClick: this.onClickHandler },
                _react2.default.createElement(
                    'div',
                    { className: 'candy-mob-switch__inner' },
                    _react2.default.createElement('div', { className: 'candy-mob-switch__button' })
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'candy-mob-switch__label' },
                    this.state.value ? openLabel : closeLabel
                )
            );
        }
    }]);
    return Switch;
}(_react.PureComponent), _class.defaultProps = {
    value: true,
    openLabel: '开',
    closeLabel: '关',
    onChange: function onChange() {}
}, _class.propTypes = {
    value: _react.PropTypes.bool,
    onChange: _react.PropTypes.func
}, _temp);
exports.default = Switch;