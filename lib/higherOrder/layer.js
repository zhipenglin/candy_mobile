'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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
        function Layer(children, options) {
            var _this = this;

            (0, _classCallCheck3.default)(this, Layer);

            this.animateEndHandler = function () {
                if (!_this.isShow && _this.options.persistent !== true) {
                    _this.destroy();
                }
            };

            this.touchStartHandler = function (e) {
                e.preventDefault();
            };

            this.show = function () {
                if (!_this.isShow) {
                    _this.isShow = true;
                }
                document.body.style.overflow = 'hidden';
            };

            this.remove = function () {
                document.body.style.overflow = 'auto';
                if (_this.isShow) {
                    _this.isShow = false;
                    _this.options.removeCallback && _this.options.removeCallback();
                }
            };

            this.destroy = function () {
                document.body.removeChild(_this._layer);
                _reactDom2.default.unmountComponentAtNode(_this._layer);
            };

            this._layer = document.createElement('div');
            this._layer.className = 'candy-mob-layer-set';
            document.body.appendChild(this._layer);

            this.options = (0, _assign2.default)({}, options);
            this.children = children;
            this.isShow = false;
            if (this.options.persistent !== true) {
                this.show();
            }
        }

        (0, _createClass3.default)(Layer, [{
            key: '_render',
            value: function _render() {
                _reactDom2.default.render(_react2.default.createElement(
                    _rcAnimate2.default,
                    { className: 'candy-mob-layer', transitionName: 'candy-mob-layer--animate', onEnd: this.animateEndHandler },
                    this.isShow ? _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-layer__inner' },
                        _react2.default.createElement('div', { className: (0, _classnames2.default)("candy-mob-layer__cover", {
                                "candy-mob-layer__cover--transparent": ComposedComponent.coverHide
                            }), onTouchStart: this.touchStartHandler }),
                        _react2.default.createElement(
                            ComposedComponent,
                            (0, _extends3.default)({ className: 'candy-mob-layer__content' }, this.options, { remove: this.remove }),
                            this.children
                        )
                    ) : null
                ), this._layer);
            }
        }, {
            key: 'change',
            value: function change(_ref) {
                var children = _ref.children,
                    options = _ref.options;

                if (children !== undefined) {
                    this.children = children;
                }
                if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) == 'object') {
                    this.options = (0, _assign2.default)({}, this.options, options);
                }
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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('../../style/higherOrdder/layer.scss');

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }