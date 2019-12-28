var path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
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
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
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
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    }
}