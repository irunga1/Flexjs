import { RickAndMorty } from "./models/RickAndMorty.js";
import { viewName } from "./views/viewName.js";
import { viewNameAlt } from "./views/viewNameAlt.js";
import { nfm1 } from "./helper/nfm.js";
import { FlexJS } from "./core/Flex.js";
import { prefn } from "./helper/prefn.js";
// import { Utilery } from "./libs/Utilery.js";

// let utl = new Utilery();
// let params = utl.getParams();
// console.log(params);

const app = new FlexJS("https://rickandmortyapi.com/api/character");
app.getParams();
console.log(app.getParams());
app.init(viewName, nfm1, "container", RickAndMorty, prefn, 10);

// document.addEventListener("DOMContentLoaded", () => {
//     let obj = new RickAndMorty("https://rickandmortyapi.com/api/character");
//     obj.showData(viewName, nfm1);
// });