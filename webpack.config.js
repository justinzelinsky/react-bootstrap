const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

const paths = {
  source: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};
const devMode = process.env.NODE_ENV !== 'production';
const styleLoader = devMode ? 'style-loader' : MiniCssExtractPlugin.loader;

const devServer = {
  contentBase: paths.dist,
  compress: true,
  hot: true,
  port: 9000
};

const entry = path.join(paths.source, 'index.jsx');

const rules = [
  {
    test: /.(jsx?)$/,
    exclude: /node_modules/,
    use: ['babel-loader', 'eslint-loader']
  },
  {
    test: /.scss$/,
    use: [
      styleLoader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: !devMode,
          modules: {
            mode: 'local',
            localIdentName: '[name]-[local]-[hash:base64:6]'
          }
        }
      },
      {
        loader: 'sass-loader',
        options: {
          prependData: '@import "src/styles/vars";'
        }
      }
    ]
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.(png|jpg|gif|svg)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  }
];

const optimization = {
  minimizer: [
    new OptimizeCSSAssetsPlugin({}),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    })
  ],
  splitChunks: {
    chunks: 'all'
  }
};

const output = {
  filename: 'app.js',
  path: paths.dist
};

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    title: 'React Starter'
  })
];

if (!devMode) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  );
}

if (process.env.WEBPACK_ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}

const resolve = {
  extensions: ['.jsx', '.js'],
  modules: ['node_modules', 'src', 'src/components']
};

module.exports = {
  devServer,
  entry,
  module: {
    rules
  },
  output,
  optimization,
  plugins,
  resolve
};
