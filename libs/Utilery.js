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
        let paramsArray = params.split('=');
        let paramsStr = `/${paramsArray[1]}`;
        // let paramsArray = params.split('&');

        // let paramsArray2 = [];
        // for (let i=0; i<paramsArray.length; i++){
        //     let tmp = paramsArray[i].split('=');

        //     paramsArray2[tmp[0]] = tmp[1];

        // }
        return paramsStr;
    } 

}