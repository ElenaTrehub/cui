export default class CreatorService{


    _apiBase = `http://back-creator:1252/`;



    async getResource(url){

        // function getCookie(name) {
        //     let matches = document.cookie.match(new RegExp(
        //         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        //     ));
        //     return matches ? decodeURIComponent(matches[1]) : undefined;
        // }
        // //document.cookie = 'SameSite=None; Secure';
        // console.log(document.cookie);
        // // let session = getCookie('PHPSESSID');
        // // console.log(session);
        // const headers = new Headers({
        //      'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': 'http://back-creator:1252/'
        // });{credentials: 'include'}

        const res = await fetch(`${this._apiBase}${url}` );

        if(!res.ok){
            throw  new Error(`Could not fetch ${this._apiBase}${url},
            received ${res.status}`)
        }



        return await res.json();
    }

    async getRubrics(currentLang){
        return await this.getResource(`rubrics/${currentLang}`);
    }

    async getAllFonts(){
        return await this.getResource('fonts');
    }

    async getIframeByRubricId(idRubrics, siteType, siteStyle, siteTheme, lang){

        if(siteType === 'landing'){
            return await this.getResource(`landing/${idRubrics}/${siteStyle}/${siteTheme}/${lang}`);
        }
        else{
            return await this.getResource(`manyPage/${idRubrics}/${siteStyle}/${siteTheme}/${lang}`);
        }

    }
    async getSubRubrics(idRubric, lang){
        return await this.getResource(`subrubrics/${idRubric}/${lang}`);
    }

    async getSectionsByName(currentRubric, section, currentSiteStyle){

        return await this.getResource(`sections/${currentRubric}/${section}/${currentSiteStyle}`);
    }

    async getChooseSection(currentRubric, section, currentSiteStyle, currentTheme, sectionId, currentSiteType){

        return await this.getResource(`choose-section/${currentRubric}/${section}/${currentSiteStyle}/${currentTheme}/${sectionId}/${currentSiteType}`);
    }
    async getAddSection(currentRubric, section, currentSiteStyle,  currentSiteType, currentTheme){

        return await this.getResource(`add-section/${currentRubric}/${section}/${currentSiteStyle}/${currentSiteType}/${currentTheme}`);
    }
    async getAllSectionNames(){

        return await this.getResource(`sections`);
    }

    async createCSSFile(){
        const res = await fetch('/api/createCSSFile.php');

        if(!res.ok){
            throw  new Error(`Could not fetch ,
            received ${res.status}`)
        }

        //return await res.json();

        console.log(res.json());
    }


}