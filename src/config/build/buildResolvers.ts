import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration } from "webpack";
import { BuildOptions } from "./types/types";
export function buildResolvers(options:BuildOptions):Configuration['resolve']{
    return {
      extensions: [".tsx", ".ts", ".js"],
      alias:{
        '@':options.paths.src,
      }
    }
}