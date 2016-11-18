'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Toast = require('../Dialog/Toast');

var _Toast2 = _interopRequireDefault(_Toast);

var _fetch = require('../fn/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

require('../../style/Form/form.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Form, _Component);

    function Form() {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, Form);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call(this));

        _this.onDataChange = function (key, value, isInit) {
            var onChange = _this.props.onChange;

            _this.fields[key].pass = undefined;
            if (value.toString() == '[object Object]') {
                _this.data[key] = value.computed;
                if (!isInit) {
                    _this.validateField(key, value.origin);
                }
            } else {
                _this.data[key] = value;
                if (!isInit) {
                    _this.validateField(key, value);
                }
            }
            onChange(_this.data);
        };

        _this.validateField = (0, _lodash2.default)(function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(key, value) {
                var field, _ret, result;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log(key + '执行校验');
                                field = _this.fields[key];

                                if (!field.rule) {
                                    _context.next = 6;
                                    break;
                                }

                                _ret = function () {
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
                                    if (value === '') {
                                        if (isRequired) {
                                            _this.fields[key].msg = field.label + '\u4E0D\u80FD\u4E3A\u7A7A';
                                            return {
                                                v: field.pass = false
                                            };
                                        } else {
                                            return {
                                                v: field.pass = true
                                            };
                                        }
                                    }

                                    //执行长度校验
                                    if (length) {
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
                                                    return {
                                                        v: field.pass = false
                                                    };
                                                }
                                            }
                                        } else {
                                            if (value.length < start) {
                                                pass[name] = field.label + '\u5FC5\u987B\u5927\u4E8E' + start + '\u4E2A\u5B57\u7B26';
                                                return {
                                                    v: field.pass = false
                                                };
                                            }
                                        }
                                    }

                                    //执行类型校验
                                    if (type.length > 0) {
                                        var _iteratorNormalCompletion = true;
                                        var _didIteratorError = false;
                                        var _iteratorError = undefined;

                                        try {
                                            for (var _iterator = (0, _getIterator3.default)(type), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                                var _rule = _step.value;

                                                _rule = Form.rules[_rule];
                                                if (_rule.func && !_rule.func(value)) {
                                                    field.msg = _rule.des.replace('%s', field.label);
                                                    return {
                                                        v: field.pass = false
                                                    };
                                                } else if (_rule.regExp && !_rule.regExp.test(value)) {
                                                    field.msg = _rule.des.replace('%s', field.label);
                                                    return {
                                                        v: field.pass = false
                                                    };
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
                                }();

                                if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt('return', _ret.v);

                            case 6:
                                if (!(typeof field.extra == 'function')) {
                                    _context.next = 13;
                                    break;
                                }

                                _context.next = 9;
                                return new _promise2.default(function (resolve) {
                                    if (_this.extraValidateCache[field.name + '-' + value] !== undefined) {
                                        resolve(_this.extraValidateCache[field.name + '-' + value]);
                                        return;
                                    }
                                    field.extra({ field: field, value: value, callback: function callback(result) {
                                            _this.extraValidateCache[field.name + '-' + value] = result;
                                            resolve(result);
                                        } });
                                });

                            case 9:
                                result = _context.sent;

                                if (!(result !== true)) {
                                    _context.next = 13;
                                    break;
                                }

                                field.msg = result;
                                return _context.abrupt('return', field.pass = false);

                            case 13:
                                return _context.abrupt('return', field.pass = true);

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }());

        _this.submit = function (change) {
            var action = _this.props.action;

            _this.validateAll().then(function (status) {
                if (status) {
                    if (action) {
                        (0, _fetch2.default)(action, {
                            type: 'post',
                            data: _this.data
                        }).then(function (res) {
                            change();
                            if (res.status) {
                                new _Toast2.default('登录成功', { type: 'success' });
                            }
                        });
                    } else {
                        console.warn('当前表单没有设置action');
                        change();
                    }
                } else {
                    change();
                }
            });
        };

        _this.data = {};
        _this.fields = {};
        _this.extraValidateCache = {};
        return _this;
    }

    (0, _createClass3.default)(Form, [{
        key: 'validateAll',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                var key;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.t0 = _regenerator2.default.keys(this.fields);

                            case 1:
                                if ((_context2.t1 = _context2.t0()).done) {
                                    _context2.next = 12;
                                    break;
                                }

                                key = _context2.t1.value;

                                if (!this.fields.hasOwnProperty(key)) {
                                    _context2.next = 10;
                                    break;
                                }

                                if (!(this.fields[key].pass === undefined)) {
                                    _context2.next = 7;
                                    break;
                                }

                                _context2.next = 7;
                                return this.validateField(key, this.data[key]);

                            case 7:
                                if (!(this.fields[key].pass === false)) {
                                    _context2.next = 10;
                                    break;
                                }

                                new _Toast2.default(this.fields[key].msg);
                                return _context2.abrupt('return', false);

                            case 10:
                                _context2.next = 1;
                                break;

                            case 12:
                                return _context2.abrupt('return', true);

                            case 13:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function validateAll() {
                return _ref2.apply(this, arguments);
            }

            return validateAll;
        }()
    }, {
        key: 'renderChildren',
        value: function renderChildren(children) {
            var _this3 = this;

            return _react2.default.Children.toArray(children).map(function (child, index) {
                if (!child.type) {
                    return child;
                } else if (child.type.hasFormType == 'field' && child.props.name) {
                    var props = {
                        onDataChange: _this3.onDataChange
                    };
                    _this3.fields[child.props.name] = {
                        name: child.props.name,
                        rule: child.props.rule,
                        label: child.props.label || '该字段',
                        extra: child.props.extra
                    };
                    return (0, _react.cloneElement)(child, props);
                } else if (child.type.hasFormType == 'SubmitButton') {
                    return (0, _react.cloneElement)(child, {
                        submit: _this3.submit,
                        loadingText: child.loadingText || '正在提交请求...'
                    });
                } else if (child.props.children) {
                    return (0, _react.cloneElement)(child, {
                        children: _this3.renderChildren(child.props.children)
                    });
                }
                return child;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                children = _props.children;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)("candy-mob-form", className) },
                this.renderChildren(children)
            );
        }
    }]);
    return Form;
}(_react.Component), _class.rules = {
    username: {
        func: function func(value) {
            return (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value) || /^1[0-9]{10}$/.test(value)
            );
        },

        des: '%s格式不正确'
    },
    pwd: {
        regExp: /(?!\d+$)\w+/i,
        des: '%s可以包含数字或字母，但不可全为数字'
    }
}, _class.defaultTypes = {
    onChange: function onChange() {}
}, _temp);
exports.default = Form;