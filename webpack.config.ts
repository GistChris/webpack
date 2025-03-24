import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths, BuildPlatform } from "./config/build/types/types";
interface EnvVariables {
  mode?: BuildMode;
  analyser?:boolean;
  port?: number;
  platform?: BuildPlatform;
  
}
//webpack plugin po umolchaniu
// module.exports = (env:any) => {
export default (env: EnvVariables) => {
  const paths:BuildPaths={
    output:path.resolve(__dirname,'build'),
    entry:path.resolve(__dirname,'src','index.tsx'),
    html:path.resolve(__dirname,'public','index.html'),
    public:path.resolve(__dirname,'public'),
    src:path.resolve(__dirname,'src'),

  }
  //////////////////////////////////////////////
  // const isDev = env.mode === "development";
  // const isProd = env.mode === "production";
  //////////////////////////////////////
  // The 'mode' option has not been set, webpack will fallback to 'production' for this value.
  //mode:'development'- v kakom rezhime zapuskaetsia razrabotka ili production
  const config: webpack.Configuration = buildWebpack({
    port: env.port??3000,
    mode: env.mode??'development',
    paths,
    analyser: env.analyser,
    platform: env.platform ?? 'desKtop'

  })

  return config;
};
