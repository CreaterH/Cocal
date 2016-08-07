/**
 * Created by creator on 16/6/23.
 */
var webpack = require('webpack');
var path = require('path');

var context = path.join(__dirname, '/public/');

var config = {
    // 插件项
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'underscore'
        })
    ],

    context: context,

    // 页面的入口文件
    entry: {
        // 'test': "./js/home/index.js",
        // 'index': './js/home/index.jsx',
        'admin': './js/admin/index.js'
    },
    // entry: './js/home/index.js',
    // 入口文件的输出配置
    output: {
        path: path.join(__dirname, 'build/'),
        publicPath: '/js/',
        filename: 'js/[name].js'
    },
    // 省略的后缀名称
    resolve:{
        root: [context],
        alias: {
            '$':  context + 'lib/jquery/dist/jquery',
            'jquery': context + 'lib/jquery/dist/jquery',
            'bootstrap': context + 'lib/bootstrap/dist/js/bootstrap',
            'jquery-cookie': context + 'lib/jquery.cookie/jquery.cookie',
            'jquery-form': context + 'lib/jquery-form/jquery.form',
            'jquery-validation': context + 'lib/jquery-validation/jquery.validate',
            'react': context + 'lib/react/react',
            'react-dom': context + 'lib/react/react-dom',
            'select2': context + 'lib/select2/dist/js/select2',
            'underscore': context + 'lib/underscore/underscore',
            'md5': context + 'lib/js-md5/build/md5.min',
            'datatable': context + 'js/lib/DataTables/DataTables-1.10.12/js/jquery.dataTables',
            'bootbox': context + 'js/lib/bootbox.js/bootbox',
            'piny-dialog': context + 'js/widget/dialog',
            'tpl': context + 'js/tpl',
            'widget': context + 'js/widget'
        },
        extensions: ['', '.js', '.html', '.jsx', '.json', '.ejs']
    },

    resolveLoader: {
        root: path.join(__dirname, "node_modules")
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            // { test: require.resolve('jquery'), loader: 'expose?jquery'},
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg|jpeg)$/, loader: 'url-loader?limit=8192'},
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
            { test: /\.{html|tpl|ejs}$/, loader: 'html-loader' }
        ]
    }
};

module.exports = config;
