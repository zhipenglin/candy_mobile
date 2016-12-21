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

require('../../style/Dialog/action.scss');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Action = (0, _layer2.default)(_class = function (_Component) {
    (0, _inherits3.default)(Action, _Component);

    function Action() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Action);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Action.__proto__ || (0, _getPrototypeOf2.default)(Action)).call.apply(_ref, [this].concat(args))), _this), _this.actionClickHandler = function (callback) {
            var remove = _this.props.remove;

            if (typeof callback == 'function') {
                callback(remove);
            } else {
                remove();
            }
        }, _this.touchStartHandler = function (e) {
            e.preventDefault();
            var remove = _this.props.remove;

            remove();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Action, [{
        key: 'renderAction',
        value: function renderAction(data, key) {
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)("candy-mob-action__item", {
                        "candy-mob-action__item--label": data.label
                    }), key: key },
                data.label ? data.text : _react2.default.createElement(
                    _Button2.default,
                    { className: 'candy-mob-action__button', type: 'ghost', style: { 'color': data.color }, onClick: this.actionClickHandler.bind(this, data.callback) },
                    data.text
                )
            );
        }
    }, {
        key: 'renderGroup',
        value: function renderGroup(data, key) {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'candy-mob-action__group', key: key },
                data.map(function (item, i) {
                    return _this2.renderAction(item, i);
                })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                className = _props.className,
                children = _props.children;

            if (!Array.isArray(children)) {
                throw Error('参数必须为数组');
            }
            var childrenContent = children.map(function (data, i) {
                if (Array.isArray(data)) {
                    return _this3.renderGroup(data, i);
                } else {
                    return _this3.renderAction(data, i);
                }
            });
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)("candy-mob-action", className) },
                _react2.default.createElement('div', { className: 'candy-mob-action__cover', onTouchStart: this.touchStartHandler }),
                _react2.default.createElement(
                    'div',
                    { className: 'candy-mob-action__inner' },
                    _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-action__animate' },
                        childrenContent
                    )
                )
            );
        }
    }]);
    return Action;
}(_react.Component)) || _class;

exports.default = Action;