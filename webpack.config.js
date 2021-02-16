const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './assets/js/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [ {
          loader: 'file-loader',
          options: {
            name (file) {
              return '[path][name].[ext]'
            },
            publicPath: url => url.replace('../', '/assets/')
          }
        },
        { loader: 'image-webpack-loader' }
        ],
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    })
  ],
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js',
  },
  mode: 'development',
};
