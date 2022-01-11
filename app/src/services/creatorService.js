export default class CreatorService{
    _apiBase = `http://back-creator:1252/`;

    async getResource(url){

        const res = await fetch(`${this._apiBase}${url}`, {credentials: 'include'});

        if(!res.ok){
            throw  new Error(`Could not fetch ${this._apiBase}${url},
            received ${res.status}`)
        }



        return await res.json();
    }

    async getRubrics(){
        return await this.getResource('rubrics');
    }

    async getAllFonts(){
        return await this.getResource('fonts');
    }

    async getIframeByRubricId(idRubrics, siteType, siteStyle, siteTheme){

        if(siteType === 'landing'){
            return await this.getResource(`landing/${idRubrics}/${siteStyle}/${siteTheme}`);
        }
        else{
            return await this.getResource(`manyPage/${idRubrics}/${siteStyle}/${siteTheme}`);
        }




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