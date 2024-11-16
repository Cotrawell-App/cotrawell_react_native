const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const {presets} = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  'react-native-safe-area-context',
  'react-native-screens',
  'react-native-paper-dates',
  '@react-navigation/stack',
  'react-native',
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'src/index.web.js'),
    path.resolve(__dirname, 'src/App.js'),
    path.resolve(__dirname, 'src'),
    ...compileNodeModules,
  ],
  exclude:
    /node_modules\/(?!(react-native|react-native-.*|@react-native-.*|@react-navigation\/.*)\/).*/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [...presets, '@babel/preset-flow'],
      plugins: [
        'react-native-web',
        '@babel/plugin-proposal-export-namespace-from',
      ],
    },
  },
};
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|ico)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
      limit: 10000,
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
      options: {
        native: true,
        throwIfNamespace: false,
      },
    },
  ],
};

// ... keep your existing SVG and image loader configurations ...

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'rnw_blogpost.bundle.js',
  },
  resolve: {
    extensions: [
      '.web.js',
      '.web.tsx',
      '.tsx',
      '.web.jsx',
      '.jsx',
      '.js',
      '.ts',
    ],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-safe-area-context':
        'react-native-safe-area-context/lib/module/index.js',
      '@react-native-masked-view/masked-view':
        '@react-native-masked-view/masked-view/lib/module/index.js',
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      process: {env: {}},
    }),
  ],
};
