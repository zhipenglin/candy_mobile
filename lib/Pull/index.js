'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Scroll = require('../Scroll');

var _Scroll2 = _interopRequireDefault(_Scroll);

require('../../style/Pull/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pull = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Pull, _Component);

    function Pull() {
        (0, _classCallCheck3.default)(this, Pull);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Pull.__proto__ || (0, _getPrototypeOf2.default)(Pull)).call(this));

        _this._downLoadHandler = function () {
            var downLoad = _this.props.downLoad;

            if (_this.state.downStatus == 1) {
                var result = downLoad();
                if (result instanceof _promise2.default) {
                    _this.setState({
                        downStatus: 11
                    });
                    result.then(function (complete) {
                        _this.setState({
                            downStatus: complete === true ? 13 : 1
                        });
                    }).catch(function () {
                        _this.setState({
                            downStatus: 1
                        });
                    });
                }
            }
        };

        _this._upLoadHandler = function () {
            var upLoad = _this.props.upLoad;

            if (_this.state.upStatus == 1) {
                var result = upLoad();
                if (result instanceof _promise2.default) {
                    _this.setState({
                        upStatus: 11
                    });
                    result.then(function (complete) {
                        _this.setState({
                            upStatus: complete === true ? 13 : 1
                        });
                    }).catch(function () {
                        _this.setState({
                            upStatus: 1
                        });
                    });
                }
            }
        };

        _this._scrollHandler = function (delta) {
            if (_this.refs.upIcon && delta > 0 && (_this.state.upStatus === 1 || _this.state.upStatus === 2)) {
                if (delta > _this.refs.upIcon.clientHeight) {
                    _this.setState({
                        upStatus: 1
                    });
                } else {
                    _this.setState({
                        upStatus: 2
                    });
                }
            }
        };

        _this.state = {
            upStatus: 2, //1:正常状态 2:未达到触发条件 11:正在加载状态 12:禁用状态 13:加载完成
            downStatus: 1 //1:正常状态 11:正在加载状态 12:禁用状态 13:加载完成
        };
        return _this;
    }

    (0, _createClass3.default)(Pull, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var type = this.props.type;

            switch (type) {
                case 'up-down':
                    break;
                case 'up':
                    this.setState({
                        downStatus: 12
                    });
                    break;
                case 'down':
                    this.setState({
                        upStatus: 12
                    });
                    break;
                default:
                    this.setState({
                        upStatus: 12,
                        downStatus: 12
                    });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                upLoad = _props.upLoad,
                downLoad = _props.downLoad,
                type = _props.type,
                height = _props.height,
                children = _props.children,
                reset = (0, _objectWithoutProperties3.default)(_props, ['upLoad', 'downLoad', 'type', 'height', 'children']);

            var pullUpIcon = null,
                pullDownIcon = null;
            if (this.state.upStatus !== 12) {
                pullUpIcon = _react2.default.createElement('div', { ref: 'upIcon', className: (0, _classnames2.default)('candy-mob-pull__up-icon', {
                        "candy-mob-pull__up-icon--loading": this.state.upStatus === 11,
                        "candy-mob-pull__up-icon--complete": this.state.upStatus === 13,
                        'candy-mob-pull__up-icon--reach': this.state.upStatus === 1
                    }) });
            }
            if (this.state.downStatus !== 12) {
                pullDownIcon = _react2.default.createElement('div', { ref: 'downIcon', className: (0, _classnames2.default)("candy-mob-pull__down-icon", {
                        "candy-mob-pull__down-icon--loading": this.state.downStatus === 11,
                        "candy-mob-pull__down-icon--complete": this.state.downStatus === 13
                    }) });
            }
            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({ className: 'candy-mob-pull' }, reset),
                _react2.default.createElement(
                    _Scroll2.default,
                    { onReachBottom: this._downLoadHandler, onReachTop: this._upLoadHandler, onMove: this._scrollHandler },
                    _react2.default.createElement(
                        'div',
                        { className: 'candy-mob-pull__content' },
                        pullUpIcon,
                        _react2.default.createElement(
                            'div',
                            { className: 'candy-mob-pull__list' },
                            children
                        ),
                        pullDownIcon
                    )
                )
            );
        }
    }]);
    return Pull;
}(_react.Component), _class.defaultProps = {
    upLoad: function upLoad() {},
    downLoad: function downLoad() {},

    type: 'up-down'
}, _temp);
exports.default = Pull;