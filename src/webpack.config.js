var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, '../octocnc/static/dist/'),
    filename: 'bundle.js',
    publicPath: '/plugin/octocnc/static/dist/',
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
          plugins: [
              'transform-object-rest-spread',
              'transform-class-properties',
              ["import", { libraryName: "antd", style: "css" }]
          ],
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
          loader: 'file-loader?limit=1024&name=[name]-[hash:8].[ext]',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
        path.resolve('./app'),
        path.resolve('./node_modules')
    ]
  }
};
