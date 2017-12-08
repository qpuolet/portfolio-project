module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                },
                exclude: [/node_modules/]
            },
            {
                test: /\.(ttf|eot|svg|img|png|gif|jpg)(\?[a-z0-9#=&.]+)?$/,
                loader: 'file-loader?name=[path][name].[ext]',
                exclude: [/node_modules/]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ],
                exclude: [/node_modules/]
            }
        ]
    }
};
