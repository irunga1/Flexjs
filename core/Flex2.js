export class FlexJSLocal {
    constructor(initialState = {}) {
        this.state = initialState;
    }

    init(renderView, afterRenderCallback = () => {}, containerId = "content", beforeRenderCallback = () => {}) {
        document.addEventListener("DOMContentLoaded", () => {
            beforeRenderCallback(this.state, containerId);
            renderView(this.state, containerId);
            afterRenderCallback(this.state, containerId, renderView, this.updateView);
        });
    }

    updateView = (nextState, renderView, containerId = "content", afterRenderCallback = () => {}) => {
        this.state = {
            ...this.state,
            ...nextState
        };

        renderView(this.state, containerId);
        afterRenderCallback(this.state, containerId, renderView, this.updateView);
    };

    applyStylesheet = (stylesheetName = "page.css") => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `./css/${stylesheetName}`;
        document.head.appendChild(link);
    };
}
