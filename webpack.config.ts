import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const config: webpack.Configuration = {
  target: 'web',
  entry: {
    index: ['./src/index.ts'],
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
              presets: ['@babel/preset-env'],
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' }), new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      modules: path.resolve(__dirname, 'src/modules/'),
      images: path.resolve(__dirname, 'src/images/'),
    },
  },
}

export default config