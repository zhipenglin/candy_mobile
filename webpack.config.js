/**
 * Created by ifchangetoclzp on 2016/6/28.
 */
var path=require('path');
var webpack=require('webpack');
var ROOT_PATH=path.resolve(__dirname);
var APP_PATH=path.resolve(ROOT_PATH,'page/jsx');
var BUILD_PATH=path.resolve(ROOT_PATH,'page/js');
module.exports={
    entry:{
        example:path.resolve(APP_PATH,'example.jsx'),
    },
    output:{
        path:BUILD_PATH,
        filename:'[name].js'
    },
    devtool:'eval-source-map',
    module:{
        loaders:[
            {
                test:/\.jsx?$/,
                loader:'babel',
                include:APP_PATH
            },{
                test:/\.scss$/,
                loaders:['style','css','px2rem','autoprefixer','sass']
            },{
                test:/\.(png|jpg|svg|gif)$/,
                loader:'url',
                query:{
                    limit:50000,
                    name:'images/[name].[ext]'
                }
            }
        ]
    },
    resolve:{
        extensions:['','.js','.jsx']
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ])
}