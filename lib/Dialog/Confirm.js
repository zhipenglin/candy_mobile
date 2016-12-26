'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _recompose = require('recompose');

var _layer = require('../higherOrder/layer');

var _layer2 = _interopRequireDefault(_layer);

require('../../style/Dialog/confirm.scss');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by ifchangetoclzp on 2016/12/15.
 */
exports.default = (0, _layer2.default)((0, _recompose.pure)(function (_ref) {
    var className = _ref.className,
        title = _ref.title,
        cancelCallback = _ref.cancelCallback,
        confirmCallback = _ref.confirmCallback,
        textCancel = _ref.textCancel,
        callbackConfirm = _ref.callbackConfirm,
        textConfirm = _ref.textConfirm,
        remove = _ref.remove,
        children = _ref.children;

    var cancelClickHandler = function cancelClickHandler() {
        if (typeof cancelCallback == 'function') {
            if (cancelCallback(remove) !== false) {
                remove();
            }
        } else {
            remove();
        }
    },
        confirmClickHandler = function confirmClickHandler() {
        if (typeof confirmCallback == 'function') {
            if (confirmCallback(remove) !== false) {
                remove();
            }
        } else {
            remove();
        }
    };
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("candy-mob-confirm", className) },
        _react2.default.createElement(
            'div',
            { className: 'candy-mob-confirm__inner' },
            _react2.default.createElement(
                'div',
                { className: 'candy-mob-confirm__animate' },
                _react2.default.createElement(
                    'div',
                    { className: 'candy-mob-confirm__content' },
                    title ? _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-confirm__title' },
                        title
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-confirm__msg' },
                        children
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)("candy-mob-confirm__buttons", {
                            "candy-mob-confirm__buttons--has-cancel": cancelCallback || textCancel
                        }) },
                    cancelCallback || textCancel ? _react2.default.createElement(
                        _Button2.default,
                        { className: 'candy-mob-confirm__button', type: 'ghost', onClick: cancelClickHandler },
                        textCancel || '取消'
                    ) : null,
                    _react2.default.createElement(
                        _Button2.default,
                        { className: 'candy-mob-confirm__button', type: 'ghost', onClick: confirmClickHandler },
                        textConfirm || '确定'
                    )
                )
            )
        )
    );
}));