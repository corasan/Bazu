var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:4000',
        'webpack/hot/only-dev-server',
        './app/index.js',
        './dist/new-style.css'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel-loader'],
            include: path.join(__dirname, 'app')
        },
        { test: /\.json$/, loader: 'json' },
        { test: /\.css$/, loader: "style-loader!css-loader" }
        // {
        //     test: /\.(jpe?g|png|gif|svg)$/i,
        //     loaders: [
        //         'file?hash=sha512&digest=hex&name=[hash].[ext]',
        //         'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        //     ]
        // },
        // {
        //     test: /.*\.(gif|png|jpe?g|svg)$/i,
        //     loaders: [
        //       'file?hash=sha512&digest=hex&name=[hash].[ext]',
        //       'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        //     ]
        // }
    ],
    query: {
      presets: ['react', 'es2015', 'stage-0']
    }
    }
};
