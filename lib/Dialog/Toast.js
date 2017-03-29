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

var _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _layerTouchClose = require('../higherOrder/layerTouchClose');

var _layerTouchClose2 = _interopRequireDefault(_layerTouchClose);

require('../../style/Dialog/toast.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toast = (0, _layerTouchClose2.default)(_class = (_temp = _class2 = function (_PureComponent) {
    (0, _inherits3.default)(Toast, _PureComponent);

    function Toast() {
        (0, _classCallCheck3.default)(this, Toast);
        return (0, _possibleConstructorReturn3.default)(this, (Toast.__proto__ || (0, _getPrototypeOf2.default)(Toast)).apply(this, arguments));
    }

    (0, _createClass3.default)(Toast, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                remove = _props.remove,
                callback = _props.callback,
                time = _props.time;

            if (time) {
                this.timer = setTimeout(function () {
                    remove();
                    if (typeof callback == 'function') {
                        callback();
                    }
                }, time);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                className = _props2.className,
                type = _props2.type,
                children = _props2.children;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)("candy-mob-toast", className) },
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
        }
    }]);
    return Toast;
}(_react.PureComponent), _class2.defaultProps = {
    type: 'error',
    time: 2000
}, _temp)) || _class;

exports.default = Toast;