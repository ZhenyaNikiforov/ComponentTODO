const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const fs = require('fs');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

function generateHtmlPlugin (pathToFiles) {
    const arrayHtmlFiles = fs.readdirSync(path.resolve(__dirname, pathToFiles));
    const arrayHtmlPlugins = arrayHtmlFiles.map(function (item) {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        const newPlug = new HtmlWebpackPlugin ({
            filename: `${name}.html`,
            template: `./src/pages/${name}.pug`
        });
        return newPlug;
    });
    return arrayHtmlPlugins;
}

const htmlPlugins = generateHtmlPlugin('./src/pages');
const pugPlugin = [new HtmlWebpackPugPlugin({adjustIndent: true})];

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
       new MiniCssExtractPlugin()
   ].concat(htmlPlugins, pugPlugin),
    
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {filename: 'shr/[name][ext]'}
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
                generator: {filename: 'imag/[name][ext]'}
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
        minimizer: [new CssMinimizerPlugin()]
    }
}