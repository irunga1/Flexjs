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

    async showData(view, psRender, content = "container", prRender = () => {}, ndta = null) {
        let data1 = await this.getData();
        prRender();
        console.log(data1);
        view(data1.results, content);
        psRender();
        console.log(ndta)
    }
}