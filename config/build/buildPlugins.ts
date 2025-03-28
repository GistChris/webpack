import webpack, { DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";
export function buildPlugins({
  mode,
  paths,
  analyser,
  platform,
}: BuildOptions): Configuration["plugins"] {
  const isDev = mode === "development";
  const isProd = mode === "production";
  const plugins: Configuration["plugins"] = [
    //plugin  HtmlWebpackPlugin podstavliaet scripty v html file, kotorye poluchaiutgia v resultate sborki
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, "favicon.png"),
    }),
    new DefinePlugin({
      // __PLATFORM__:JSON.stringify(platform),
      __PLATFORM__: JSON.stringify(platform),
    }),
    // /* Vynosit proverku typov v otdelnyi */
    // new ForkTsCheckerWebpackPlugin()
  ];
  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
    /* Vynosit proverku typov v otdelnyi */
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }
  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, "locales"),
            to: path.resolve(paths.output, "locales"),
          },
          // { from: "other", to: "public" },
        ],
      })
    );
  }
  if (analyser) {
    //v okne otslezhivat BundleAnalyzer
    plugins.push(new BundleAnalyzerPlugin());
  }
  return plugins;
}
