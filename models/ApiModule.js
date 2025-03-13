export class ApiModule {
    constructor(url = "") {
        this.url = url;
    }

    async getData() {
        // let urlPart = `character`;
        let api = await fetch(`${this.url}`);
        let data = await api.json();
        return data;
    }

    async showData(view, nfm, content = "container") {
        let data1 = await this.getData();
        console.log(data1);
        view(data1.results, content);
        nfm();
    }
}