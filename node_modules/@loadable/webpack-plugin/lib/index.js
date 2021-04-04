"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const nodePath = require('path');

const fs = require('fs');

const makeDir = require('make-dir');

const name = '@loadable/webpack-plugin';

class LoadablePlugin {
  constructor({
    filename = 'loadable-stats.json',
    path,
    writeToDisk,
    outputAsset = true
  } = {}) {
    _defineProperty(this, "handleEmit", compilation => {
      const stats = compilation.getStats().toJson({
        hash: true,
        publicPath: true,
        assets: true,
        chunks: true,
        modules: false,
        source: false,
        errorDetails: false,
        timings: false
      });
      stats.generator = 'loadable-components'; // we don't need all chunk information, only a type

      stats.chunks = stats.chunks.map(chunk => _extends({}, chunk, {
        modules: [],
        // in case modules array is big
        origins: [] // in case origins array is big

      }));
      const result = JSON.stringify(stats, null, 2);

      if (this.opts.writeToDisk) {
        this.writeAssetsFile(result);
      }

      if (this.opts.outputAsset) {
        return {
          source() {
            return result;
          },

          size() {
            return result.length;
          }

        };
      }

      return null;
    });

    _defineProperty(this, "writeAssetsFile", manifest => {
      const outputFolder = this.opts.writeToDisk.filename || this.compiler.options.output.path;
      const outputFile = nodePath.resolve(outputFolder, this.opts.filename);

      try {
        if (!fs.existsSync(outputFolder)) {
          makeDir.sync(outputFolder);
        }
      } catch (err) {
        if (err.code !== 'EEXIST') {
          throw err;
        }
      }

      fs.writeFileSync(outputFile, manifest);
    });

    this.opts = {
      filename,
      writeToDisk,
      outputAsset,
      path
    }; // The Webpack compiler instance

    this.compiler = null;
  }

  apply(compiler) {
    this.compiler = compiler;
    const version = 'jsonpFunction' in compiler.options.output ? 4 : 5; // Add a custom chunk loading callback __LOADABLE_LOADED_CHUNKS__

    if (version === 4) {
      compiler.options.output.jsonpFunction = '__LOADABLE_LOADED_CHUNKS__';
    } else {
      compiler.options.output.chunkLoadingGlobal = '__LOADABLE_LOADED_CHUNKS__';
    }

    if (this.opts.outputAsset || this.opts.writeToDisk) {
      if (version === 4) {
        // webpack 4
        compiler.hooks.emit.tap(name, compilation => {
          const asset = this.handleEmit(compilation);

          if (asset) {
            compilation.assets[this.opts.filename] = asset;
          }
        });
      } else {
        // webpack 5
        compiler.hooks.make.tap(name, compilation => {
          compilation.hooks.processAssets.tap({
            name,
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
          }, () => {
            const asset = this.handleEmit(compilation);

            if (asset) {
              compilation.emitAsset(this.opts.filename, asset);
            }
          });
        });
      }
    }
  }

}

module.exports = LoadablePlugin;
module.exports.default = LoadablePlugin;