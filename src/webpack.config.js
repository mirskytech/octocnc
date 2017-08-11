var path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './app/index.jsx',
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
          presets: ['es2015', 'react', 'flow'],
          plugins: [
              'transform-object-rest-spread',
              'transform-class-properties',
              ["import", { libraryName: "antd", style: true }]
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
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                            }),
                        ],
                    },
                },
                {
                    loader: 'less-loader',
                    options: {
                        modifyVars: {
                            "@primary-color": "#BA8B00",
                            "@error-color": "#E83F6F",
                            "@icon-url": "'/plugin/octocnc/static/fonts/iconfont'"
                        },
                    },
                },
            ],
        },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
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
