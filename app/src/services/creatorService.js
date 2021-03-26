export default class CreatorService{
    _apiBase = `http://back-creator:1252/`;

    async getResource(url){

        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok){
            throw  new Error(`Could not fetch ${this._apiBase}${url},
            received ${res.status}`)
        }



        return await res.json();
    }

    async getRubrics(){
        return await this.getResource('rubrics');
    }

    async getIframeByRubricId(idRubrics){
        return await this.getResource(`iframe/${idRubrics}`);
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