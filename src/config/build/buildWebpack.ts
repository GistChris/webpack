import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildMode, BuildOptions, BuildPaths } from "./types/types";
export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === "development";
  return {
    mode: mode ?? "development",
    // mode: "development",
    //tochka vkhoda dlia odnogo
    ////////////////////////////////////
    //resolve skleivaet put
    entry: paths.entry,
    //////////////////////////////////////////////////////
    //  tochka vkhoda dlia dvukh vkhodnykh failov
    // entry:{
    //  helloWord: path.resolve(__dirname, "src", "index.js"),
    //  helloWord2: path.resolve(__dirname, "src", "index2.js")
    // }
    output: {
      path: paths.output,
      //////////problema-brauser budet cashirovat faily
      // filename: 'asf.js',
      ////na kazdyi release delaem svezhee v dinamike ispolzuem shablony
      // filename: '[name].js',
      //main.js po nazvaniu  antry point
      ////esli dobavim [contenthash] to on budet brat hash ot soderzhimogo faila
      filename: "[name].[contenthash].js",

      //////////////dlia udalenia failov pri kazhdoi sborke clean true
      clean: true,
    },
    // plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname,'public','index.html')})],
    plugins: buildPlugins(options),
    //louders kakto obrabatyvaiut fily s raznymi rasshireniami
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    // devtool: "inline-source-map",
    ////////////////////
    devtool: isDev && "inline-source-map",
    //////////////////////
    //devServer nastroen na otkrytie po zadannomy porty
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
