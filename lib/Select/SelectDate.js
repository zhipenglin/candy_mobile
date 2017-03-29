'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectTime = exports.SelectDateTime = exports.default = exports.SelectDateCore = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by ifchangetoclzp on 2017/2/6.
 */
var SelectDateCore = exports.SelectDateCore = function (_Select) {
    (0, _inherits3.default)(SelectDateCore, _Select);

    function SelectDateCore(options) {
        (0, _classCallCheck3.default)(this, SelectDateCore);

        var _Object$assign = (0, _assign2.default)({}, {
            start: '1949-10-01 0:00',
            end: '2050-12-31 23:59',
            yearDisplay: true,
            monthDisplay: true,
            dayDisplay: true,
            timeDisplay: true,
            current: new Date(),
            title: '',
            onChange: function onChange() {}
        }, options),
            start = _Object$assign.start,
            end = _Object$assign.end,
            current = _Object$assign.current,
            _onChange = _Object$assign.onChange,
            yearDisplay = _Object$assign.yearDisplay,
            monthDisplay = _Object$assign.monthDisplay,
            dayDisplay = _Object$assign.dayDisplay,
            timeDisplay = _Object$assign.timeDisplay,
            title = _Object$assign.title,
            others = (0, _objectWithoutProperties3.default)(_Object$assign, ['start', 'end', 'current', 'onChange', 'yearDisplay', 'monthDisplay', 'dayDisplay', 'timeDisplay', 'title']);

        start = SelectDateCore.dateValue(start, '1949-01-01 0:00');
        end = SelectDateCore.dateValue(end, '2050-12-31 23:59');
        current = SelectDateCore.dateValue(current);
        if (start - end > 0) {
            throw new Error('开始时间不能大于结束时间');
        }

        var onChangeHandler = function onChangeHandler(target) {
            var data = target.state.data;
            data[1].list = SelectDateCore.getMonthList(target.value, start, end);
            data[2].list = SelectDateCore.getDayList(target.value, start, end);
            data[3].list = SelectDateCore.getHour(target.value, start, end);
            data[4].list = SelectDateCore.getMinute(target.value, start, end);
            data = target.dataFormat(data);
            target.setState({
                data: data
            });
        };
        return (0, _possibleConstructorReturn3.default)(this, (SelectDateCore.__proto__ || (0, _getPrototypeOf2.default)(SelectDateCore)).call(this, [{
            list: (0, _range2.default)(start.getFullYear(), end.getFullYear() + 1).map(function (n) {
                return {
                    value: n,
                    text: n + '\u5E74'
                };
            }),
            defaultValue: current.getFullYear(),
            display: yearDisplay,
            onChange: onChangeHandler
        }, {
            list: SelectDateCore.getMonthList([current.getFullYear()], start, end),
            defaultValue: current.getMonth() + 1,
            display: monthDisplay,
            onChange: onChangeHandler
        }, {
            list: SelectDateCore.getDayList([current.getFullYear(), current.getMonth() + 1], start, end),
            display: dayDisplay,
            defaultValue: current.getDate(),
            onChange: onChangeHandler
        }, {
            list: SelectDateCore.getHour([current.getFullYear(), current.getMonth() + 1, current.getDate()], start, end),
            display: timeDisplay,
            className: 'candy-mob-select__group--time',
            defaultValue: current.getHours(),
            onChange: onChangeHandler
        }, {
            list: SelectDateCore.getMinute([current.getFullYear(), current.getMonth() + 1, current.getDate(), current.getHours()], start, end),
            display: timeDisplay,
            defaultValue: current.getMinutes()
        }], (0, _extends3.default)({
            title: title,
            onChange: function onChange(value) {
                for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    others[_key - 1] = arguments[_key];
                }

                value[1] -= 1;
                _onChange.apply(undefined, [new (Function.prototype.bind.apply(Date, [null].concat((0, _toConsumableArray3.default)(value))))()].concat(others));
            } }, others)));
    }

    (0, _createClass3.default)(SelectDateCore, null, [{
        key: 'getMinute',
        value: function getMinute(_ref, start, end) {
            var _ref2 = (0, _slicedToArray3.default)(_ref, 4),
                year = _ref2[0],
                month = _ref2[1],
                day = _ref2[2],
                hour = _ref2[3];

            var startMinute = 0,
                endMinute = 59;
            if (year == start.getFullYear() && month == start.getMonth() + 1 && day == start.getDate() && hour == start.getHours()) {
                startMinute = Math.max(startMinute, start.getMinutes());
            }
            if (year == end.getFullYear() && month == end.getMonth() + 1 && day == end.getDate() && hour == end.getHours()) {
                endMinute = Math.min(endMinute, end.getMinutes());
            }
            return (0, _range2.default)(startMinute, endMinute + 1).map(function (n) {
                return {
                    value: n,
                    text: SelectDateCore.timeFormat(n)
                };
            });
        }
    }, {
        key: 'getHour',
        value: function getHour(_ref3, start, end) {
            var _ref4 = (0, _slicedToArray3.default)(_ref3, 3),
                year = _ref4[0],
                month = _ref4[1],
                day = _ref4[2];

            var startHour = 0,
                endHour = 23;
            if (year == start.getFullYear() && month == start.getMonth() + 1 && day == start.getDate()) {
                startHour = Math.max(startHour, start.getHours());
            }
            if (year == end.getFullYear() && month == end.getMonth() + 1 && day == end.getDate()) {
                endHour = Math.min(endHour, end.getHours());
            }
            return (0, _range2.default)(startHour, endHour + 1).map(function (n) {
                return {
                    value: n,
                    text: SelectDateCore.timeFormat(n)
                };
            });
        }
    }, {
        key: 'getDayList',
        value: function getDayList(_ref5, start, end) {
            var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
                year = _ref6[0],
                month = _ref6[1];

            var getList = function getList(day) {
                var startDay = 1;
                if (year == end.getFullYear() && month == end.getMonth() + 1) {
                    day = Math.min(day, end.getDate());
                }
                if (year == start.getFullYear() && month == start.getMonth() + 1) {
                    startDay = Math.max(1, start.getDate());
                }
                return (0, _range2.default)(startDay, day + 1).map(function (n) {
                    return {
                        value: n,
                        text: n + '\u65E5'
                    };
                });
            };
            if ([4, 6, 9, 11].indexOf(month) >= 0) {
                return getList(30);
            } else if (month == 2) {
                if (year % 4 == 0) {
                    return getList(29);
                } else {
                    return getList(28);
                }
            } else {
                return getList(31);
            }
        }
    }, {
        key: 'getMonthList',
        value: function getMonthList(_ref7, start, end) {
            var _ref8 = (0, _slicedToArray3.default)(_ref7, 1),
                currentYear = _ref8[0];

            var startMonth = 1,
                endMonth = 12;
            if (currentYear == start.getFullYear()) {
                startMonth = start.getMonth() + 1;
            }
            if (currentYear == end.getFullYear()) {
                endMonth = end.getMonth() + 1;
            }
            return (0, _range2.default)(startMonth, endMonth + 1).map(function (n) {
                return {
                    value: n,
                    text: n + '\u6708'
                };
            });
        }
    }, {
        key: 'timeFormat',
        value: function timeFormat(value) {
            var map = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
            return map[value] || value.toString();
        }
    }, {
        key: 'dateFormat',
        value: function dateFormat(date) {
            var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd';

            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }return fmt;
        }
    }, {
        key: 'dateValue',
        value: function dateValue(value, defaultTime) {
            var transform = function transform(date) {
                if (new Date(date).toString() != 'Invalid Date') {
                    return new Date(date);
                }
                var res = new Date();
                if (/^([0-2]{1}[0-3]{1}):([0-5]{1}\d{1})$/.test(date)) {
                    var m = date.match(/^([0-2]{1}[0-3]{1}):([0-5]{1}\d{1})$/);
                    res.setHours(m[1]);
                    res.setMinutes(m[2]);
                } else if (/^(\d{4})(?:\-|\/)(\d{1,2})(?:\-|\/)(\d{1,2})(?: ([0-9]{1,2}):([0-9]{1,2}))?$/.test(date)) {
                    var _m = date.match(/^(\d{4})(?:\-|\/)(\d{1,2})(?:\-|\/)(\d{1,2})(?: ([0-9]{1,2}):([0-9]{1,2}))?$/);
                    res = new Date(_m[1], _m[2] - 1, _m[3], _m[4] || 0, _m[5] || 0);
                }
                return res;
            };
            if (!(value instanceof Date && value.toString() != 'Invalid Date')) {
                if (new Date(value).toString() == 'Invalid Date') {
                    return transform(value ? value : defaultTime);
                } else {
                    return transform(value);
                }
            }
            return value;
        }
    }]);
    return SelectDateCore;
}(_index2.default);

var SelectDate = function (_SelectDateCore) {
    (0, _inherits3.default)(SelectDate, _SelectDateCore);

    function SelectDate(options) {
        (0, _classCallCheck3.default)(this, SelectDate);
        return (0, _possibleConstructorReturn3.default)(this, (SelectDate.__proto__ || (0, _getPrototypeOf2.default)(SelectDate)).call(this, (0, _assign2.default)({}, options, {
            yearDisplay: true,
            monthDisplay: true,
            timeDisplay: false,
            onChange: function onChange(value) {
                var fmt = 'yyyy-MM-dd';
                if (options.dayDisplay === false) {
                    fmt = 'yyyy-MM';
                }

                for (var _len2 = arguments.length, others = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    others[_key2 - 1] = arguments[_key2];
                }

                options.onChange && options.onChange.apply(options, [SelectDateCore.dateFormat(value, fmt)].concat(others));
            }
        })));
    }

    return SelectDate;
}(SelectDateCore);

exports.default = SelectDate;

var SelectDateTime = exports.SelectDateTime = function (_SelectDateCore2) {
    (0, _inherits3.default)(SelectDateTime, _SelectDateCore2);

    function SelectDateTime(options) {
        (0, _classCallCheck3.default)(this, SelectDateTime);
        return (0, _possibleConstructorReturn3.default)(this, (SelectDateTime.__proto__ || (0, _getPrototypeOf2.default)(SelectDateTime)).call(this, (0, _assign2.default)({}, options, {
            yearDisplay: true,
            monthDisplay: true,
            dayDisplay: true,
            timeDisplay: true,
            onChange: function onChange(value) {
                for (var _len3 = arguments.length, others = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                    others[_key3 - 1] = arguments[_key3];
                }

                options.onChange && options.onChange.apply(options, [SelectDateCore.dateFormat(value, 'yyyy-MM-dd hh:mm')].concat(others));
            }
        })));
    }

    return SelectDateTime;
}(SelectDateCore);

var SelectTime = exports.SelectTime = function (_SelectDateCore3) {
    (0, _inherits3.default)(SelectTime, _SelectDateCore3);

    function SelectTime(options) {
        (0, _classCallCheck3.default)(this, SelectTime);
        return (0, _possibleConstructorReturn3.default)(this, (SelectTime.__proto__ || (0, _getPrototypeOf2.default)(SelectTime)).call(this, (0, _assign2.default)({}, options, {
            yearDisplay: false,
            monthDisplay: false,
            dayDisplay: false,
            timeDisplay: true,
            onChange: function onChange(value) {
                for (var _len4 = arguments.length, others = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                    others[_key4 - 1] = arguments[_key4];
                }

                options.onChange && options.onChange.apply(options, [SelectDateCore.dateFormat(value, 'hh:mm')].concat(others));
            }
        })));
    }

    return SelectTime;
}(SelectDateCore);