"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ target, }) => (Object.assign({}, (target !== "server" && {
    he: "{}",
    "node-fetch": "window.fetch",
    url: "{ URL: window.URL }",
})));
