import { Utilery } from "../libs/Utilery.js";
// import { $ } from " ./libs/QuerySelector";
export class FlexJS {
    constructor(url = "") {
        this.url = url;
    }
    getParams = () => {
        let obj = new Utilery();
        let params = obj.getParams();
        return params;
    }
    init(view, fnc, contentId = "content", mdl, prRender) {
        document.addEventListener("DOMContentLoaded", () => {
            let obj = new mdl(this.url);
            obj.showData(view, fnc, contentId, prRender);
        });
    }
}