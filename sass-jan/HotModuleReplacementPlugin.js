// sudo npm install -g webpack-dev-server
// run: webpack-dev-server //////////////////////
// or --inline --hot webpack-dev-server


// webpack.config.js ////////////////////////////////////////
"use strict";

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Webpack Dev Server
module.exports = {
    context: __dirname + '/frontend',
    
    entry: { /* --inline --hot  */
        main: ["webpack-dev-server/client", 'webpack/hot/dev-server', './main']
    },
    
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: '[name].js',
        library: '[name]'
    },
    
    module: {
      rules: [{
          test: /\.js$/,
          include: __dirname + '/frontend',
          loader: "babel?presets[]=es2015"
      }, {
          test: /\.jade$/,
          loader: "jade"
      }, {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!scss?resolve url')
      }, {
          test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
          loader: 'file?name=[path][name].[ext]?[hash]'
      }]
    },
    
    plugins: [
      new webpack.HotModuleReplacementPlugin('[name].css', {allChunks: true, disable: process.env.NODE_ENV == 'development'})  
    ],
    
    devServer: {
        host: 'localhost', // default
        port: 8080, // default
        /* contentBase: __dirname + '/backend' */
        proxy: [{
            path: /.*/,
            target: 'http:/localhost:3000'
        }],
        bypass: function(req, res, options) {
            return req.url;
            if(req.url.matches(/^[^.]+$/)) return '/index.html';
        },
        contentBase: __dirname + '/backend',
        hot: true,
        historyApiFallback: true
    }
}

// main.js //////////////////////////////
"use strict";

require.ensure([], function(require) {
   
 let Menu = require('./menu').default;
 let pandaMenu = new Menu({
     
 });
    
 
    
});

// server.js /////////////////////////////////////////
var static = require('node-static');
var file = new static.Server('.');

require('http').createServer(function(request, response) {
    request.addListener('end', function() {
        
        file.serve(request, response);
    }).resume();
}).listen(3000);
