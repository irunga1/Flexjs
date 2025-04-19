import { RickAndMorty } from "./models/RickAndMorty.js";
import { viewCardList } from "./views/viewCardList.js";
import { postRenderFn } from "./helper/postRenderFn.js";
import { FlexJS } from "./core/Flex.js";
import { preRenderFn } from "./helper/preRenderFn.js";
let uriParm = "character";
const app = new FlexJS(`https://rickandmortyapi.com/api/${uriParm}`);
// const app = new FlexJS("https://rickandmortyapi.com/api/character");
// app.getParams();
app.init(viewCardList, postRenderFn, "container", RickAndMorty, preRenderFn, 10);

