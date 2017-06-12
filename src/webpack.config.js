var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, '../octocnc/static/js/'),
    filename: 'bundle.js',
    publicPath: '/plugins/octocnc/static/js/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties'],
          babelrc: false
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
          test: /\.less/,
          loader: 'style!css!less',
      },
      {
          test: /\.(png|jpg|gif|woff|svg|eot|ttf|woff2)$/,
          loader: 'file-loader?limit=1024&name=[name]-[hash:8].[ext]!image-webpack-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
}
