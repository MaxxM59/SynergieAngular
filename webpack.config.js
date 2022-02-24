const BrotliPlugin = require('brotli-webpack-plugin');


module.exports = {
    plugins: [
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg|eot|woff2|woff|ttf)$/,
            minRatio: 0.8
        }),

    ]
}