'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = function (ComposedComponent) {
    return function () {
        function Layer(text, options) {
            var _this = this;

            (0, _classCallCheck3.default)(this, Layer);

            this.animateEndHandler = function () {
                if (!_this.isShow) {
                    _this.destroy();
                }
            };

            this.show = function () {
                if (!_this.isShow) {
                    _this.isShow = true;
                }
            };

            this.remove = function () {
                if (_this.isShow) {
                    _this.isShow = false;
                    _this.options.removeCallback && _this.options.removeCallback();
                }
            };

            this.destroy = function () {
                //ReactDOM.unmountComponentAtNode(this._layer);
                document.body.removeChild(_this._layer);
            };

            this._layer = document.createElement('div');
            this._layer.className = 'candy-mob-layer-set';
            document.body.appendChild(this._layer);

            this.options = (0, _assign2.default)({}, options);
            this.text = text;
            this.isShow = false;
            this.show();
        }

        (0, _createClass3.default)(Layer, [{
            key: '_render',
            value: function _render() {
                _reactDom2.default.render(_react2.default.createElement(
                    _rcAnimate2.default,
                    { transitionName: 'candy-mob-layer--animate', onEnd: this.animateEndHandler },
                    this.isShow ? _react2.default.createElement(
                        ComposedComponent,
                        (0, _extends3.default)({ className: 'candy-mob-layer', remove: this.remove }, this.options),
                        this.text
                    ) : null
                ), this._layer);
            }
        }, {
            key: 'isShow',
            set: function set(value) {
                this._isShow = value;
                this._render();
            },
            get: function get() {
                return this._isShow;
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

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }