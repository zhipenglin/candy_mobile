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

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _layer = require('../higherOrder/layer');

var _layer2 = _interopRequireDefault(_layer);

require('../../style/Dialog/drawer.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Drawer = (0, _layer2.default)(_class = function (_Component) {
    (0, _inherits3.default)(Drawer, _Component);

    function Drawer() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Drawer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Drawer.__proto__ || (0, _getPrototypeOf2.default)(Drawer)).call.apply(_ref, [this].concat(args))), _this), _this.touchStartHandler = function (e) {
            e.preventDefault();
            var remove = _this.props.remove;

            remove();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Drawer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                children = _props.children,
                remove = _props.remove,
                right = _props.right;

            if (!_react2.default.isValidElement(children)) {
                throw new Error('该组件的第一个参数必须为react dom');
            }
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('candy-mob-drawer', {
                        'candy-mob-drawer--right': right
                    }, className) },
                _react2.default.createElement('div', { className: 'candy-mob-drawer__cover', onTouchStart: this.touchStartHandler }),
                _react2.default.createElement(
                    'div',
                    { className: 'candy-mob-drawer__inner' },
                    (0, _react.cloneElement)(children, {
                        remove: remove
                    })
                )
            );
        }
    }]);
    return Drawer;
}(_react.Component)) || _class;

exports.default = Drawer;