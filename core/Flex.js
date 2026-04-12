import { Utilery } from "../libs/Utilery.js";
// import { $ } from " ./libs/QuerySelector";
export class FlexJS {
    constructor(baseUrl = "", css = "") {
        const routeSuffix = this.getRouteSuffix();
        this.url = routeSuffix.length > 0 ? `${baseUrl}${routeSuffix}` : baseUrl;
        if (css !== "") {
            this.applyStylesheet(css);
        }
    }
    getRouteSuffix = () => {
        const utility = new Utilery();
        return utility.getParamsSP();
    };
    init(renderView, afterRenderCallback, containerId = "content", ModelClass, beforeRenderCallback) {
        document.addEventListener("DOMContentLoaded", () => {
            this.blackout();
            const modelInstance = new ModelClass(this.url);
            modelInstance.showData(renderView, afterRenderCallback, containerId, beforeRenderCallback, "results");
        });
    }
    init2(renderView, afterRenderCallback, containerId = "content", ModelClass, beforeRenderCallback,url2) {
        document.addEventListener("DOMContentLoaded", () => {
            this.blackout();
            const modelInstance = new ModelClass(url2);
            modelInstance.showData(renderView, afterRenderCallback, containerId, beforeRenderCallback, "results");
        });
    }
    applyStylesheet = (stylesheetName = "page.css") => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `./css/${stylesheetName}`;
        document.head.appendChild(link);
    };
    blackout(duration = 1000) {
        const existingLoader = document.getElementById("loading");
        if (existingLoader) {
            existingLoader.remove();
        }
        document.body.insertAdjacentHTML("beforeend", `
            <div id="loading" style="
                position: fixed;
                inset: 0;
                background: black;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 1;
                transition: opacity 0.5s ease;
            ">
                🕐loading...
            </div>
        `);
        setTimeout(() => this.remove(), duration);
    }

    remove() {
        const el = document.getElementById("loading");
        if (!el) {
            return;
        }
        el.style.opacity = "0";
        setTimeout(() => {
            el.remove();
        }, 500);
    }
}
