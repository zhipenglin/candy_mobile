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

var _class, _dec, _class2, _class3, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _List = require('../List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('../List/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _recompose = require('recompose');

var _field = require('../higherOrder/field');

var _field2 = _interopRequireDefault(_field);

var _fieldDecorator = require('../higherOrder/fieldDecorator');

var _fieldDecorator2 = _interopRequireDefault(_fieldDecorator);

var _layerTouchClose = require('../higherOrder/layerTouchClose');

var _layerTouchClose2 = _interopRequireDefault(_layerTouchClose);

require('../../style/Form/check-list.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cover = (0, _layerTouchClose2.default)(_class = function (_PureComponent) {
    (0, _inherits3.default)(Cover, _PureComponent);

    function Cover() {
        (0, _classCallCheck3.default)(this, Cover);
        return (0, _possibleConstructorReturn3.default)(this, (Cover.__proto__ || (0, _getPrototypeOf2.default)(Cover)).apply(this, arguments));
    }

    (0, _createClass3.default)(Cover, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                remove = _props.remove;

            return _react2.default.createElement('div', { className: (0, _classnames2.default)("candy-mob-check-list-layer", className), onTouchStart: remove });
        }
    }]);
    return Cover;
}(_react.PureComponent)) || _class;

var CheckList = (_dec = (0, _recompose.compose)(_field2.default, _fieldDecorator2.default), _dec(_class2 = (_temp = _class3 = function (_PureComponent2) {
    (0, _inherits3.default)(CheckList, _PureComponent2);

    function CheckList() {
        (0, _classCallCheck3.default)(this, CheckList);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (CheckList.__proto__ || (0, _getPrototypeOf2.default)(CheckList)).call(this));

        _this2.state = {
            show: false
        };

        _this2.listClickHandler = _this2.listClickHandler.bind(_this2);
        return _this2;
    }

    (0, _createClass3.default)(CheckList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this3 = this;

            this.cover = new Cover(null, { persistent: true, removeCallback: function removeCallback() {
                    _this3.hide();
                } });
        }
    }, {
        key: 'itemOnClick',
        value: function itemOnClick(itemValue, checked) {
            var _this4 = this;

            var _props2 = this.props,
                value = _props2.value,
                mult = _props2.mult,
                onValueChange = _props2.onValueChange,
                onActiveChange = _props2.onActiveChange;

            return function (e) {
                if (mult) {
                    var list = value ? value.slice(0) : [];
                    if (checked) {
                        list.indexOf(itemValue);
                        list.splice(list.indexOf(itemValue), 1);
                    } else {
                        list.push(itemValue);
                    }
                    onValueChange(list);
                } else {
                    _this4.hide();
                    onValueChange(itemValue);
                }
            };
        }
    }, {
        key: 'renderList',
        value: function renderList() {
            var _this5 = this;

            var children = this.props.children;

            if (this.state.show && Array.isArray(children)) {
                var itemList = children.map(function (item) {
                    if (typeof item == 'string') {
                        item = { value: item, text: item };
                    }
                    var checked = _this5.valueIsMatch(item.value);
                    return _react2.default.createElement(
                        _ListItem2.default,
                        { className: (0, _classnames2.default)("candy-mob-check-list__item", {
                                "candy-mob-check-list__item--checked": checked
                            }), onClick: _this5.itemOnClick(item.value, checked), key: item.value, icon: _react2.default.createElement('i', { className: 'icon ' }) },
                        item.text
                    );
                });
                return itemList;
            } else {
                return null;
            }
        }
    }, {
        key: 'valueIsMatch',
        value: function valueIsMatch(itemValue) {
            var _props3 = this.props,
                value = _props3.value,
                mult = _props3.mult;

            if (mult) {
                return value && value.indexOf(itemValue) >= 0;
            } else {
                return value === itemValue;
            }
        }
    }, {
        key: 'valueToString',
        value: function valueToString() {
            var _props4 = this.props,
                mult = _props4.mult,
                value = _props4.value,
                children = _props4.children;

            var getText = function getText(item) {
                var target = children.find(function (child) {
                    return (typeof child == 'string' ? child : child.value) == item;
                });
                if (target) {
                    return typeof target == 'string' ? target : target.text;
                }
            };
            if (mult) {
                if (value && value.length > 0) {
                    return (0, _lodash2.default)(value).map(function (item) {
                        return getText(item);
                    }).compact().join(',');
                }
            } else {
                if (value !== undefined) {
                    return getText(value);
                }
            }
        }
    }, {
        key: 'listClickHandler',
        value: function listClickHandler() {
            this.show();
        }
    }, {
        key: 'show',
        value: function show() {
            var onActiveChange = this.props.onActiveChange;

            this.setState({ show: true });
            onActiveChange(true);
            this.cover.show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            var onActiveChange = this.props.onActiveChange;

            this.setState({ show: false });
            onActiveChange(false);
            this.cover.remove();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props5 = this.props,
                className = _props5.className,
                placeholder = _props5.placeholder,
                mult = _props5.mult,
                value = _props5.value,
                children = _props5.children;

            var text = this.valueToString();
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)("candy-mob-check-list", className, {
                        "candy-mob-check-list--mult": mult,
                        "candy-mob-check-list--show": this.state.show
                    }) },
                _react2.default.createElement(
                    'div',
                    { className: 'candy-mob-check-list__field', onClick: this.listClickHandler },
                    text ? text : _react2.default.createElement(
                        'span',
                        { className: 'candy-mob-check-list__placeholder' },
                        placeholder
                    )
                ),
                _react2.default.createElement(
                    _List2.default,
                    { className: 'candy-mob-check-list__inner', animate: true },
                    this.state.show ? this.renderList() : null
                )
            );
        }
    }]);
    return CheckList;
}(_react.PureComponent), _class3.defaultProps = {
    placeholder: '请选择',
    mult: false
}, _temp)) || _class2);
exports.default = CheckList;