import React, {Component} from "react";
import {connect} from "react-redux";
import UIkit from "uikit";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

import {
    virtualDomChanged
} from "../../actions";


// const iconList = Object.keys(Icons).filter((key) =>
//     key !== 'fas' && key !== 'prefix').map((icon) => Icons[icon]);

class ServiceModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            serviceTitle: null,
            serviceText: null,
            serviceImg: null,
            services: null
        }

    }
    saveServiceChange = (e) => {
        e.preventDefault();

        let newVirtualDom = [];
        const iframe = document.querySelector('iframe');
        const page = iframe.contentDocument.body.getAttribute('data-page');


        let newDom = '';
        let name = '';
        this.props.virtualDom.forEach(item => {
            if(item.name === page){
                newDom = item.html.cloneNode(true);
                name = item.name;
            }
            newVirtualDom.push(item);
        })

        //DOMHelper.unwrapTextNodes(newDom);
        //DOMHelper.unwrapImages(newDom);

        const mainTitleHtml = newDom.querySelector('.service-title');

        const mainTextHtml = newDom.querySelector('.service-content');

        const mainImgHtml = newDom.querySelector('.service-wrapper__img img');

        const serviceSlider = newDom.querySelector('.service-slider');
        const serviceAccordion = newDom.querySelector('.service-wrapper__accordion');



        const iframeMainTitleHtml = iframe.contentDocument.querySelector('.service-title');

        const iframeMainTextHtml = iframe.contentDocument.querySelector('.service-content');

        const iframeImgHtml = iframe.contentDocument.querySelector('.service-wrapper__img img');

        const iframeServiceSlider = iframe.contentDocument.querySelector('.service-slider');
        const iframeServiceAccordion = iframe.contentDocument.querySelector('.service-wrapper__accordion');



        const {serviceTitle, serviceText, serviceImg, services} = this.state;

        if(serviceTitle){
            mainTitleHtml.innerHTML = serviceTitle;
            iframeMainTitleHtml.innerText = serviceTitle;

        }

        if(serviceText){
            mainTextHtml.innerHTML = serviceText;
            iframeMainTextHtml.innerHtml = serviceText;

        }

        if(serviceImg){
            mainImgHtml.setAttribute('src', serviceImg);
            iframeImgHtml.setAttribute('src', serviceImg);

        }


        if(serviceSlider){

            const slides = serviceSlider.querySelectorAll('.service-slider-item');
            const iframeSlides = iframeServiceSlider.querySelectorAll('.service-slider-item');

            if(services.length < slides.length){

                slides.forEach((item, i) => {
                    if(i >= services.length){
                        item.remove();
                    }

                });


                iframeSlides.forEach((item, j) => {
                    if(j >= services.length){
                        item.remove();
                    }

                });

            }

            if(services.length > slides.length){


                services.forEach((slideItem, i) => {
                    if(i >= slides.length){
                        const newService = slides[0].cloneNode(true);
                        serviceSlider.appendChild(newService);
                    }

                });
                services.forEach((slideItem, i) => {
                    if(i >= iframeSlides.length){
                        const newService = iframeSlides[0].cloneNode(true);
                        iframeServiceSlider.appendChild(newService);
                    }

                });


            }
            const slidesAfter = newDom.querySelectorAll('.service-slider-item');

            const iframeSlidesAfter = iframe.contentDocument.querySelectorAll('.service-slider-item');

            slidesAfter.forEach((item, i) => {

                if(services[i].title !== null){
                    item.querySelector('.service-heading').innerHTML = services[i].title;
                }
                if(services[i].text !== null){
                    item.querySelector('.service-text').innerHTML = services[i].text;
                }
                if(services[i].number !== null){
                    item.querySelector('.service-number').innerHTML = services[i].number;
                }
                if(services[i].img !== null){
                    item.querySelector('.service-img img').setAttribute('src', services[i].img);

                }

            });


            iframeSlidesAfter.forEach((item , j) => {

                if(services[j].title !== null){
                    item.querySelector('.service-heading').innerHTML = services[j].title;
                }
                if(services[j].text !== null){
                    item.querySelector('.service-text').innerHTML = services[j].text;
                }
                if(services[j].number !== null){
                    item.querySelector('.service-number').innerHTML = services[j].number;
                }
                if(services[j].img !== null){
                    item.querySelector('.service-img img').setAttribute('src', services[j].img);

                }

            });




        }


        if(serviceAccordion){

            const slidesTitles = serviceAccordion.querySelectorAll('.service-heading');
            const slidesTexts = serviceAccordion.querySelectorAll('.service-text');

            const iframeSlidesTitles = iframeServiceAccordion.querySelectorAll('.service-heading');
            const iframeSlidesTexts = iframeServiceAccordion.querySelectorAll('.service-text');


            if(services.length < slidesTitles.length){

                slidesTitles.forEach((item, i) => {
                    if(i >= services.length){
                        item.remove();
                    }

                });
                slidesTexts.forEach((item, i) => {
                    if(i >= services.length){
                        item.remove();
                    }

                });


                iframeSlidesTitles.forEach((item, i) => {
                    if(i >= services.length){
                        item.remove();
                    }

                });
                iframeSlidesTexts.forEach((item, i) => {
                    if(i >= services.length){
                        item.remove();
                    }

                });

            }

            if(services.length > slidesTitles.length){


                services.forEach((slideItem, i) => {
                    if(i >= slidesTitles.length){
                        const newService = slidesTitles[0].cloneNode(true);
                        serviceAccordion.appendChild(newService);
                    }

                });
                services.forEach((slideItem, i) => {
                    if(i >= slidesTexts.length){
                        const newService = slidesTexts[0].cloneNode(true);
                        serviceAccordion.appendChild(newService);
                    }

                });
                services.forEach((slideItem, i) => {
                    if(i >= iframeSlidesTitles.length){
                        const newService = iframeSlidesTitles[0].cloneNode(true);
                        iframeServiceAccordion.appendChild(newService);
                    }

                });
                services.forEach((slideItem, i) => {
                    if(i >= iframeSlidesTexts.length){
                        const newService = iframeSlidesTexts[0].cloneNode(true);
                        iframeServiceAccordion.appendChild(newService);
                    }

                });


            }
            const slidesTitlesAfter = serviceAccordion.querySelectorAll('.service-heading span');
            const slidesTextsAfter = serviceAccordion.querySelectorAll('.service-text p');

            const iframeSlidesTitlesAfter = iframeServiceAccordion.querySelectorAll('.service-heading span');
            const iframeSlidesTextsAfter = iframeServiceAccordion.querySelectorAll('.service-text p');

            services.forEach((item, i) => {

                if(item.title !== null){
                    slidesTitlesAfter[i].innerHTML = item.title;
                    iframeSlidesTitlesAfter[i].innerHTML = item.title;
                }
                if(item.text !== null){
                    slidesTextsAfter[i].innerHTML = item.text;
                    iframeSlidesTextsAfter[i].innerHTML = item.text;
                }


            });


        }







        this.closeAccord();
        const virtualDomObj = {
            name: name,
            html: newDom
        }

        let changedVirtualDom = [];

        newVirtualDom.forEach(item => {
            if(item.name === name){
                changedVirtualDom.push(virtualDomObj);
            }
            else{
                changedVirtualDom.push(item);
            }

        })


        this.props.virtualDomChanged(changedVirtualDom);
    }

    addService = (e) => {
        e.preventDefault();
        const {services} = this.state;
        const index = services.length;

        let title = null;
        let text = null;
        let number = null;
        let img = null;

        if(services[0].title !== null){
            title = 'Заголовок услуги';
        }
        if(services[0].text !== null){
            text = 'Текст услуги';
        }
        if(services[0].number !== null){
            number = index;
        }
        if(services[0].img !== null){
            img = '../images/default.jpg';
        }


        const newService = {
            index: index,
            text: text,
            title: title,
            img: img,
            number: number
        };

        this.setState(({services}) =>{
            const newServices = [...services, newService];
            return{
                services: newServices

            }
        })
    }

    deleteService = (e, index) => {
        e.preventDefault();

        const {services} = this.state;
        if(services.length < 2){
            UIkit.modal.alert("Вы не можете удалить последнюю услугу!", {labels: {ok: "Ok"}})
        }
        else {
            UIkit.modal.confirm("Вы действительно хотите удалить данный элемент? " +
                "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

                .then(() => {
                    this.setState(({services}) => {

                        const newServices = [
                            ...services.slice(0, index),
                            ...services.slice(index + 1)
                        ];
                        //console.log(newSlides);
                        newServices.forEach((item, j) => {
                            item.index = j;
                        });
                        return {
                            services: newServices
                        }
                    })
                })
                .then(() => {
                    UIkit.modal("#service-modal").show();
                })
        }
    }

    changeServiceNumber = (e, index) => {
        this.setState(({services}) => {
            let newElem = {
                index: services[index].index,
                text: services[index].text,
                title: services[index].title,
                number: e.target.value,
                img: services[index].img
            }
            let newServices = [
                ...services.slice(0, index),
                newElem,
                ...services.slice(index+1)
            ];

            return{
                services: newServices
            }

        })
    }

    changeServiceImg = (e) => {
        if(e.target.files && e.target.files[0]) {
            let formData = new FormData();
            formData.append("image", e.target.files[0]);

            fetch('../api/uploadImage.php', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then((res) => {
                    this.setState(({services}) => {

                        const newSlide = services[+index];
                        let newElem = {
                            index: newSlide.index,
                            text: newSlide.text,
                            title: newSlide.title,
                            number: newSlide.number,
                            img: `../userDir/images/${res}`
                        }
                        let newServices = [
                            ...services.slice(0, index),
                            newElem,
                            ...services.slice(index+1)
                        ];


                        return{
                            services: newServices
                        }
                    })
                })
                .catch(() => this.showNotifications('Ошибка сохранения', 'danger'))
        }
    }

    changeServiceText = (e, index) => {
        this.setState(({services}) => {
            let newElem = {
                index: services[index].index,
                text: e.target.value,
                title: services[index].title,
                number: services[index].number,
                img: services[index].img
            }
            let newServices = [
                ...services.slice(0, index),
                newElem,
                ...services.slice(index+1)
            ];

            return{
                services: newServices
            }

        })
    }

    changeServiceTitle = (e, index) => {
        this.setState(({services}) => {
            let newElem = {
                index: services[index].index,
                text: services[index].text,
                title: e.target.value,
                number: services[index].number,
                img: services[index].img
            }
            console.log(newElem);
            let newServices = [
                ...services.slice(0, index),
                newElem,
                ...services.slice(index+1)
            ];

            return{
                services: newServices
            }

        })
    }

    deleteGeneralImg = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить изображение? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({serviceImg}) => {
                    return {
                        serviceImg: null
                    }
                })
            })
            .then(() => {UIkit.modal("#service-modal").show();})
    }

    changeGeneralImg = (e) => {
        if(e.target.files && e.target.files[0]){
            let formData = new FormData();
            formData.append("image", e.target.files[0]);

            fetch('../api/uploadImage.php', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then((res) => {
                    this.setState(({serviceImg}) => {

                        const newImg = `../userDir/images/${res}`;
                        return {
                            serviceImg: newImg

                        }
                    })
                })
                .catch(() => this.showNotifications('Ошибка сохранения', 'danger'))

        }
    }

    deleteGeneralText = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить общий текст? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({serviceText}) => {
                    return {
                        serviceText: null
                    }
                })
            })
            .then(() => {UIkit.modal("#service-modal").show();})
    }

    changeGeneralText = (e) => {
        this.setState(({serviceText}) => {
            return {
                serviceText: e.target.value
            }
        });
    }

    deleteGeneralTitle = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить общий заголовок? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({serviceTitle}) => {
                    return {
                        serviceTitle: null
                    }
                })
            })
            .then(() => {UIkit.modal("#service-modal").show();})
    }
    changeGeneralHeader = (e) => {
        this.setState(({serviceTitle}) => {
            return {
                serviceTitle: e.target.value
            }
        });
    }

    closeAccord = () => {

        const accordBlock = document.querySelector('.service-dialog');
        const links = accordBlock.querySelectorAll('.uk-accordion-title');
        const accords = accordBlock.querySelectorAll('li');

        accords.forEach((accord, i) => {
            if(accord.classList.contains('uk-open')){
                links[i].click();
            }


        });
    };
    getServiceInfo = () => {
        const newDom = document.querySelector('iframe');

        let serviceTitle = null;
        let serviceText = null;
        let serviceImg = null;
        let services  = null;


        const mainTitleHtml = newDom.contentDocument.querySelector('.service-title');
        if(mainTitleHtml){
            serviceTitle = mainTitleHtml.innerHTML;
        }

        const mainTextHtml = newDom.contentDocument.querySelector('.service-content');
        if(mainTextHtml){
            serviceText = mainTextHtml.innerHTML;
        }
        const mainImgHtml = newDom.contentDocument.querySelector('.service-wrapper__img img');
        if(mainImgHtml){
            serviceImg = mainImgHtml.getAttribute('src');
        }

        const serviceSlider = newDom.contentDocument.querySelector('.service-slider');
        const serviceAccordion = newDom.contentDocument.querySelector('.service-wrapper__accordion');


        if(serviceSlider){

            services = [];

            const slides = serviceSlider.querySelectorAll('.service-slider-item');

            slides.forEach((item, i) => {

                let img = null;
                let title = null;
                let text = null;
                let number = null;

                const imgHtml = item.querySelector('.service-img img');
                if(imgHtml){
                    img = imgHtml.getAttribute('src');
                }
                const titleHtml = item.querySelector('.service-heading');
                if(titleHtml){
                    title = titleHtml.innerHTML;
                }
                const textHtml = item.querySelector('.service-text');
                if(textHtml){
                    text = textHtml.innerHTML;
                }
                const numberHtml = item.querySelector('.service-number');
                if(numberHtml){
                    number = numberHtml.innerHTML;
                }


                let newServiceItem = {
                    index: i,
                    img: img,
                    title: title,
                    text: text,
                    number: number
                }
                services.push(newServiceItem);

            });


        }

        if(serviceAccordion){

            services = [];
            const slidesTitle = serviceAccordion.querySelectorAll('.service-heading span');
            const slidesText = serviceAccordion.querySelectorAll('.service-text p');

            slidesTitle.forEach((item, i) => {

                let img = null;
                let title = null;
                let text = null;
                let number = null;


                title = item.innerHTML;
                text = slidesText[i].innerHTML;

                let newServiceItem = {
                    index: i,
                    img: img,
                    title: title,
                    text: text,
                    number: number
                }
                services.push(newServiceItem);

            });

        }


        this.setState(() =>{
            return{
                serviceTitle: serviceTitle,
                serviceText: serviceText,
                serviceImg: serviceImg,
                services: services

            }
        })
    }


    render() {
        const {serviceTitle, serviceText, serviceImg, services} = this.state;
        const {target, modal} = this.props;


        let service = '';

        if(services && services.length > 0){


            let serviceTitleInput = '';
            let serviceTextInput = '';
            let serviceImgInput = '';
            let servicesStr = '';

            if(serviceTitle !==null){
                serviceTitleInput = <div>
                    <div className="uk-form-label">Общий заголовок</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeGeneralHeader(e)}} className="uk-input main-heading" type="text" placeholder={serviceTitle} value={serviceTitle}/>
                    </div>
                    {/*<button onClick={(e) => {this.deleteGeneralTitle(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить общий заголовок</button>*/}

                </div>;

            }
            else{
                serviceTitleInput = '';
            }

            if(serviceText !==null){
                serviceTextInput = <div>
                    <div className="uk-form-label">Общий текст</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeGeneralText(e)}} className="uk-input main-heading" type="text" placeholder={serviceText} value={serviceText}/>
                    </div>
                    <button onClick={(e) => {this.deleteGeneralText(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить общий текст</button>
                </div>;

            }
            else{
                serviceTextInput = '';
            }
            if(serviceImg !==null){
                serviceImgInput = <div>
                    <div className="uk-form-label">Изображение</div>
                    <div className="uk-card-media-top">
                        <img src={serviceImg} alt=""/>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-form-label">Изображение</div>
                        <div>
                            <input onChange={(e) => {this.changeGeneralImg(e)}} type="file"/>
                        </div>
                    </div>
                    <button onClick={(e) => {this.deleteGeneralImg(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить изображение</button>
                </div>;

            }
            else{
                serviceImgInput = '';
            }


            if(services.length > 0){

                let servicesTitleStr = '';
                let serviceTextStr = '';
                let serviceImgStr = '';
                let serviceNumberStr = '';


                servicesStr = services.map((item, index)=> {
                    if(item.title !== null){
                        servicesTitleStr = <div className="uk-margin">
                            <input onChange={(e) => {this.changeServiceTitle(e, index)}} className="uk-input main-heading" type="text" placeholder={item.title} value={item.title} />
                        </div>
                    }
                    else{
                        servicesTitleStr = '';
                    }
                    if(item.text !== null){

                        serviceTextStr = <div className="uk-margin">
                            <textarea onChange={(e) => {this.changeServiceText(e, index)}} className="uk-textarea" type="text" placeholder={item.text} value={item.text} />
                        </div>
                    }
                    else{
                        serviceTextStr = '';
                    }
                    if(item.img !== null){
                        serviceImgStr = <div>
                            <div className="uk-form-label">Изображение</div>
                            <div className="uk-card-media-top">
                                <img src={item.img} alt=""/>
                            </div>
                            <div className="uk-margin">
                                <div className="uk-form-label">Изображение</div>
                                <div>
                                    <input onChange={(e) => {this.changeServiceImg(e)}} type="file"/>
                                </div>
                            </div>

                        </div>;
                    }
                    else{
                        serviceImgStr = '';
                    }
                    if(item.number !== null){
                        serviceNumberStr = <div className="uk-margin">
                            <input onChange={(e) => {this.changeServiceNumber(e, index)}} className="uk-input main-heading" type="text" placeholder={item.number} value={item.number} />
                        </div>
                    }
                    else{
                        serviceNumberStr = '';
                    }
                    return <div key={index}>
                        <div className="uk-card uk-card-default">
                            <div className="uk-card-body">
                                <form>
                                    <fieldset className="uk-fieldset">
                                        <div className="uk-form-label">Услуга {index+1}</div>
                                        {serviceImgStr}
                                        {serviceNumberStr}
                                        {servicesTitleStr}
                                        {serviceTextStr}
                                    </fieldset>
                                    <button onClick={(e) => {this.deleteService(e, index)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить элемент</button>
                                </form>
                            </div>
                        </div>
                    </div>;

                });
            }
            else{
                servicesStr = '';
            }



            service =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {serviceTitleInput}
                    {serviceTextInput}
                    {serviceImgInput}
                    {servicesStr}
                    <p className="uk-text-right">

                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {this.saveServiceChange(e)}}>Сохранить изменения</button>
                        <button className="uk-button uk-margin-left uk-button-default" type="button" onClick={(e) => {this.addService(e)}}>Добавить услугу</button>
                    </p>
                </div>
            ;
        }
        else{
            service = 'На сайте нет секции Преимущества';
        }
        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Настройка секции Услуги  </h2>

                    <ul uk-accordion="true" className="service-dialog">
                        <li>
                            <a className="uk-accordion-title" onClick={this.getServiceInfo} href="#">Услуги</a>
                            <div className="uk-accordion-content">
                                {service}
                            </div>
                        </li>

                    </ul>

                    <p className="uk-text-right">
                        <button className="uk-button uk-button-default uk-margin-small-right uk-modal-close" type="button">Выйти</button>

                    </p>

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        virtualDom: state.virtualDom
    }
};

const mapDispatchToProps = {
    virtualDomChanged
}
export default connect(mapStateToProps, mapDispatchToProps)(ServiceModal);