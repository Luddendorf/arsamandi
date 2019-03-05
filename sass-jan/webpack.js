expose-loader, imports-loader, exports-loader,
    
script-loader - very rarely!


module: {
    rules: [{
        test: /old.js$/,
        loader: "expose?Work!imports?workSettings=>{delay:500}!exports?Work"
    }, {
        test: /old.js$/,
        loader: 'script'
    }]
}


// public/home.js //////////////////////////////

module.exports = function(src) {
    if(typeof execScript === "function")
        execScript(src);
    else
        eval.call(null, src);
}

// config example: // Browser Cashing:
"use strict";

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const rimraf = require("rimraf");

module.exports = {
    context: __dirname + '/frontend',
    entry: {
        home: './home',
        about: './about',
        common: './common'
    },
    output: {
        path: __dirname + '/public/assets',
        publicPath: '/assets/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        library: '[name]'
    },
    
    resolve: {
        extensions: ['', '.js', '.scss']
    },
    
    module: {
       rules: [{
           test: /\.js$/,
           loader: "babel?presets[]=es2015"
       }, {
           test: /\.jade$/,
           loader: "jade"
       }, {
           test: /\.scss$/,
           loader: ExtractTextPlugin.extract('css!scss?resolve url')
       }, {
           test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
           loader: 'file?name=[path][name].[ext]'
       }]
    },
    
    plugins: [
        {
         apply: (compiler) => {
             rimraf.sync(compiler.options.output.path);
         }
        },
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new webpack.optimize.CommonChunksPlugin({
            name: 'common'
        })
    ]
};
                     
// about.js ///////////////////////////////////////////////
"use strict";

exports.showMenu = function() {
    
  require.ensure([], function(require) {
  let Menu = require('./menu').default;
      
  let menu = new Menu({
      
  });
      
   document.body.appendChild(menu.elem); 
  });
};

// common.js /////////////////
/* Polyfills
   Basic functions
   Other common stuff
*/
