var webpack = require('webpack');
const path = require('path');

module.exports={
  entry: [
    "script-loader!jquery/dist/jquery.min.js",
    "script-loader!foundation-sites/dist/js/foundation.min.js",
    "./app/app.jsx"
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [
              path.resolve(__dirname, './node_modules/foundation-sites/scss')
          ]
        }
      }
    })
  ],
  output:{
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve:{
    modules: [__dirname, "node_modules"],
    alias:{
      applicationStyles: 'app/styles/app.scss',
    },
    extensions: ['.js', '.jsx']
  },
  module:{
    loaders:[
      {
        loader: 'babel-loader',
        query:{
          presets: ['react', 'latest', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
       test: /\.vue$/,
       loader: 'vue-loader',
       options: {
         loaders: {
           scss: 'vue-style-loader!css-loader!sass-loader?' + JSON.stringify({
             includePaths: [
               path.resolve(__dirname, 'node_modules/foundation-sites/scss'),
             ]
           }), // <style lang="scss">
           sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
          }
        }
       },
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [
                path.resolve(__dirname, 'node_modules/foundation-sites/scss'),
              ]
            }
          }
        ]
      }
    ]
  },
  devtool: 'eval-source-map'
};
