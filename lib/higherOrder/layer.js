'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = function (ComposedComponent) {
    return function () {
        function Layer(text, options) {
            var _this = this;

            (0, _classCallCheck3.default)(this, Layer);

            this.show = function () {
                if (!_this.alive) {
                    console.warn('当前组件已销毁');
                    return;
                }
                if (!_this.isShow) {
                    _this.isShow = true;
                    _this._render();
                }
            };

            this.remove = function () {
                if (!_this.alive) {
                    return;
                }
                _this.alive = false;
                _reactDom2.default.unmountComponentAtNode(_this._layer);
                document.body.removeChild(_this._layer);
            };

            this.close = function () {
                if (!_this.alive) {
                    return;
                }
                if (_this.isShow) {
                    _this.isShow = false;
                    _this._render();
                }
            };

            this._layer = document.createElement('div');
            this.alive = true;
            this.isShow = true;
            this.options = options;
            this.text = text;
            document.body.appendChild(this._layer);
            this._render();
        }

        (0, _createClass3.default)(Layer, [{
            key: '_render',
            value: function _render() {
                _reactDom2.default.render(_react2.default.createElement(
                    ComposedComponent,
                    (0, _extends3.default)({ className: 'candy-mob-layer', show: this.isShow, remove: this.remove, close: this.close }, this.options),
                    this.text
                ), this._layer);
            }
        }]);
        return Layer;
    }();
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('../../style/higherOrdder/layer.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }