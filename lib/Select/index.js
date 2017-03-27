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

exports.dataFormat = dataFormat;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _recompose = require('recompose');

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _layer = require('../higherOrder/layer');

var _layer2 = _interopRequireDefault(_layer);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _scroll = require('../Scroll/scroll');

var _scroll2 = _interopRequireDefault(_scroll);

require('../../style/Select/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listHeight;
var Group = (0, _recompose.pure)(function (_ref) {
    var list = _ref.list,
        defaultIndex = _ref.defaultIndex,
        onChange = _ref.onChange,
        className = _ref.className;

    if (!listHeight) {
        listHeight = window.rem ? window.rem * 1.0625 : 80;
    }
    var changeHandler = function changeHandler(value) {
        var index = parseInt(-value / listHeight);
        var selected = list[index];
        if (!selected) {
            index = defaultIndex;
            selected = list[defaultIndex];
        }
        onChange(selected.value, index);
    };
    if (list && list.length > 0) {
        return _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)("candy-mob-select__group", className) },
            _react2.default.createElement(
                _scroll2.default,
                { initY: -defaultIndex * listHeight, itemHeight: listHeight, onScrollEnd: changeHandler },
                _react2.default.createElement(
                    'div',
                    { className: 'candy-mob-select__group__inner', ref: 'inner' },
                    list.map(function (data) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'candy-mob-select__option', key: data.value, 'data-value': data.value },
                            data.text
                        );
                    })
                )
            )
        );
    } else {
        return null;
    }
});

function dataFormat(data) {
    if (!Array.isArray(data[0]) && !Array.isArray(data[0].list)) {
        data = [data];
    }
    data = data.filter(function (item) {
        return Array.isArray(item) || Array.isArray(item.list);
    });
    return data.map(function (group) {
        var list = [];
        if (Array.isArray(group)) {
            list = group;
        } else if (Array.isArray(group.list)) {
            list = group.list;
        }
        return {
            list: list.map(function (item) {
                if (typeof item == 'string') {
                    return {
                        text: item,
                        value: item
                    };
                } else if (item && item.text && item.value !== undefined) {
                    return {
                        text: item.text,
                        value: item.value
                    };
                }
            }).filter(function (item) {
                return item;
            }),
            defaultIndex: group.defaultIndex,
            defaultValue: group.defaultValue,
            display: group.display,
            className: group.className,
            onChange: group.onChange || function () {}
        };
    }).filter(function (group) {
        return group.list && group.list.length > 0;
    }).map(function (group, i) {
        var data = { list: group.list, defaultIndex: 0, display: group.display, className: group.className, onChange: group.onChange };
        if (typeof group.defaultIndex == 'number' && group.defaultIndex > 0 && group.defaultIndex < group.list.length) {
            data.defaultIndex = group.defaultIndex;
        } else if (group.defaultValue !== undefined) {
            var index = group.list.indexOf((0, _find2.default)(group.list, function (item) {
                return item.value === group.defaultValue;
            }));
            data.defaultIndex = index < 0 ? 0 : index;
        }
        return data;
    });
}

var Select = (0, _layer2.default)(_class = function (_Component) {
    (0, _inherits3.default)(Select, _Component);

    function Select() {
        (0, _classCallCheck3.default)(this, Select);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this));

        _this.state = { data: [] };
        _this.dataFormat = dataFormat;

        _this.changeHandler = function (key, value, index) {
            _this.value[key] = value;
            _this.state.data[key].onChange(_this, key, value);
            _this.state.data[key].defaultIndex = index;
        };

        _this.confirmClickHandler = function () {
            var _this$props = _this.props,
                remove = _this$props.remove,
                onChange = _this$props.onChange;

            typeof onChange == 'function' && onChange(_this.valueOf(), _this.state.data);
            remove();
        };

        _this.cancelClickHandler = function () {
            var _this$props2 = _this.props,
                remove = _this$props2.remove,
                onCancel = _this$props2.onCancel;

            typeof onCancel == 'function' && onCancel();
            remove();
        };

        _this.value = [];
        return _this;
    }

    (0, _createClass3.default)(Select, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var children = this.props.children;

            this.setState({ data: this.dataFormat(children) }, function () {
                _this2.value = _this2.state.data.map(function (group, key) {
                    return group.list[group.defaultIndex].value;
                });
            });
        }
    }, {
        key: 'valueOf',
        value: function valueOf() {
            if (this.value.length == 1) {
                return this.value[0];
            } else {
                return this.value;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                className = _props.className,
                remove = _props.remove,
                title = _props.title,
                children = _props.children;

            var optionList = this.state.data.map(function (group, key) {
                if (group.display === false) {
                    return null;
                }
                return _react2.default.createElement(Group, { className: group.className, list: group.list, defaultIndex: group.defaultIndex, onChange: _this3.changeHandler.bind(_this3, key), key: key });
            });
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)("candy-mob-select", className) },
                _react2.default.createElement('div', { className: 'candy-mob-select__close', onClick: this.cancelClickHandler }),
                _react2.default.createElement(
                    'div',
                    { className: 'candy-mob-select__inner' },
                    _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-select__title' },
                        _react2.default.createElement(
                            _Button2.default,
                            { type: 'ghost', size: 'mini', onClick: this.cancelClickHandler },
                            '\u53D6\u6D88'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'candy-mob-select__title__center' },
                            title ? title : '请选择'
                        ),
                        _react2.default.createElement(
                            _Button2.default,
                            { type: 'ghost', size: 'mini', onClick: this.confirmClickHandler },
                            '\u786E\u5B9A'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-select__content' },
                        optionList
                    )
                )
            );
        }
    }]);
    return Select;
}(_react.Component)) || _class;

exports.default = Select;