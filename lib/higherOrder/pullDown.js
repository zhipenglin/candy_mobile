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

exports.default = function () {
    return function (_PureComponent) {
        (0, _inherits3.default)(_class2, _PureComponent);

        function _class2() {
            var _ref;

            var _temp, _this, _ret;

            (0, _classCallCheck3.default)(this, _class2);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call.apply(_ref, [this].concat(args))), _this), _this._scrollEventHandler = function () {
                console.log('scroll');
            }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
        }

        (0, _createClass3.default)(_class2, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.scrollElement = document.getElementById('#scroll-element') || document.body;
                this.scrollElement.addEventListener('onscroll', this._scrollEventHandler);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.scrollElement.removeEventListener('onscroll', this._scrollEventHandler);
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    loadHandler = _props.loadHandler,
                    reset = (0, _objectWithoutProperties3.default)(_props, ['loadHandler']);

                _react2.default.createElement(ComposedComponent, reset);
            }
        }]);
        return _class2;
    }(_react.PureComponent);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }