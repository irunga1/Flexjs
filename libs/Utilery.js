export class Utilery {
    constructor(firstProp = 'default') {
        this.firstProp = firstProp
    }
    getParams = () => {
        let url= window.location.href;
        let params = url.split('?');
        if (params.length <= 1) {
            return [];
        }
        else{
            params = params[1];
        }
        let paramsArray = params.split('&');
        return paramsArray;
    } 

}