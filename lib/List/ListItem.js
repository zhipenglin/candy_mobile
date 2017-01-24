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

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _recompose = require('recompose');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Touch = require('../Touch');

var _Touch2 = _interopRequireDefault(_Touch);

var _layerTouchClose = require('../higherOrder/layerTouchClose');

var _layerTouchClose2 = _interopRequireDefault(_layerTouchClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cover = (0, _layerTouchClose2.default)((0, _recompose.pure)(function (_ref) {
    var className = _ref.className,
        remove = _ref.remove;

    return _react2.default.createElement('div', { className: (0, _classnames2.default)("candy-mob-list_item_layer", className), onTouchStart: remove });
}));

var ListItem = (_dec = (0, _recompose.setDisplayName)('ListItem'), _dec(_class = function (_Component) {
    (0, _inherits3.default)(ListItem, _Component);

    function ListItem() {
        (0, _classCallCheck3.default)(this, ListItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ListItem.__proto__ || (0, _getPrototypeOf2.default)(ListItem)).call(this));

        _this.pressMoveHandler = function (event, superEvent) {
            if (!_this.state.menuChange) {
                var x = Math.abs(superEvent.distanceX),
                    y = Math.abs(superEvent.distanceY);
                if (superEvent.distanceX < -10 && x > y) {
                    _this.setState({
                        menuChange: true
                    });
                } else {
                    return;
                }
            } else {
                var distance = _this.state.menuX + superEvent.deltaX;
                if (distance < -_this.refs.item_menu.offsetWidth - 20 || distance > 20) {
                    return;
                }
                _this.setState({
                    menuX: distance
                });
            }
        };

        _this.touchEndHandler = function (event, superEvent) {
            if (!_this.state.open && _this.state.menuX < -20) {
                _this.cover = new Cover(null, {
                    removeCallback: function removeCallback() {
                        _this.closeMenu();
                    }
                });
                _this.setState({
                    menuChange: false,
                    open: true,
                    menuX: -_this.refs.item_menu.offsetWidth
                });
            } else {
                _this.closeMenu();
            }
        };

        _this.state = {
            menuX: 0,
            open: false,
            menuChange: false
        };
        return _this;
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
            var _this2 = this;

            var menu = this.props.menu;

            if (menu && menu.length > 0) {
                var menuList = menu.map(function (item, key) {
                    return _react2.default.createElement(
                        _Button2.default,
                        { className: 'candy-mob-list_item__menu_item', style: item.color ? { background: item.color } : {}, type: 'ghost', key: key, onClick: item.onClick },
                        item.text
                    );
                });
                var style = {
                    transform: 'translateX(' + this.state.menuX + 'px)'
                };
                if (!this.state.menuChange) {
                    style.transition = 'transform 300ms';
                }
                return _react2.default.createElement(
                    'div',
                    { className: 'candy-mob-list_item__touch', style: this.state.open ? { zIndex: 1000 } : {} },
                    this.state.open ? _react2.default.createElement('div', { className: 'candy-mob-list_item__cover', style: style, onTouchStart: function onTouchStart() {
                            _this2.closeMenu();
                        } }) : null,
                    _react2.default.createElement(
                        _Touch2.default,
                        { onTouchEnd: this.touchEndHandler, onPressMove: this.pressMoveHandler },
                        _react2.default.createElement(
                            'div',
                            { className: 'candy-mob-list_item__animate', style: style },
                            children
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'candy-mob-list_item__menu', ref: 'item_menu' },
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
            var _props = this.props,
                onClick = _props.onClick,
                href = _props.href;

            if (typeof onClick == 'function') {
                return _react2.default.createElement(
                    _Button2.default,
                    { onClick: onClick, type: 'ghost' },
                    children
                );
            } else if (href) {
                return _react2.default.createElement(
                    _Button2.default,
                    { onClick: function onClick() {
                            location.href = href;
                        }, type: 'ghost' },
                    children
                );
            } else {
                return children;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                className = _props2.className,
                onClick = _props2.onClick,
                icon = _props2.icon,
                menu = _props2.menu,
                children = _props2.children;

            return _react2.default.createElement(
                'div',
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
}(_react.Component)) || _class);
exports.default = ListItem;