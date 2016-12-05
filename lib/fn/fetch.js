'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _Toast = require('../Dialog/Toast');

var _Toast2 = _interopRequireDefault(_Toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeout = 10000; /**
                      * Created by ifchangetoclzp on 2016/11/9.
                      */


function setTime(time) {
    timeout = time;
}

function serialize(data) {
    var temp = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            temp.push(key + '=' + window.encodeURIComponent(data[key]));
        }
    }
    return temp.join('&');
}

function deserialize(str) {
    var temp = str.split('&');
    var data = {};
    for (var index = 0; index < temp.length; index++) {
        var _temp$index$split = temp[index].split('='),
            _temp$index$split2 = (0, _slicedToArray3.default)(_temp$index$split, 2),
            key = _temp$index$split2[0],
            value = _temp$index$split2[1];

        data[key] = value ? window.decodeURIComponent(value) : '';
    }
    return data;
}

function resolveURL(url) {
    var org = url || location.href;

    var _org$split = org.split('?'),
        _org$split2 = (0, _slicedToArray3.default)(_org$split, 2),
        path = _org$split2[0],
        param = _org$split2[1];

    if (!param) {
        param = '';
    }

    var _param$split = param.split('#'),
        _param$split2 = (0, _slicedToArray3.default)(_param$split, 2),
        search = _param$split2[0],
        hash = _param$split2[1];

    if (!hash) {
        hash = '';
    }
    return {
        path: path, search: search, hash: hash
    };
}

function join() {
    var url = [];

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    args.forEach(function (n) {
        url = url.concat(n.split('/'));
    });
    var res = url.filter(function (n) {
        return n;
    }).join('/');
    if (!/^.*\..*/.test(res)) {
        res = '/' + res;
    }
    return res;
}

function fetch(url) {
    var errorCatch = true,
        url = resolveURL(url),
        options = { type: 'GET', data: {}, dataType: 'json' };
    if ((0, _typeof3.default)(arguments.length <= 1 ? undefined : arguments[1]) == 'object') {
        (0, _assign2.default)(options, arguments.length <= 1 ? undefined : arguments[1]);
        if ((arguments.length <= 2 ? undefined : arguments[2]) !== undefined) {
            errorCatch = arguments.length <= 2 ? undefined : arguments[2];
        }
    } else if (typeof (arguments.length <= 1 ? undefined : arguments[1]) == 'boolean') {
        errorCatch = arguments.length <= 1 ? undefined : arguments[1];
    }

    var xhr = new window.XMLHttpRequest();

    if (/^get$/i.test(options.type)) {
        xhr.open('GET', join('api', url.path) + '?' + serialize((0, _assign2.default)(deserialize(url.search), options.data)), true);
        xhr.send();
    } else {
        xhr.open(options.type, join('api', url.path), true);
        var content = serialize(options.data);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(content);
    }
    return new _promise2.default(function (resolve, reject) {
        var timer = setTimeout(function () {
            xhr.abort();
            reject('请求超时');
        }, timeout);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    clearTimeout(timer);
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.status);
                }
            }
        };
    }).then(function (res) {
        //转成json格式
        if (/^json$/.test(options.dataType)) {
            return JSON.parse(res);
        }
        return res;
    }).then(function (res) {
        //取出data数据
        if ((typeof res === 'undefined' ? 'undefined' : (0, _typeof3.default)(res)) == 'object') {
            if (res.err_no == 0) {
                return {
                    status: true,
                    data: res.results
                };
            } else {
                if (errorCatch) {
                    //默认处理错误
                    new _Toast2.default(res.err_msg);
                }
                return {
                    status: false,
                    code: res.err_no,
                    data: res.err_msg
                };
            }
        }
        return res;
    }).catch(function (res) {
        var msg = '请求异常，请刷新后重试';
        if (typeof res == 'string') {
            msg = res;
        }
        if (errorCatch) {
            new _Toast2.default(msg);
        }
        return {
            status: false,
            code: 0,
            data: msg
        };
    });
}

fetch.serialize = serialize;
fetch.deserialize = deserialize;
fetch.resolveURL = resolveURL;
fetch.join = join;
fetch.setTime = setTime;

exports.default = fetch;