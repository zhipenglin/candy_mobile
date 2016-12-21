'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

require('../../style/List/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function (_Component) {
    (0, _inherits3.default)(List, _Component);

    function List() {
        (0, _classCallCheck3.default)(this, List);
        return (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).apply(this, arguments));
    }

    (0, _createClass3.default)(List, [{
        key: 'renderListItem',
        value: function renderListItem() {
            var children = this.props.children;

            var childrenArray = _react2.default.Children.toArray(children).filter(function (item) {
                return item.type == _ListItem2.default;
            });
            return childrenArray;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                title = _props.title,
                inside = _props.inside,
                children = _props.children;

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
                    'ul',
                    { className: 'candy-mob-list__ul' },
                    this.renderListItem()
                )
            );
        }
    }]);
    return List;
}(_react.Component);

exports.default = List;


List.ListItem = _ListItem2.default;