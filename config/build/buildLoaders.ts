import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { BuildOptions } from "./types/types";
import {buildBabelLoader} from "./babel/buildBabelLoader"
import { before } from "node:test";
export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";
  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };
  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          // svgoConfig:{
          //   plugins:[
          //     {
          //       name:'convertColor',
          //       params:{
          //         currentColor:true,
          //       }
          //     }
          //   ]
          // }
        },
      },
    ],
  };
  const cssLoaderWithModules = {
    // test: /\.css$/i,
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };
  const scssLoader =
    // poriadok louderov imeet znachenie
    // louger dlia css
    // {
    //   test: /\.css$/i,
    //   use: ["style-loader", "css-loader"],
    // },
    //louder dlia scss
    {
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
        // Translates CSS into CommonJS
        cssLoaderWithModules,
        // "css-loader",
        // Compiles Sass to CSS
        "sass-loader",
      ],
    };
  // const tsLoader = {
  //   //ts-loader ymeet pabotat s JSX
  //   //Ecli by my ne ispolzovali typescript:nnuzhen byl by babel-loader
  //   test: /\.tsx?$/,
  //   use: "ts-loader",
  //   exclude: /node_modules/,
  // };
  const tsLoader = 
    //ts-loader ymeet pabotat s JSX
    //Ecli by my ne ispolzovali typescript:nnuzhen byl by babel-loader
    {
      exclude: /node_modules/,
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
            }),
          },
        },
      ],
    };
  const babelLoader = buildBabelLoader(options)
  return [scssLoader, assetLoader, tsLoader, babelLoader, svgrLoader];
}
