const WebpackDeepScopeAnalysisPlugin = require("webpack-deep-scope-plugin")
  .default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const argv = require("yargs-parser")(process.argv.slice(2));
const merge = require("webpack-merge");
const _mode = argv.mode || "development";
const _modeflag = _mode == "production" ? true : false;
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const ManifestPlugin = require("webpack-manifest-plugin");
const setTitle = require("node-bash-title");
const { join } = require("path");
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob");
const loading = {
  html: "加载中..."
};
webpackConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          // 'style-loader',
          {
            // loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    before(app) {
      app.get("/api/test", (req, res) => {
        res.json({
          code: 200,
          message: "Hello World"
        });
      });
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          name: "common",
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0
        }
      }
    },
    runtimeChunk: {
      name: "runtime"
    }
  },
  plugins: [
    new ManifestPlugin(),
    new ProgressBarPlugin(),
    new WebpackBuildNotifierPlugin({
      title: "Webpack",
      suppressSuccess: true
    }),
    new MiniCssExtractPlugin({
      filename: _modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css",
      chunkFilename: _modeflag
        ? "styles/[id].[hash:5].css"
        : "styles/[name].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      loading
    }),
    new CleanWebpackPlugin(["dist"])
  ]
};
module.exports = smp.wrap(merge(_mergeConfig, webpackConfig));
