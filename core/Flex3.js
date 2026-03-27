import { Utilery } from "../libs/Utilery.js";
// import { $ } from " ./libs/QuerySelector";
export class FlexJS {
    constructor(url = "") {
        let params = this.getParams();
        console.log("params");  
        console.log(params.length);
        // this.url = (params.length > 0) ? params : url;
        this.url = (params.length > 0) ? url+params: url;
        // this.url = url;
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