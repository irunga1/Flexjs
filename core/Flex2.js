import { Utilery } from "../libs/Utilery.js";
// import { $ } from " ./libs/QuerySelector";
export class FlexJS {
    constructor(baseUrl = "") {
        const routeSuffix = this.getRouteSuffix();
        this.url = routeSuffix.length > 0 ? `${baseUrl}${routeSuffix}` : baseUrl;
    }
    getRouteSuffix = () => {
        const utility = new Utilery();
        return utility.getParams();
    };
    init(renderView, afterRenderCallback, containerId = "content", ModelClass, beforeRenderCallback) {
        document.addEventListener("DOMContentLoaded", () => {
            const modelInstance = new ModelClass(this.url);
            modelInstance.showData(renderView, afterRenderCallback, containerId, beforeRenderCallback);
        });
    }


}
