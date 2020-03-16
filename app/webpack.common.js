var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '../octocnc/static/dist/'),
        filename: 'bundle.js',
        publicPath: '/plugin/octocnc/static/dist/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    { loader: 'style-loader'},
                    { loader: 'css-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                    ]
            },
            {
              test: /\.svgi(\?v=\d+\.\d+\.\d+)?$/,
              use: [
                {
                  loader: 'babel-loader',
                },
                {
                  loader: '@svgr/webpack',
                  options: {
                    babel: false,
                    icon: true,
                  },
                },
              ],
            },
            {
                test: /\.(png|jpg|gif|woff|eot|svg|ttf|woff2)$/,
                loader: 'file-loader?limit=1024&name=[name]-[hash:8].[ext]',
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    }
}