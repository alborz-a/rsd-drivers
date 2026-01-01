const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

const compileNodeModules = [
  'react-native-reanimated',
  'react-native-gesture-handler',
  'react-native-vector-icons',
  'react-native-screens',
  'react-native-safe-area-context',
  '@react-navigation',
  '@gorhom/bottom-sheet',
  '@gorhom/portal',
  'tamagui',
  '@tamagui',
  'react-native-web',
  'react-native-svg',
  'react-native-bootsplash',
  '@backpackapp-io/react-native-toast',
  'react-native-maps',
  'react-native-super-grid',
  'react-native-signature-canvas',
  'react-native-image-picker',
  'react-native-webview',
];

module.exports = {
  entry: './index.web.tsx',
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-maps$': 'react-native-web-maps',
      'react-native-linear-gradient$': 'react-native-web-linear-gradient',
      // Mock unsupported native modules
      'react-native-camera-roll/camera-roll$': path.resolve(__dirname, 'src/__mocks__/react-native-camera-roll.js'),
      'react-native-google-signin': path.resolve(__dirname, 'src/__mocks__/empty-module.js'),
      'react-native-mmkv-storage': path.resolve(__dirname, 'src/__mocks__/empty-module.js'),
      'react-native-background-geolocation': path.resolve(__dirname, 'src/__mocks__/empty-module.js'),
      'react-native-background-fetch': path.resolve(__dirname, 'src/__mocks__/empty-module.js'),
      'react-native-launch-navigator': path.resolve(__dirname, 'src/__mocks__/empty-module.js'),
      'react-native-notifications': path.resolve(__dirname, 'src/__mocks__/empty-module.js'),
      'react-native-permissions': path.resolve(__dirname, 'src/__mocks__/empty-module.js'),
      'react-native-haptic-feedback': path.resolve(__dirname, 'src/__mocks__/empty-module.js'),
    },
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        include: [
          path.resolve(appDirectory, 'index.web.tsx'),
          path.resolve(appDirectory, 'src'),
          path.resolve(appDirectory, 'App.tsx'),
          path.resolve(appDirectory, 'tamagui.config.ts'),
          ...compileNodeModules.map((moduleName) =>
            path.resolve(appDirectory, `node_modules/${moduleName}`)
          ),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['module:@react-native/babel-preset'],
            plugins: ['react-native-web'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              native: true,
            },
          },
        ],
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'index.html'),
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      process: { env: {} },
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(appDirectory, 'dist'),
    },
    compress: true,
    port: 8080,
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: false,
    },
  },
};
