import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";
export function buildDevServer(options: BuildOptions):DevServerConfiguration{
    return {
        //npm run start -- --env port=5000 esli zapustit cherez commandnuiu staroku
        port: options.port ?? 3000,
        open: true,
        //chtoby  zarabotali stranitsy
        //esli razdavat staticu cherez nginx to nado delat proksirovanie na Index.html 
        historyApiFallback:true,
        //HOT MODULE BUILD REPLACEMENT - pozvoliaet obnovliat cod bez pereezagruzki stranitsy
        hot:true,
      }
}