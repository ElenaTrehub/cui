import UIkit from "uikit";

export default class Helper{
    static isEmptyObject(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }


    static getSizeFont(str){
        const regex = /[\d\.]+/g;
        const arr = str.match(regex);

        const minSize = arr[0];
        const maxSize = arr[2];
        const koef = arr[1];
        let currentFont = 0;

        const currentScreenWidth = window.innerWidth;
        const fontSize = koef*currentScreenWidth/100;

        if(fontSize < minSize){
            currentFont = minSize;
        }
        else if(fontSize > maxSize){
            currentFont = maxSize;
        }
        else{
            currentFont = Math.round(fontSize);
        }


        const fontObj = {};
        fontObj.minSize = minSize;
        fontObj.maxSize = maxSize;
        fontObj.koef = koef;
        fontObj.currentFont = currentFont;

        return fontObj;
    }
    static minusSizeFont(str){

        const fontObj = this.getSizeFont(str);

        if(fontObj.currentFont > 1 && fontObj.maxSize >1 || fontObj.minSize > 1){

            const currentScreenWidth = window.innerWidth;
            let currentFont = fontObj.currentFont - 1;
            let koef = 0;
            if(fontObj.currentFont !== fontObj.maxSize && fontObj.currentFont !== fontObj.minSize){
                koef = (currentFont*100/currentScreenWidth).toFixed(1);
            }
            else{
                koef = fontObj.koef;
            }



            const minSize = fontObj.minSize <= 1 ? fontObj.minSize : fontObj.minSize - 1;

            const maxSize = fontObj.maxSize <= 1 ? fontObj.maxSize : fontObj.maxSize - 1;

            return 'clamp('+minSize+'px, '+ koef + 'vw, ' + maxSize + 'px)';
        }
        else{
            UIkit.modal.alert("Размер шрифта не может быть меньше 1px!", {labels: {ok: "Ok"}});
            return str;
        }


    }

    static plusSizeFont(str){

        const fontObj = this.getSizeFont(str);


        const currentScreenWidth = window.innerWidth;
        let currentFont = fontObj.currentFont + 1;
        let koef = 0;
        if(fontObj.currentFont !== fontObj.maxSize && fontObj.currentFont !== fontObj.minSize){
            koef = (currentFont*100/currentScreenWidth).toFixed(1);
        }
        else{
            koef = fontObj.koef;
        }



            const minSize = +fontObj.minSize + 1;

            const maxSize = +fontObj.maxSize + 1;

            return 'clamp('+minSize+'px, '+ koef + 'vw, ' + maxSize + 'px)';
        }




}