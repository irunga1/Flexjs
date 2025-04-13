export class FlexJS {
    constructor(url = "") {
        this.url = url;
    }

    init(view, fnc, contentId = "content", mdl, prRender) {
        document.addEventListener("DOMContentLoaded", () => {
            let obj = new mdl(this.url);
            obj.showData(view, fnc, contentId, prRender);
        });
    }
}