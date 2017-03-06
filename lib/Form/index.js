'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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
                var field, isRequired, length, type, rule, _length$split, _length$split2, start, end, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _rule, result;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                field = _this.fields[key];

                                if (!field.rule) {
                                    _context.next = 62;
                                    break;
                                }

                                isRequired = void 0, length = void 0, type = [], rule = field.rule.split(' ').filter(function (n) {
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

                                if (!(value === '')) {
                                    _context.next = 11;
                                    break;
                                }

                                if (!isRequired) {
                                    _context.next = 10;
                                    break;
                                }

                                _this.fields[key].msg = field.label + '\u4E0D\u80FD\u4E3A\u7A7A';
                                return _context.abrupt('return', field.pass = false);

                            case 10:
                                return _context.abrupt('return', field.pass = true);

                            case 11:
                                if (!length) {
                                    _context.next = 28;
                                    break;
                                }

                                _length$split = length.split('-'), _length$split2 = (0, _slicedToArray3.default)(_length$split, 2), start = _length$split2[0], end = _length$split2[1];

                                start = parseInt(start);

                                if (!end) {
                                    _context.next = 25;
                                    break;
                                }

                                end = parseInt(end);

                                if (!(start > end)) {
                                    _context.next = 20;
                                    break;
                                }

                                throw new Error('rule设置错误,start不应该大于end');

                            case 20:
                                if (!(value.length < start || value.length > end)) {
                                    _context.next = 23;
                                    break;
                                }

                                if (start == end) {
                                    field.msg = field.label + '\u5FC5\u987B\u4E3A' + start + '\u4E2A\u5B57\u7B26';
                                } else {
                                    field.msg = field.label + '\u5FC5\u987B\u4E3A' + start + '-' + end + '\u4E2A\u5B57\u7B26';
                                }
                                return _context.abrupt('return', field.pass = false);

                            case 23:
                                _context.next = 28;
                                break;

                            case 25:
                                if (!(value.length < start)) {
                                    _context.next = 28;
                                    break;
                                }

                                pass[name] = field.label + '\u5FC5\u987B\u5927\u4E8E' + start + '\u4E2A\u5B57\u7B26';
                                return _context.abrupt('return', field.pass = false);

                            case 28:
                                if (!(type.length > 0)) {
                                    _context.next = 62;
                                    break;
                                }

                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context.prev = 32;
                                _iterator = (0, _getIterator3.default)(type);

                            case 34:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context.next = 48;
                                    break;
                                }

                                _rule = _step.value;

                                _rule = Form.rules[_rule];

                                if (!(_rule.func && !_rule.func(value))) {
                                    _context.next = 42;
                                    break;
                                }

                                field.msg = _rule.des.replace('%s', field.label);
                                return _context.abrupt('return', field.pass = false);

                            case 42:
                                if (!(_rule.regExp && !_rule.regExp.test(value))) {
                                    _context.next = 45;
                                    break;
                                }

                                field.msg = _rule.des.replace('%s', field.label);
                                return _context.abrupt('return', field.pass = false);

                            case 45:
                                _iteratorNormalCompletion = true;
                                _context.next = 34;
                                break;

                            case 48:
                                _context.next = 54;
                                break;

                            case 50:
                                _context.prev = 50;
                                _context.t0 = _context['catch'](32);
                                _didIteratorError = true;
                                _iteratorError = _context.t0;

                            case 54:
                                _context.prev = 54;
                                _context.prev = 55;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 57:
                                _context.prev = 57;

                                if (!_didIteratorError) {
                                    _context.next = 60;
                                    break;
                                }

                                throw _iteratorError;

                            case 60:
                                return _context.finish(57);

                            case 61:
                                return _context.finish(54);

                            case 62:
                                if (!(typeof field.extra == 'function')) {
                                    _context.next = 69;
                                    break;
                                }

                                _context.next = 65;
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

                            case 65:
                                result = _context.sent;

                                if (!(result !== true)) {
                                    _context.next = 69;
                                    break;
                                }

                                field.msg = result;
                                return _context.abrupt('return', field.pass = false);

                            case 69:
                                return _context.abrupt('return', field.pass = true);

                            case 70:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2, [[32, 50, 54, 62], [55,, 57, 61]]);
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
}, _class.defaultProps = {
    onChange: function onChange() {}
}, _temp);
exports.default = Form;