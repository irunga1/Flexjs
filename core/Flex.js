import { RickAndMorty } from "../models/RickAndMorty.js";

export class FlexJS {
    constructor(url = "") {
        this.url = url;
    }

    init(view, fnc, contentId = "content") {
        document.addEventListener("DOMContentLoaded", () => {
            let obj = new RickAndMorty(this.url);
            obj.showData(view, fnc, contentId);
        });
    }
}