import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import webpack from 'webpack'

const config: webpack.Configuration = {
  target: 'web',
  entry: {
    index: ['./src/index.ts'],
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      edge: '17',
                      firefox: '60',
                      chrome: '67',
                      safari: '11.1',
                      ie: '11',
                    },
                    useBuiltIns: 'usage',
                    corejs: '3.22.5',
                  },
                ],
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash].[ext]',
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' }), new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
}

export default config
