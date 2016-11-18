"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by ifchangetoclzp on 2016/11/14.
 */
exports.default = {
    isDescendant: function isDescendant(parent, child) {
        var node = child.parentNode;

        while (node !== null) {
            if (node === parent) return true;
            node = node.parentNode;
        }
        return false;
    },
    offset: function offset(el) {
        var rect = el.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    }
};