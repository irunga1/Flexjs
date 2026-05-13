import { Utilery } from "../libs/Utilery.js";
import { SetUrl } from '../libs/SetURL.js';
// import { $ } from " ./libs/QuerySelector";
window.SetUrl = SetUrl;
export class FlexJS {
    constructor(baseUrl = "", css = "",pageApi =1) {
        const routeSuffix = this.getRouteSuffix();
        this.pageApi = pageApi;
        this.url = routeSuffix.length > 0 ? `${baseUrl}${routeSuffix}` : baseUrl;
        window.flexApp = this;
        // this.installLoadingGuard();
        if (css !== "") {
            this.applyStylesheet(css);
        }
    }
    getRouteSuffix = () => {
        const utility = new Utilery();
        return utility.getParamsSP();
    };
    init(renderView, afterRenderCallback, containerId = "content", ModelClass, beforeRenderCallback,verMas = true) {
        this.viewConfig = { renderView, afterRenderCallback, containerId, ModelClass, beforeRenderCallback, verMas };
        document.addEventListener("DOMContentLoaded", async() => {
            this.blackout();
            const modelInstance = new ModelClass(this.url);
            await modelInstance.showData(renderView, afterRenderCallback, containerId, beforeRenderCallback, "results");
            if (verMas) {
                this.addBtnViewMore(4, containerId);
            }
        });
    }
    init2(renderView, afterRenderCallback, containerId = "content", ModelClass, beforeRenderCallback, url2, verMas = true) {
        this.viewConfig = { renderView, afterRenderCallback, containerId, ModelClass, beforeRenderCallback, verMas };
        const loadPage = async () => {
            this.url = url2;
            const currentUrl = new URL(url2, window.location.href);
            this.pageApi = Number(currentUrl.searchParams.get("page")) || this.pageApi;
            document.getElementById("flex-view-more")?.remove();
            this.blackout();
            const modelInstance = new ModelClass(url2);
            await modelInstance.showData(renderView, afterRenderCallback, containerId, beforeRenderCallback, "results");
            if (verMas) {
                this.addBtnViewMore(4, containerId);
            }

        };

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", loadPage);
            return;
        }

        loadPage();
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
            // document.documentElement.classList.remove("flex-loading");
            return;
        }
        el.style.opacity = "0";
        setTimeout(() => {
            el.remove();
            // document.documentElement.classList.remove("flex-loading");
        }, 500);
    }
    addBtnViewMore = (intNumber =0 , strContent = "container",) => {
        intNumber=  Number(this.pageApi)+1;
        console.log(intNumber);
        const url = new URL(this.url, window.location.href);
        url.searchParams.set("page", intNumber);
        document.getElementById("flex-view-more")?.remove();
        let strBtn = `<button id="flex-view-more" onclick="SetUrl('${url.toString()}')">ver mas</button>`;
        document.getElementById(strContent).insertAdjacentHTML("beforeend", strBtn);
    }

}
