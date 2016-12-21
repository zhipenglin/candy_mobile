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

var _class; /**
             * Created by ifchangetoclzp on 2016/12/15.
             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _layer = require('../higherOrder/layer');

var _layer2 = _interopRequireDefault(_layer);

require('../../style/Dialog/confirm.scss');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Confirm = (0, _layer2.default)(_class = function (_Component) {
    (0, _inherits3.default)(Confirm, _Component);

    function Confirm() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Confirm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Confirm.__proto__ || (0, _getPrototypeOf2.default)(Confirm)).call.apply(_ref, [this].concat(args))), _this), _this.cancelClickHandler = function () {
            var _this$props = _this.props,
                remove = _this$props.remove,
                cancelCallback = _this$props.cancelCallback;

            if (typeof cancelCallback == 'function') {
                cancelCallback(remove);
            } else {
                remove();
            }
        }, _this.confirmClickHandler = function () {
            var _this$props2 = _this.props,
                remove = _this$props2.remove,
                confirmCallback = _this$props2.confirmCallback;

            if (typeof confirmCallback == 'function') {
                confirmCallback(remove);
            } else {
                remove();
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Confirm, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                title = _props.title,
                callbackCancel = _props.callbackCancel,
                textCancel = _props.textCancel,
                callbackConfirm = _props.callbackConfirm,
                textConfirm = _props.textConfirm,
                children = _props.children;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)("candy-mob-confirm", className) },
                _react2.default.createElement(
                    'div',
                    { className: 'candy-mob-confirm__inner' },
                    _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-confirm__animate' },
                        _react2.default.createElement(
                            'div',
                            { className: 'candy-mob-confirm__content' },
                            title ? _react2.default.createElement(
                                'div',
                                { className: 'candy-mob-confirm__title' },
                                title
                            ) : null,
                            _react2.default.createElement(
                                'div',
                                { className: 'candy-mob-confirm__msg' },
                                children
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: (0, _classnames2.default)("candy-mob-confirm__buttons", {
                                    "candy-mob-confirm__buttons--has-cancel": callbackCancel || textCancel
                                }) },
                            callbackCancel || textCancel ? _react2.default.createElement(
                                _Button2.default,
                                { className: 'candy-mob-confirm__button', type: 'ghost', onClick: this.cancelClickHandler },
                                textCancel || '取消'
                            ) : null,
                            _react2.default.createElement(
                                _Button2.default,
                                { className: 'candy-mob-confirm__button', type: 'ghost', onClick: this.confirmClickHandler },
                                textConfirm || '确定'
                            )
                        )
                    )
                )
            );
        }
    }]);
    return Confirm;
}(_react.Component)) || _class;

exports.default = Confirm;