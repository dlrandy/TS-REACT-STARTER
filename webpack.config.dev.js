/* eslint-disable global-require */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// thread-loader for expensive operations!
const postcssNormalize = require('postcss-normalize');
const { getEntryJsHtmlPrj } = require('./tools/helpers');

const [entryJsPath, htmlTemplatePath] = getEntryJsHtmlPrj();
const currentDirName = path.dirname(path.normalize(htmlTemplatePath));
const envConfig = dotenv.config({
  path: path.resolve(currentDirName, '.env'),
}).parsed;


const tsconfigFilePath = path.resolve(currentDirName, 'tsconfig.json');
const alias = [
  '@Actions',
  '@Assets',
  '@Common',
  '@Components',
  '@Containers',
  '@Epics',
  '@Networks',
  '@Reducers',
  '@Routes',
  '@Store',
  '@@Types',
  '@Utils',
].reduce((obj, key) => {
  const target = { ...obj };
  target[key] = path.join(currentDirName, key.substring(1).toLowerCase());
  return target;
}, {});

module.exports = {
  mode: 'development',
  target: 'web',
  entry: [entryJsPath],
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: '/',
    pathinfo: true,
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
    filename: 'static/[name].[chunkhash:8].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.png', '.jpg', 'jpeg'],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          // { loader: 'cache-loader' },
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     // there should be 1 cpu for the fork-ts-checker-webpack-plugin
          //     workers: require('os').cpus().length - 1,
          //   },
          // },
          {
            loader: 'ts-loader',
            options: {
              // transpileOnly: true,
              happyPackMode: true,
              configFile: path.resolve(currentDirName, 'tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssNormalize(/* pluginOptions */),
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                    grid: 'autoplace',
                  },
                  stage: 0,
                }),
              ],
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: 'url-loader',
        options: {
          name: '[name].[hash].[ext]',
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: './',
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    inline: true,
    open: 'chrome',
    port: 3000,
    proxy: {
      '/rest': {
        target: 'http://192.168.0.66:8080',
        // target: 'http://localhost:3000',
        headers: {
        },
      },
      '/nc': {
        target: 'http://192.168.0.66:8080',
        // target: 'http://localhost:3000',
        headers: {
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.PRJ_NAME': JSON.stringify(envConfig.PRJ_NAME),
      'process.env.ENTRY_MAIN_FUNC': JSON.stringify(envConfig.ENTRY_MAIN_FUNC),
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: tsconfigFilePath,
      eslint: true,
      useTypescriptIncrementalApi: true,
      async: false,
      checkSyntacticErrors: true,
      reportFiles: [
        `src/${currentDirName}**/*.{ts,tsx}`,
        '!**/*.json',
        '!**/__tests__/**',
        '!**/?(*.)(spec|test).*',
        '!**/src/setupProxy.*',
        '!**/src/setupTests.*',
      ],
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh/),
    new HtmlWebpackPlugin({
      template: htmlTemplatePath,
      title: 'developing',
      inject: true,
    }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    moduleIds: 'named',
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'all',
      minChunks: 1,
      minSize: 30000,
      name: false,
    },
  },
  // node: {
  //   dgram: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty',
  //   child_process: 'empty',
  // },
  performance: false,
};
