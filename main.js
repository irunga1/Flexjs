import { RickAndMorty } from "./models/RickAndMorty.js";
import { viewName } from "./views/viewName.js";
import { nfm1 } from "./helper/nfm.js";

document.addEventListener("DOMContentLoaded", () => {
    let obj = new RickAndMorty("https://rickandmortyapi.com/api/");
    obj.showData(viewName, nfm1);
});