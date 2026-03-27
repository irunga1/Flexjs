export class ApiModule {
    constructor(apiUrl = "") {
        this.url = apiUrl;
    }

    async getData() {
        const response = await fetch(this.url);
        const responseData = await response.json();
        return responseData;
    }

    async showData(renderView, afterRenderCallback, containerId = "container", beforeRenderCallback = () => {}, dataKey = "results") {
        const responseData = await this.getData();
        beforeRenderCallback();

        if (dataKey && responseData.hasOwnProperty(dataKey)) {
            responseData.results = responseData[dataKey];
        } else if (typeof responseData.results === "undefined") {
            responseData.results = responseData;
        }

        renderView(responseData.results, containerId);
        afterRenderCallback();
    }
}
