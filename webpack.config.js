const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'public/js/conversion.js'),
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'conversion-compiled.js'
  },
  mode: 'production' // ou development
  ,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
