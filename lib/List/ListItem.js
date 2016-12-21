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

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Touch = require('../Touch');

var _Touch2 = _interopRequireDefault(_Touch);

var _layer = require('../higherOrder/layer');

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cover = (0, _layer2.default)(_class = function (_Component) {
    (0, _inherits3.default)(Cover, _Component);

    function Cover() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Cover);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Cover.__proto__ || (0, _getPrototypeOf2.default)(Cover)).call.apply(_ref, [this].concat(args))), _this), _this.touchStartHandler = function () {
            _this.props.remove();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Cover, [{
        key: 'render',
        value: function render() {
            var className = this.props.className;

            return _react2.default.createElement('div', { className: (0, _classnames2.default)("candy-mob-list_item_layer", className), onTouchStart: this.touchStartHandler });
        }
    }]);
    return Cover;
}(_react.Component)) || _class;

var ListItem = function (_Component2) {
    (0, _inherits3.default)(ListItem, _Component2);

    function ListItem() {
        (0, _classCallCheck3.default)(this, ListItem);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (ListItem.__proto__ || (0, _getPrototypeOf2.default)(ListItem)).call(this));

        _this2.pressMoveHandler = function (event, superEvent) {
            if (!_this2.state.menuChange) {
                var x = Math.abs(superEvent.distanceX),
                    y = Math.abs(superEvent.distanceY);
                if (superEvent.distanceX < -10 && x > y) {
                    _this2.setState({
                        menuChange: true
                    });
                } else {
                    return;
                }
            } else {
                if (_this2.state.menuX + superEvent.deltaX < -_this2.refs.item_menu.offsetWidth - 20) {
                    return;
                }
                _this2.setState({
                    menuX: _this2.state.menuX + superEvent.deltaX
                });
            }
        };

        _this2.touchEndHandler = function (event, superEvent) {
            if (!_this2.state.open && _this2.state.menuX < -20) {
                _this2.cover = new Cover(null, {
                    removeCallback: function removeCallback() {
                        _this2.closeMenu();
                    }
                });
                _this2.setState({
                    menuChange: false,
                    open: true,
                    menuX: -_this2.refs.item_menu.offsetWidth
                });
            } else {
                _this2.closeMenu();
            }
        };

        _this2.state = {
            menuX: 0,
            open: false,
            menuChange: false
        };
        return _this2;
    }

    (0, _createClass3.default)(ListItem, [{
        key: 'closeMenu',
        value: function closeMenu() {
            this.setState({
                menuChange: false,
                open: false,
                menuX: 0
            });
            if (this.cover) {
                this.cover.remove();
            }
        }
    }, {
        key: 'renderMenu',
        value: function renderMenu(children) {
            var _this3 = this;

            var menu = this.props.menu;

            if (menu && menu.length > 0) {
                var menuList = menu.map(function (item, key) {
                    return _react2.default.createElement(
                        _Button2.default,
                        { className: 'candy-mob-list_item__menu_item', style: item.color ? { background: item.color } : {}, type: 'ghost', key: key, onClick: item.onClick },
                        item.text
                    );
                });
                return _react2.default.createElement(
                    'div',
                    { className: 'candy-mob-list_item__touch', style: this.state.open ? { zIndex: 1000 } : {} },
                    this.state.open ? _react2.default.createElement('div', { className: 'candy-mob-list_item__cover', onTouchStart: function onTouchStart() {
                            _this3.closeMenu();
                        } }) : null,
                    _react2.default.createElement(
                        _Touch2.default,
                        { onTouchEnd: this.touchEndHandler, onPressMove: this.pressMoveHandler },
                        _react2.default.createElement(
                            'div',
                            { className: 'candy-mob-list_item__animate', style: {
                                    transform: 'translateX(' + this.state.menuX + 'px)'
                                } },
                            children
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'candy-mob-list_item__menu', ref: 'item_menu', style: this.state.open ? { zIndex: 11 } : {} },
                            menuList
                        )
                    )
                );
            } else {
                return children;
            }
        }
    }, {
        key: 'renderClick',
        value: function renderClick(children) {
            var onClick = this.props.onClick;

            if (typeof onClick == 'function') {
                return _react2.default.createElement(
                    _Button2.default,
                    { onClick: onClick, type: 'ghost' },
                    children
                );
            } else {
                return children;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                onClick = _props.onClick,
                icon = _props.icon,
                menu = _props.menu,
                children = _props.children;

            return _react2.default.createElement(
                'li',
                { className: (0, _classnames2.default)("candy-mob-list_item", {
                        "candy-mob-list_item--icon": icon,
                        "candy-mob-list_item--link": typeof onClick == 'function',
                        "candy-mob-list_item--menu": menu && menu.length > 0
                    }, className) },
                this.renderMenu(this.renderClick(_react2.default.createElement(
                    'div',
                    { className: 'candy-mob-list_item__inner' },
                    icon ? _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-list_item__media' },
                        icon
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-list_item__content' },
                        children
                    )
                )))
            );
        }
    }]);
    return ListItem;
}(_react.Component);

exports.default = ListItem;