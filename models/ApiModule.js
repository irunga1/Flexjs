export class ApiModule {
    constructor(url = "") {
        this.url = url;
    }

    async getData(endpoint = "") {
        let api = await fetch(`${this.url}${endpoint}`);
        let data = await api.json();
        return data;
    }

    async showData(view, nfm, endpoint = "") {
        let data = await this.getData(endpoint);
        console.log(data);
        view(data.results, "container");
        nfm();
    }
}