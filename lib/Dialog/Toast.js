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

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _layer = require('../higherOrder/layer');

var _layer2 = _interopRequireDefault(_layer);

require('../../style/Dialog/toast.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toast = (0, _layer2.default)(_class = (_temp2 = _class2 = function (_Component) {
    (0, _inherits3.default)(Toast, _Component);

    function Toast() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Toast);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Toast.__proto__ || (0, _getPrototypeOf2.default)(Toast)).call.apply(_ref, [this].concat(args))), _this), _this.touchStartHandler = function (e) {
            e.preventDefault();
            var remove = _this.props.remove;

            clearTimeout(_this.timer);
            remove();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Toast, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                remove = _props.remove,
                time = _props.time;

            if (time) {
                this.timer = setTimeout(function () {
                    remove();
                }, time);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                show = _props2.show,
                className = _props2.className,
                type = _props2.type,
                children = _props2.children;

            if (show) {
                return _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)("candy-mob-toast", className), onTouchStart: this.touchStartHandler },
                    _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-toast__inner' },
                        _react2.default.createElement('div', { className: (0, _classnames2.default)("candy-mob-toast__icon", {
                                "candy-mob-toast__icon--error": type == 'error',
                                "candy-mob-toast__icon--success": type == 'success',
                                "candy-mob-toast__icon--loading": type == 'loading'
                            }) }),
                        _react2.default.createElement(
                            'div',
                            { className: 'candy-mob-toast__content' },
                            children || '正在加载中...'
                        )
                    )
                );
            } else {
                return null;
            }
        }
    }]);
    return Toast;
}(_react.Component), _class2.defaultProps = {
    type: 'error',
    time: 2000
}, _temp2)) || _class;

exports.default = Toast;