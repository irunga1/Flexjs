import { ApiModule } from "./ApiModule.js";

export class TMDB extends ApiModule {
    constructor(apiUrl = "") {
        super(apiUrl);
    }
}
