export class Utilery {
    constructor(firstProp = 'default') {
        this.firstProp = firstProp
    }
    getParams = () => {
        const currentUrl = window.location.href;
        let queryParts = currentUrl.split('?');
        if (queryParts.length <= 1) {
            return [];
        }
        else {
            queryParts = queryParts[1];
        }
        const keyValueParts = queryParts.split('=');
        const routeSuffix = `/${keyValueParts[1]}`;

        return routeSuffix;
    }
    getParamsSP = () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        if ([...urlSearchParams].length === 0) return [];
        const routeSuffix = `/${urlSearchParams.values().next().value}`;
        return routeSuffix;
    };

}
