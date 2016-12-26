'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _recompose = require('recompose');

var _layerTouchClose = require('../higherOrder/layerTouchClose');

var _layerTouchClose2 = _interopRequireDefault(_layerTouchClose);

require('../../style/Dialog/drawer.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _layerTouchClose2.default)((0, _recompose.pure)(function (_ref) {
    var className = _ref.className,
        children = _ref.children,
        remove = _ref.remove,
        right = _ref.right;

    if (!_react2.default.isValidElement(children)) {
        throw new Error('该组件的第一个参数必须为react dom');
    }
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('candy-mob-drawer', {
                'candy-mob-drawer--right': right
            }, className) },
        _react2.default.createElement(
            'div',
            { className: 'candy-mob-drawer__inner' },
            (0, _react.cloneElement)(children, {
                remove: remove
            })
        )
    );
}));