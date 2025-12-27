const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

// Modules that need to be compiled for web
const compileNodeModules = [
  'react-native',
  'react-native-reanimated',
  'react-native-gesture-handler',
  'react-native-screens',
  'react-native-safe-area-context',
  'react-native-vector-icons',
  '@react-navigation',
  '@tamagui',
  'tamagui',
  'react-native-web',
  'react-native-svg',
  'react-native-launch-navigator',
  '@gorhom/bottom-sheet',
  'react-native-date-picker',
  '@react-native-community/datetimepicker'
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

module.exports = {
  entry: './index.web.tsx',
  mode: 'development',
  resolve: {
    extensions: ['.web.js', '.js', '.jsx', '.tsx', '.ts', '.mjs'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-background-geolocation': path.resolve(__dirname, 'webpack/mocks/react-native-background-geolocation.js'),
      'react-native-vision-camera': path.resolve(__dirname, 'webpack/mocks/react-native-vision-camera.js'),
      'react-native-permissions': path.resolve(__dirname, 'webpack/mocks/react-native-permissions.js'),
      'react-native-keychain': path.resolve(__dirname, 'webpack/mocks/react-native-keychain.js'),
      'react-native-fs': path.resolve(__dirname, 'webpack/mocks/react-native-fs.js'),
      'react-native-device-info': path.resolve(__dirname, 'webpack/mocks/react-native-device-info.js'),
      'react-native-config': path.resolve(__dirname, 'webpack/mocks/react-native-config.js'),
      'react-native-maps': path.resolve(__dirname, 'webpack/mocks/react-native-maps.js'),
      'react-native-fast-image': path.resolve(__dirname, 'webpack/mocks/react-native-fast-image.js'),
      'react-native-linear-gradient': path.resolve(__dirname, 'webpack/mocks/react-native-linear-gradient.js'),
      'react-native-image-picker': path.resolve(__dirname, 'webpack/mocks/empty-mock.js'),
      'react-native-notifications': path.resolve(__dirname, 'webpack/mocks/empty-mock.js'),
      'react-native-fbsdk-next': path.resolve(__dirname, 'webpack/mocks/empty-mock.js'),
      '@react-native-google-signin/google-signin': path.resolve(__dirname, 'webpack/mocks/empty-mock.js'),
      '@invertase/react-native-apple-authentication': path.resolve(__dirname, 'webpack/mocks/empty-mock.js'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        include: [
          path.resolve(__dirname, 'index.web.tsx'),
          path.resolve(__dirname, 'App.tsx'),
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'tamagui.config.ts'),
          ...compileNodeModules
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@react-native/babel-preset'],
            plugins: [
                'react-native-reanimated/plugin',
                ['@babel/plugin-proposal-private-methods', { loose: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    historyApiFallback: true,
    compress: true,
    port: 8080,
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      process: { env: { NODE_ENV: JSON.stringify('development') } }
    }),
    new HtmlWebpackPlugin({
        template: './index.html',
    }),
  ],
};
