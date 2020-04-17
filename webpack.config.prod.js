/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ImageminPlugin = require('imagemin-webpack'); // 手动压缩文件， 减少打包时间
// lossless
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminOptipng = require('imagemin-optipng');
// lossy
// const imageminMozjpeg = require('imagemin-mozjpeg');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { getEntryJsHtmlPrj } = require('./tools/helpers');

const [entryJsPath, htmlTemplatePath] = getEntryJsHtmlPrj();
const currentDirName = path.dirname(htmlTemplatePath);
const envConfig = dotenv.config({
  path: path.resolve(currentDirName, '.env'),
}).parsed;

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
  '@Common',
].reduce((obj, key) => {
  obj[key] = path.resolve(
    path.join(
      key.includes('Common') ? 'common' : '.',
      currentDirName,
      key.substring(1).toLowerCase(),
    ),
  );
  return obj;
}, {});

const targetDist = path.resolve(__dirname, 'dist', envConfig.PRJ_NAME);

module.exports = {
  context: path.resolve(__dirname, currentDirName),
  mode: 'production',
  target: 'web',
  entry: [entryJsPath],
  output: {
    path: targetDist,
    publicPath: '/',
    pathinfo: true,
    filename: 'js/[name].[contentHash].js',
    chunkFilename: 'js/[id].[name].[contentHash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.png', '.jpg', 'jpeg'],
    alias,
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
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
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
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
        test: [/\.(bmp|gif|jpeg|jpg|png|svg)$/],
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash:6].[ext]',
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

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.PRJ_NAME': JSON.stringify(envConfig.PRJ_NAME),
      'process.env.ENTRY_MAIN_FUNC': JSON.stringify(envConfig.ENTRY_MAIN_FUNC),
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh/),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contentHash:6].css',
      chunkFilename: 'styles/[id].[contentHash:6].css',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: '嘉岩供应链',
      inject: true,
    }),
    new webpack.NamedModulesPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  optimization: {
    usedExports: true,
    sideEffects: true,
    minimizer: [
      // new ImageminPlugin({
      //   bail: false,
      //   cache: true,
      //   imageminOptions: {
      //     plugins: [
      //       ['gifsicle', { interlaced: true }],
      //       ['jpegtran', { progressive: true }],
      //       ['optipng', { optimizationLevel: 5 }],
      //       [
      //         'svgo',
      //         {
      //           plugins: [
      //             {
      //               removeViewBox: false,
      //             },
      //           ],
      //         },
      //       ],
      //     ],
      //   },
      //   loader: false,
      //   name: '[path][name].[ext]',
      // }),
      // new ImageminPlugin({
      //   pngquant: ({quality: [0.5, 0.5]}),
      //   plugins: [imageminMozjpeg({quality: 50})]
      // })
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: false,
};
