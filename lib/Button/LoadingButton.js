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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingButton = (_temp = _class = function (_PureComponent) {
    (0, _inherits3.default)(LoadingButton, _PureComponent);

    function LoadingButton() {
        (0, _classCallCheck3.default)(this, LoadingButton);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LoadingButton.__proto__ || (0, _getPrototypeOf2.default)(LoadingButton)).call(this));

        _this.clickHandler = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this$props = _this.props,
                onClick = _this$props.onClick,
                disabled = _this$props.disabled;

            if (disabled || _this.state.loading) {
                return;
            }
            _this.setState({
                text: _this.getLoadingText(),
                loading: true
            });
            onClick.apply(undefined, [_this.changeHandler].concat(args));
        };

        _this.changeHandler = function (progress) {
            var loadingText = _this.props.loadingText;

            if (progress === true || progress === undefined || typeof progress == 'number' && progress >= 100) {
                _this.setState({
                    loading: false
                });
            } else if (typeof progress == 'string') {
                _this.setState({
                    text: progress
                });
            } else if (typeof progress == 'number') {
                _this.setState({
                    text: _this.getLoadingText(progress)
                });
            }
        };

        _this.state = {
            loading: false
        };
        return _this;
    }

    (0, _createClass3.default)(LoadingButton, [{
        key: 'getLoadingText',
        value: function getLoadingText() {
            var progress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var loadingText = this.props.loadingText;

            return loadingText.replace(/%s/g, progress);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                disabled = _props.disabled,
                loadingText = _props.loadingText,
                onClick = _props.onClick,
                children = _props.children,
                reset = (0, _objectWithoutProperties3.default)(_props, ['disabled', 'loadingText', 'onClick', 'children']);

            return _react2.default.createElement(
                _index2.default,
                (0, _extends3.default)({ disabled: disabled || this.state.loading, onClick: this.clickHandler }, reset),
                this.state.loading ? _react2.default.createElement(
                    'div',
                    { className: 'candy-mob-button--loading' },
                    this.state.text
                ) : children
            );
        }
    }]);
    return LoadingButton;
}(_react.PureComponent), _class.defaultProps = {
    loadingText: '正在加载...%s%'
}, _temp);
exports.default = LoadingButton;
;