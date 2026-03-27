import { Utilery } from "../libs/Utilery.js";
// import { $ } from " ./libs/QuerySelector";
export class FlexJS {
    constructor(baseUrl = "") {
        const routeSuffix = this.getRouteSuffix();
        this.url = routeSuffix.length > 0 ? `${baseUrl}${routeSuffix}` : baseUrl;
    }
    getRouteSuffix = () => {
        const utility = new Utilery();
        return utility.getParamsSP();
    };
    init(renderView, afterRenderCallback, containerId = "content", ModelClass, beforeRenderCallback) {
        document.addEventListener("DOMContentLoaded", () => {
            const modelInstance = new ModelClass(this.url);
            modelInstance.showData(renderView, afterRenderCallback, containerId, beforeRenderCallback, "results");
        });
    }
    applyStylesheet = (stylesheetName = "page.css") => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `./css/${stylesheetName}`;
        document.head.appendChild(link);
    };
}
