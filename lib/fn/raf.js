"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by ifchangetoclzp on 2016/11/24.
 */
exports.default = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
var cancelRaf = exports.cancelRaf = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;