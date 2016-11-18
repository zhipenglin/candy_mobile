'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = function (style, key, value) {
    (0, _assign2.default)(style, prefixer.prefix((0, _defineProperty3.default)({}, key, value)));
};

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixer = new _inlineStylePrefixer2.default({
    userAgent: window.navigator.userAgent
}); /**
     * Created by ifchangetoclzp on 2016/11/11.
     */