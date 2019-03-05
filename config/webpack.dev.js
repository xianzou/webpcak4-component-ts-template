const path = require("path");
const webpack = require("webpack");

const baseWebpackConfig = require("./webpack.base");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const babelConfig = require("../babel.config.json");

module.exports = merge(baseWebpackConfig, {
    mode: "development",
    entry: path.join(__dirname, "../exmaple/app.tsx"),
    module: {
        rules: [
            {
                test: /\.(js|tsx)?$/,
                exclude: [/node_modules/, /lib/, /bin/],
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
    devServer: {
        host: "localhost",
        port: 3001,
        contentBase: path.join(__dirname, "../dist"),
        open: true,
        hot: true,
        proxy: {}
    },
    devtool: "#cheap-module-eval-source-map",
    plugins: [
        // 启用 HMR
        new webpack.HotModuleReplacementPlugin({}),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../exmaple/index.html")
        })
    ]
});
