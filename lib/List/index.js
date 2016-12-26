'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _recompose = require('recompose');

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _rcQueueAnim = require('rc-queue-anim');

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

require('../../style/List/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animConfig = [{ opacity: [1, 0], scale: [1, 0.5], translateX: [0, 100] }, { opacity: [1, 0], scale: [0.5, 1], translateX: [0, -100] }];
var filterListItem = function filterListItem(children) {
    return _react2.default.Children.toArray(children).filter(function (item) {
        return (0, _recompose.getDisplayName)(item.type) == 'ListItem';
    });
};
var AnimateList = (0, _recompose.pure)(function (_ref) {
    var animate = _ref.animate,
        delay = _ref.delay,
        duration = _ref.duration,
        children = _ref.children;

    if (animate) {
        var config = (typeof animate === 'undefined' ? 'undefined' : (0, _typeof3.default)(animate)) == 'object' ? animate : animConfig;
        return _react2.default.createElement(
            _rcQueueAnim2.default,
            { className: 'candy-mob-list__animate', leaveReverse: true, delay: delay, duration: duration, animConfig: config },
            children
        );
    } else {
        return _react2.default.createElement(
            'div',
            null,
            children
        );
    }
});
var List = (0, _recompose.pure)(function (_ref2) {
    var className = _ref2.className,
        title = _ref2.title,
        inside = _ref2.inside,
        animate = _ref2.animate,
        children = _ref2.children;

    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("candy-mob-list", {
                "candy-mob-list--inside": inside
            }, className) },
        title ? _react2.default.createElement(
            'div',
            { className: 'candy-mob-list__title' },
            title
        ) : null,
        _react2.default.createElement(
            'div',
            { className: 'candy-mob-list__list' },
            _react2.default.createElement(
                AnimateList,
                { animate: animate },
                children
            )
        )
    );
});
List.ListItem = _ListItem2.default;

exports.default = List;