'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

exports.default = function (ComposedComponent) {
    var _class2, _temp, _initialiseProps;

    var Layer = function (_PureComponent) {
        (0, _inherits3.default)(Layer, _PureComponent);

        function Layer() {
            (0, _classCallCheck3.default)(this, Layer);

            var _this = (0, _possibleConstructorReturn3.default)(this, (Layer.__proto__ || (0, _getPrototypeOf2.default)(Layer)).call(this));

            _this.state = {
                options: null,
                children: null,
                show: false
            };

            _this.animateEndHandler = function () {
                var _this$state = _this.state,
                    show = _this$state.show,
                    options = _this$state.options;
                var destroy = _this.props.destroy;

                if (!show && options.persistent !== true) {
                    destroy();
                }
            };

            _this.touchStartHandler = function (e) {
                e.preventDefault();
            };

            _this.animateEndHandler = _this.animateEndHandler.bind(_this);
            _this.touchStartHandler = _this.touchStartHandler.bind(_this);
            return _this;
        }

        (0, _createClass3.default)(Layer, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _props = this.props,
                    children = _props.children,
                    options = _props.options;

                this.setState({
                    options: options, children: children
                });
            }
        }, {
            key: 'show',
            value: function show() {
                var show = this.state.show;

                if (show) {
                    return;
                }
                this.setState({ show: true });
            }
        }, {
            key: 'hide',
            value: function hide(callback) {
                var show = this.state.show;

                if (!show) {
                    return;
                }
                this.setState({ show: false }, function () {
                    callback();
                });
            }
        }, {
            key: 'isShow',
            value: function isShow() {
                return this.state.show;
            }
        }, {
            key: 'change',
            value: function change(_ref) {
                var children = _ref.children,
                    options = _ref.options;

                this.setState({ children: children || this.state.children, options: (0, _assign2.default)({}, this.state.options, options) });
            }
        }, {
            key: 'render',
            value: function render() {
                var _state = this.state,
                    show = _state.show,
                    children = _state.children,
                    options = _state.options;
                var remove = this.props.remove;

                return _react2.default.createElement(
                    _rcAnimate2.default,
                    { className: 'candy-mob-layer', transitionName: 'candy-mob-layer--animate', onEnd: this.animateEndHandler },
                    show ? _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-layer__inner' },
                        _react2.default.createElement('div', { className: 'candy-mob-layer__cover', onTouchStart: this.touchStartHandler }),
                        _react2.default.createElement(
                            ComposedComponent,
                            (0, _extends3.default)({ className: 'candy-mob-layer__content' }, options, { remove: remove }),
                            children
                        )
                    ) : null
                );
            }
        }]);
        return Layer;
    }(_react.PureComponent);

    return _temp = _class2 = function () {
        function _class2(children, options) {
            (0, _classCallCheck3.default)(this, _class2);

            _initialiseProps.call(this);

            this._layer = document.createElement('div');
            this._layer.className = 'candy-mob-layer-set';
            document.body.appendChild(this._layer);

            this.options = (0, _assign2.default)({}, options);
            this.children = children;
            this.reactLayer = this._render();
            if (!this.options.persistent) {
                this.show();
            }
        }

        (0, _createClass3.default)(_class2, [{
            key: '_render',
            value: function _render() {
                return _reactDom2.default.render(_react2.default.createElement(
                    Layer,
                    { options: this.options, remove: this.remove, destroy: this.destroy },
                    this.children
                ), this._layer);
            }
        }]);
        return _class2;
    }(), _initialiseProps = function _initialiseProps() {
        var _this2 = this;

        this.change = function (_ref2) {
            var children = _ref2.children,
                options = _ref2.options;

            _this2.reactLayer.change({ children: children, options: options });
        };

        this.show = function () {
            _this2.reactLayer.show();
            document.body.style.overflow = 'hidden';
        };

        this.remove = function () {
            document.body.style.overflow = 'auto';
            _this2.reactLayer.hide(function () {
                _this2.options.removeCallback && _this2.options.removeCallback();
            });
        };

        this.destroy = function () {
            document.body.removeChild(_this2._layer);
            _reactDom2.default.unmountComponentAtNode(_this2._layer);
        };
    }, _temp;
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