'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

exports.default = fieldDecorator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('../../style/higherOrdder/field.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fieldDecorator(MiddleComponent) {
    return function (_PureComponent) {
        (0, _inherits3.default)(FieldDecorator, _PureComponent);

        function FieldDecorator() {
            (0, _classCallCheck3.default)(this, FieldDecorator);
            return (0, _possibleConstructorReturn3.default)(this, (FieldDecorator.__proto__ || (0, _getPrototypeOf2.default)(FieldDecorator)).apply(this, arguments));
        }

        (0, _createClass3.default)(FieldDecorator, [{
            key: 'render',
            value: function render() {
                var _props = this.props,
                    label = _props.label,
                    hideLabel = _props.hideLabel,
                    active = _props.active,
                    status = _props.status,
                    errMsg = _props.errMsg,
                    others = (0, _objectWithoutProperties3.default)(_props, ['label', 'hideLabel', 'active', 'status', 'errMsg']);

                return _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)('candy-mob-field', {
                            'candy-mob-field--active': active,
                            'candy-mob-field--error': status == 2,
                            'candy-mob-field--loading': status == 1
                        }) },
                    _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-field__content' },
                        hideLabel ? null : _react2.default.createElement(
                            'div',
                            { className: 'candy-mob-field__label' },
                            label
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'candy-mob-field__inner' },
                            _react2.default.createElement(MiddleComponent, others),
                            _react2.default.createElement('i', { className: 'candy-mob-field__status' })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-field__msg' },
                        status == 2 ? errMsg : null
                    )
                );
            }
        }]);
        return FieldDecorator;
    }(_react.PureComponent);
}