"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const symlink_dir_1 = __importDefault(require("symlink-dir"));
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const semverRE = /^(~|\^|<|>|=)?([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
const RE = /^(file:)?(~)?(\.{0,2}?\/([\w+\-_]+)?)+$/;
const isNotSemanticVersion = (dir) => !semverRE.test(dir);
const isValidLinkPath = (dir) => RE.test(dir);
const isValidNodePackage = async (dir) => await fs_extra_1.pathExists(path_1.resolve(dir, "package.json"));
exports.default = async () => {
    // Get dependencies from CWD package.json
    const packageJsonPath = path_1.resolve(process.env.CWD, "./package.json");
    const packageJson = JSON.parse(await fs_extra_1.readFile(packageJsonPath, { encoding: "utf8" }));
    const { dependencies } = packageJson;
    const dependencyNames = Object.keys(dependencies).filter((dependency) => isNotSemanticVersion(dependencies[dependency]) &&
        isValidLinkPath(dependencies[dependency]));
    await Promise.all(
    // Iterate over the dependencies.
    dependencyNames.map(async (name) => {
        const packageDir = dependencies[name].replace(/^(file:)/, "");
        const dir = path_1.resolve(process.env.CWD, packageDir);
        // Check if the folder exists.
        const exists = await fs_extra_1.pathExists(dir);
        // Check if package.json exists
        const isNodePackage = await isValidNodePackage(dir);
        if (!exists) {
            throw new Error(`${dir} for ${name} does not exist.`);
        }
        if (!isNodePackage) {
            throw new Error(`${name} is not a valid node package.`);
        }
        try {
            await symlink_dir_1.default(dir, path_1.resolve("node_modules", name));
        }
        catch (e) {
            throw new Error(e);
        }
    }));
};
