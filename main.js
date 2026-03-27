import { RickAndMorty } from "./models/RickAndMorty.js";
import { viewCardList } from "./views/viewCardList.js";
import { runPostRender } from "./helper/postRenderFn.js";
import { FlexJS } from "./core/Flex.js";
import { runBeforeRender } from "./helper/preRenderFn.js";
const apiResource = "character";
const apiBaseUrl = `https://rickandmortyapi.com/api/${apiResource}`;
const flexApp = new FlexJS(apiBaseUrl);
flexApp.init(viewCardList, runPostRender, "container", RickAndMorty, runBeforeRender, 10);
flexApp.applyStylesheet();




