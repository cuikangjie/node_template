const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const path = require('path');

let isProd = false
if (process.argv.includes('--release')) {
  isProd = true
}


let config = {
  entry: {
    app: [path.resolve(__dirname, '../src/app.js')]
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: ['node_modules', 'src', 'lib'],
    alias: {
      '@lib':path.resolve(__dirname, '../lib'),
      "@module": path.resolve(__dirname, "../src/module")
    },
    extensions: [".js", ".json", ".module.js"]
  },
 externals: [nodeExternals({importType:'commonjs',whitelist:[]})],
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: false,
    __dirname: false,
    setImmediate: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      // exclude: /node_modules/
    }]
  },
  mode: !isProd ? "development" : "production",
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: !isProd
    }),
  ]
};
if (isProd) {
  nodeConfig.entry.start = path.resolve(__dirname, '../pm2/index.js')
}

module.exports = config;
