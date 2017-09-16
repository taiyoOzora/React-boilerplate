var webpack = require('webpack');
const path = require('path');
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try{
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'))
} catch (e){}

module.exports={
  entry: [
    "script-loader!jquery/dist/jquery.min.js",
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
    new webpack.optimize.UglifyJsPlugin({
      compressor:{
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [
              path.resolve(__dirname, './node_modules/foundation-sites/scss')
          ]
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
      }
    })
  ],
  output:{
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve:{
    modules: [
      __dirname,
      "node_modules",
      "./app/components",
      "./app/api"
    ],
    alias:{
      app: 'app',
      applicationStyles: 'app/assets/styles/app.scss',
      myJS: 'app/assets/js',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx',
    },
    extensions: ['.js', '.jsx']
  },
  module:{
    loaders:[
      {
        loader: 'babel-loader',
        query:{
          presets: ['react', 'env', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }, {
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
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map'
};
