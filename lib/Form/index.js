'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Toast = require('../Dialog/Toast');

var _Toast2 = _interopRequireDefault(_Toast);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

require('../../style/Form/form.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = (_temp = _class = function (_PureComponent) {
    (0, _inherits3.default)(Form, _PureComponent);

    function Form() {
        (0, _classCallCheck3.default)(this, Form);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call(this));

        _this.data = {};
        _this.fields = {};
        _this.extraValidateCache = {};
        _this.validateField = _this.validateField.bind(_this);
        _this.submit = _this.submit.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Form, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var children = this.props.children;

            this.children = this.mapChildren(children);
        }
    }, {
        key: 'dispatch',
        value: function dispatch(name, data) {
            var _this2 = this;

            return this.validateField(name, data).then(function (res) {
                if (res) {
                    _this2.data[name] = data;
                    return true;
                } else {
                    return _this2.fields[name].msg;
                }
            });
        }
    }, {
        key: 'validateField',
        value: function validateField(name, value) {
            var _this3 = this;

            var field = this.fields[name];
            if (field.rule) {
                var isRequired = void 0,
                    length = void 0,
                    type = [],
                    rule = field.rule.split(' ').filter(function (n) {
                    return n;
                });
                rule.forEach(function (n) {
                    if (/^required|req$/i.test(n)) {
                        isRequired = true;
                    } else if (/^[0-9]+(-[0-9]+)?$/.test(n)) {
                        length === undefined ? length = n : '';
                    } else if (Form.rules[n]) {
                        type.push(n);
                    }
                });
                //执行必须性校验
                if (value === '' || value === undefined || Array.isArray(value) && value.length == 0) {
                    if (isRequired) {
                        field.msg = field.label + '\u4E0D\u80FD\u4E3A\u7A7A';
                        return _promise2.default.resolve(field.pass = false);
                    } else {
                        return _promise2.default.resolve(field.pass = true);
                    }
                }

                //执行长度校验
                if (length && !Array.isArray(value)) {
                    var _length$split = length.split('-'),
                        _length$split2 = (0, _slicedToArray3.default)(_length$split, 2),
                        start = _length$split2[0],
                        end = _length$split2[1];

                    start = parseInt(start);
                    if (end) {
                        end = parseInt(end);
                        if (start > end) {
                            throw new Error('rule设置错误,start不应该大于end');
                        } else {
                            if (value.length < start || value.length > end) {
                                if (start == end) {
                                    field.msg = field.label + '\u5FC5\u987B\u4E3A' + start + '\u4E2A\u5B57\u7B26';
                                } else {
                                    field.msg = field.label + '\u5FC5\u987B\u4E3A' + start + '-' + end + '\u4E2A\u5B57\u7B26';
                                }
                                return _promise2.default.resolve(field.pass = false);
                            }
                        }
                    } else {
                        if (value.length < start) {
                            pass[name] = field.label + '\u5FC5\u987B\u5927\u4E8E' + start + '\u4E2A\u5B57\u7B26';
                            return _promise2.default.resolve(field.pass = false);
                        }
                    }
                }

                //执行类型校验
                if (type.length > 0 && !Array.isArray(value)) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = (0, _getIterator3.default)(type), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _rule = _step.value;

                            _rule = Form.rules[_rule];
                            if (_rule.func && typeof _rule.func == 'function' && !_rule.func(value)) {
                                field.msg = _rule.des.replace('%s', field.label);
                                return _promise2.default.resolve(field.pass = false);
                            } else if (_rule.regExp && _rule.regExp instanceof RegExp && !_rule.regExp.test(value)) {
                                field.msg = _rule.des.replace('%s', field.label);
                                return _promise2.default.resolve(field.pass = false);
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
            //执行用户自定义校验
            if (typeof field.extra == 'function') {
                return new _promise2.default(function (resolve) {
                    if (!Array.isArray(value) && _this3.extraValidateCache[field.name + '-' + value] !== undefined) {
                        resolve(_this3.extraValidateCache[field.name + '-' + value]);
                        return;
                    }
                    field.extra({ field: field, value: value, callback: function callback(result) {
                            !Array.isArray(value) ? _this3.extraValidateCache[field.name + '-' + value] = result : '';
                            resolve(result);
                        } });
                }).then(function (result) {
                    if (result !== true) {
                        field.msg = result;
                        return field.pass = false;
                    } else {
                        return field.pass = true;
                    }
                });
            } else {
                return _promise2.default.resolve(field.pass = true);
            }
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _this4 = this;

            var submit = this.props.submit;

            var errors = [];
            return _promise2.default.all((0, _map2.default)(this.fields, function (field) {
                if (field.pass === undefined) {
                    return _this4.validateField(field.name, _this4.data[field.name] || '').then(function (res) {
                        if (res === false) {
                            errors.push(field.msg);
                        }
                        return res;
                    });
                } else if (field.pass === false) {
                    errors.push(field.msg);
                    return _promise2.default.resolve(false);
                } else {
                    return _promise2.default.resolve(true);
                }
            })).then(function (res) {
                if (errors.length == 0) {
                    if (submit) {
                        var _res = submit(_this4.data);
                        if (_res && typeof _res.then == 'function') {
                            return _res;
                        }
                    }
                } else {
                    new _Toast2.default(errors[0]);
                }
            });
        }
    }, {
        key: 'mapChildren',
        value: function mapChildren(component) {
            var _this5 = this;

            return _react.Children.map(component, function (child) {
                if (child.type.formType == 'field' && child.props.name) {
                    _this5.fields[child.props.name] = {
                        name: child.props.name,
                        rule: child.props.rule,
                        label: child.props.label || '该字段',
                        extra: child.props.extra
                    };
                    return (0, _react.cloneElement)(child, { dispatch: _this5.dispatch.bind(_this5, child.props.name), data: (0, _assign2.default)({}, _this5.data) });
                } else if (child.type.formType == 'SubmitButton') {
                    return (0, _react.cloneElement)(child, { submit: _this5.submit });
                } else if (child.props.children) {
                    return (0, _react.cloneElement)(child, {
                        children: _this5.mapChildren(child.props.children)
                    });
                }
                return child;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                inline = _props.inline,
                className = _props.className;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(className, "candy-mob-form", {
                        "candy-mob-form--inline": inline
                    }) },
                this.children
            );
        }
    }]);
    return Form;
}(_react.PureComponent), _class.rules = {
    username: {
        func: function func(value) {
            return (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value) || /^1[0-9]{10}$/.test(value)
            );
        },

        des: '%s格式不正确'
    },
    tel: {
        regExp: /^1[0-9]{10}$/,
        des: '%s必须是手机号'
    },
    email: {
        regExp: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        des: '%s必须是邮箱'
    },
    pwd: {
        regExp: /(?!\d+$)\w+/i,
        des: '%s可以包含数字或字母，但不可全为数字'
    }
}, _temp);
exports.default = Form;