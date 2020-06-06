const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackStatsProgress = require('webpack-stats-progress');

const paths = {
  source: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};
const devMode = process.env.NODE_ENV !== 'production';

const devServer = {
  contentBase: paths.dist,
  compress: true,
  hot: true,
  open: 'Google Chrome',
  port: 9000
};

const devtool = devMode ? 'cheap-module-eval-source-map' : 'inline-source-map';

const entry = path.join(paths.source, 'index.jsx');

const rules = [
  {
    test: /.(jsx?)$/,
    include: paths.source,
    exclude: /node_modules/,
    use: ['babel-loader', 'eslint-loader']
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
  minimize: true,
  minimizer: [
    new OptimizeCSSAssetsPlugin(),
    new TerserPlugin({
      extractComments: false
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
    favicon: path.join(paths.source, 'assets/icons/favicon.ico'),
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

  plugins.push(
    new WebpackStatsProgress({ buildFolder: paths.dist })
  );
}

if (process.env.WEBPACK_ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}

const resolve = {
  extensions: ['.jsx', '.js'],
  modules: ['node_modules', 'src', 'src/components'],
  symlinks: false
};

const stats = devMode ? 'normal' : 'none';

const webpackConfig = {
  devServer,
  devtool,
  entry,
  module: {
    rules
  },
  output,
  optimization,
  plugins,
  resolve,
  stats
};

if (process.env.WEBPACK_ANALYZE) {
  const smp = new SpeedMeasurePlugin();
  module.exports = smp.wrap(webpackConfig);
} else {
  module.exports = webpackConfig;
}
