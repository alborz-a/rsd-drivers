const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

// Modules that need to be transpiled by Babel
const compileNodeModules = [
  'react-native-web',
  'react-native-reanimated',
  'react-native-gesture-handler',
  'react-native-vector-icons',
  'react-native-safe-area-context',
  'react-native-screens',
  '@react-navigation',
  '@gorhom',
  'tamagui',
  '@tamagui',
  '@fleetbase',
  'react-native-bootsplash',
  'react-native-svg',
  'react-native-linear-gradient',
  'react-native-fast-image',
  'react-native-webview',
  'react-native-maps',
  'react-native-calendar-strip',
  'react-native-collapsible',
  'react-native-fs',
  'react-native-image-picker',
  'react-native-signature-canvas',
  'react-native-super-grid',
  '@react-native/assets-registry',
  '@invertase/react-native-apple-authentication',
  '@react-native-community/blur',
  'react-native-vision-camera',
  '@backpackapp-io/react-native-toast',
  'react-native-permissions',
  'react-native-toast-message',
  'react-native-share',
  'react-native-view-shot',
  'react-native-haptic-feedback',
  'react-native-background-geolocation',
  'react-native-background-fetch',
  'react-native-launch-navigator',
  'react-native-device-info',
  'react-native-localize',
  'react-native-config',
  'react-native-mmkv-storage',
  'react-native-otp-entry',
  'react-native-render-html',
  'recyclerlistview',
  'socketcluster-client',
  'country-locale-map',
  'countries-list',
  'locale-emoji'
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  include: [
    path.resolve(appDirectory, 'index.web.tsx'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'App.tsx'),
    path.resolve(appDirectory, 'tamagui.config.ts'),
    path.resolve(appDirectory, 'navigator.config.ts'),
    path.resolve(appDirectory, 'mocks'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      configFile: path.resolve(appDirectory, 'babel.config.js'),
      plugins: ['react-native-web'],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  type: 'asset/resource',
};

const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  type: 'asset/resource',
};

module.exports = {
  entry: {
    app: path.join(appDirectory, 'index.web.tsx'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': path.resolve(appDirectory, 'mocks/react-native-linear-gradient.js'),
      'react-native-maps': path.resolve(appDirectory, 'mocks/react-native-maps.js'),
      'react-native-maps-directions': path.resolve(appDirectory, 'mocks/react-native-maps-directions.js'),
      '@invertase/react-native-apple-authentication': path.resolve(appDirectory, 'mocks/react-native-apple-authentication.js'),
      '@react-native-community/blur': path.resolve(appDirectory, 'mocks/react-native-community-blur.js'),
    },
    fallback: {
      "fs": false,
      "path": false,
      "os": false,
    }
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      ttfLoaderConfiguration,
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appDirectory, 'index.html'),
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      process: { env: {} },
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(appDirectory, 'dist'),
    },
    hot: true,
    port: 8080,
    client: {
      overlay: false,
    },
  },
};
