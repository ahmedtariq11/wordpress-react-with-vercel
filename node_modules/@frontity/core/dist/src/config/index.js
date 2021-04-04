"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const babel_1 = __importDefault(require("./babel"));
const webpack_1 = __importDefault(require("./webpack"));
const frontity_1 = __importDefault(require("./frontity"));
/**
 * Generate the configuration objects for Webpack, Babel and Frontity.
 *
 * @param options - Defined in {@link ConfigOptions}.
 *
 * @returns The configuration object for Webpack, Babel and Frontity. Each
 * configuration object contains the three targets: "module", "es5" and "server".
 */
const config = ({ mode, entryPoints, publicPath }) => {
    const frontity = frontity_1.default();
    const babel = babel_1.default();
    const webpack = webpack_1.default({
        mode,
        babel,
        frontity,
        entryPoints,
        publicPath,
    });
    return {
        babel,
        webpack,
        frontity,
    };
};
exports.default = config;
