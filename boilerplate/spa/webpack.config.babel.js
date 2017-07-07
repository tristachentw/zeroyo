import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: './src/scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'assets/app.js',
  },
  module: {
    rules: [{
      test: /\.(jpe?g|png|gif|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]'
        }
      }]
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: { sourceMap: true, importLoaders: 1, url: false }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true }
        }, {
          loader: 'babel-loader'
        }, {
          loader: 'stylus-loader',
          options: { sourceMap: true }
        }]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('assets/app.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    port: 9000
  },
  devtool: 'sourcemap'
};
