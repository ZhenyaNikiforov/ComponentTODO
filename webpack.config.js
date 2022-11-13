const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
    static: './docs'
  },
    
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'index.js'
  },
    
  plugins: [
       new MiniCssExtractPlugin(),
       new HtmlWebpackPlugin ({filename: "index.html", template: "./src/pages/home/index.pug", inject: 'body'}),
       new HtmlWebpackPugPlugin({adjustIndent: true})
   ],
    
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {filename: 'fonts/[name][ext]'}
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
                generator: {filename: 'images/[name][ext]'}
            },
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            },
            {
              test: /\.pug$/i,
				use: [{loader: 'html-loader'}, {loader: 'pug-html-loader', options: {exports: false}}]
              
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
        minimize: true
    }
}