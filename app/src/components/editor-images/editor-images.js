import axios from 'axios';

export default class EditorImages {

    constructor(element, virtualElement, ...[isLoading, isLoaded, showNotifications]) {
        this.element = element;
        this.virtualElement = virtualElement;


        this.element.addEventListener('click', () => this.onClick());

        this.imgUploader = document.querySelector("#img-upload");
        this.isLoading = isLoading;
        this.isLoaded = isLoaded;
        this.showNotifications = showNotifications;
    }

    onClick(){
        this.uploader = document.createElement('input');
        this.uploader.setAttribute('type', 'file');
        //this.imgUploader.click();
        this.uploader.click();


        this.uploader.addEventListener('change', () => {
            if(this.uploader.files && this.uploader.files[0]){
                let formData = new FormData();
                formData.append("image", this.uploader.files[0]);
                this.isLoading();
                fetch('../api/uploadImage.php', {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then((res) => {

                        this.element.src = `./images/${res}`;


                    })
                    .catch(() => this.showNotifications('Ошибка сохранения', 'danger'))
                    .finally(() => {
                        this.uploader.remove();
                        this.isLoaded();
                    })






            }
        })
    }
}