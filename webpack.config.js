  const path = require('path');
  const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
  module.exports = {
    entry: './source/js/main.js',
    devtool: 'source-map',
    output: {
      filename: 'main.bundle.js',
      path: path.resolve(__dirname, 'build/js'),
    },
    module: {
      rules: [{
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [{
            loader: 'url-loader',
          }, ],
        },
      ],
    },
    plugins: [
      new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        server: { baseDir: ['build'] }
      })
    ]
  };