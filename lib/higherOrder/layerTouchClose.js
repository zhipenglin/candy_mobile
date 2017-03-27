'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _layer = require('./layer');

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _recompose.compose)(_layer2.default, function (ComposedComponent) {
    return function (props) {
        var touchStartHandler = function touchStartHandler(e) {
            e.preventDefault();
            props.remove();
        };
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('div', { className: 'candy-mob-layer__cover_touch', onTouchStart: touchStartHandler }),
            _react2.default.createElement(ComposedComponent, props)
        );
    };
});