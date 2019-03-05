const merge = require("webpack-merge");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const baseWebpackConfig = require("./webpack.base");

const babelConfig = require("../babel.config.json");

const plugins = [];

const cleanWebpackPlugin = new CleanWebpackPlugin(["../bin"], {
    allowExternal: true
});

plugins.push(cleanWebpackPlugin);

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.join(__dirname, "../bin")
    },
    mode: "production",
    plugins,
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                // test: /\.(js|jsx)$/,
                test: /\.(js|tsx)?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: "babel-loader",
                        options: babelConfig
                    },
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.tsx$/,
                // node_modules 目录的下的代码不用检查
                exclude: [/node_modules/, /test/, /dist/, /config/],
                loader: "tslint-loader",
                // 把 tslint-loader 的执行顺序放到最前面，防止其它 Loader 把处理后的代码交给 tslint-loader 去检查
                enforce: "pre"
            }
        ]
    },
    optimization: {
        // minimize: false
        splitChunks: {
            chunks: "all"
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
});
