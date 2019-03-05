const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const autoprefixer = require("autoprefixer");

const plugins = [],
    ruleUseArr = [],
    sassLoader = [],
    commonConfig = {
        input: "../src/index.tsx", // 组件入口
        cssExtract: true // 是否单独抽取样式
    };

if (commonConfig.cssExtract && process.env.NODE_ENV === "production") {
    const miniCssExtractPlugin = new MiniCssExtractPlugin({
        filename: "index.css",
        chunkFilename: "[id].css"
    });

    ruleUseArr.push(MiniCssExtractPlugin.loader);
    plugins.push(miniCssExtractPlugin);
} else {
    ruleUseArr.push({
        loader: "style-loader" // 将 JS 字符串生成为 style 节点
    });
}
sassLoader.push({
    loader: "sass-loader", // 将 Sass 编译成 CSS
    options: {
        outputStyle: "expanded",
        sourceMap: true
    }
});

plugins.push(new webpack.WatchIgnorePlugin([/css\.d\.ts$/]));
plugins.push(autoprefixer);

module.exports = {
    entry: path.resolve(__dirname, commonConfig.input),
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "index.js",
        library: "index",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: [/node_modules/, /lib/, /bin/],
                use: [
                    ...ruleUseArr,
                    {
                        loader: "typings-for-css-modules-loader",
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase: true,
                            minimize: process.env.NODE_ENV !== "development",
                            localIdentName: "[name]__[local]--[hash:base64:5]"
                        }
                    },
                    "postcss-loader",
                    ...sassLoader
                ]
            },
            {
                test: /\.css$/,
                include: [/lib/, /bin/],
                use: [
                    ...ruleUseArr,
                    {
                        loader: "css-loader",
                        options: {
                            localIdentName: "[local]__[hash:base64:5]"
                        }
                    },
                    "postcss-loader",
                    ...sassLoader
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/, // 对图片文件，使用 url-loader里的加载器处理
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            publicPath: "/",
                            limit: 8192, // 限制图片文件字节，大于8KB则不生成base64 用路径引用替代（相当于file－loader）
                            name: "[name]-[hash:5].[ext]" // 文件名
                        }
                    },
                    {
                        // 压缩图片要在file-loader之后使用
                        loader: "image-webpack-loader",
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".css", "scss", "sass", ".tsx", ".ts"],
        alias: {
            // 模快别名列表
            utils: path.resolve(__dirname, "../src/utils")
        }
    },
    plugins
};
