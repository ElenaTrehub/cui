import React, {Component} from 'react';
import {connect} from "react-redux";

import DOMHelper from "../../helpers/dom-helper";
import HtmlObjectTransform from "../../helpers/htmlObjectTransform";
import EditorText from "../editor-text";
import EditorImages from "../editor-images";
import {
    virtualDomLoaded,
    virtualDomChanged
} from "../../actions";
import UIkit from "uikit";

class SliderModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
            mainSlider: {
                isMiddleBlock: false,
                slides: [],
                generalTitle: null,
                generalText: null
            }
        };

    }







    saveMainSliderChange = (e) => {
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

        const slides = newDom.querySelectorAll('.main-slider-item');
        const slider = newDom.querySelector('.main-slider');

        const iframeSlides = iframe.contentDocument.querySelectorAll('.main-slider-item');
        const iframeSlider = iframe.contentDocument.querySelector('.main-slider');


        let middleWrapper = null;
        let generalTitle = '';
        let generalText = '';



        if(this.state.mainSlider.isMiddleBlock){

            if(newDom.querySelector('.main-middle')){
                middleWrapper = newDom.querySelector('.main-middle');

                generalTitle = middleWrapper.querySelector('.main-heading');
                generalText = middleWrapper.querySelector('.main-text');



                let iframeMiddleWrapper = null;
                let iframeGeneralTitle = '';
                let iframeGeneralText = '';

                if(iframe.contentDocument.querySelector('.main-middle')){
                    iframeMiddleWrapper = iframe.contentDocument.querySelector('.main-middle');

                    iframeGeneralTitle = iframeMiddleWrapper.querySelector('.main-heading');
                    iframeGeneralText = iframeMiddleWrapper.querySelector('.main-text');

                    if(iframeMiddleWrapper && this.state.mainSlider.generalTitle ===null && this.state.mainSlider.generalText ===null){
                        iframeMiddleWrapper.remove();
                    }
                    if(iframeMiddleWrapper && this.state.mainSlider.generalTitle !==null && this.state.mainSlider.generalText ===null){
                        iframeGeneralText.remove();
                    }
                    if(iframeMiddleWrapper && this.state.mainSlider.generalTitle ===null && this.state.mainSlider.generalText !==null){
                        iframeGeneralTitle.remove();
                    }

                    if(this.state.mainSlider.generalTitle){
                        console.log(this.state.mainSlider.generalTitle);
                        iframeMiddleWrapper.querySelector('.main-heading').innerText = '';
                            iframeMiddleWrapper.querySelector('.main-heading').innerText = this.state.mainSlider.generalTitle;
                    }

                    if(this.state.mainSlider.generalText){
                        iframeMiddleWrapper.querySelector('.main-text').innerText = this.state.mainSlider.generalText;
                    }
                }




                if(middleWrapper && this.state.mainSlider.generalTitle ===null && this.state.mainSlider.generalText ===null){
                    middleWrapper.remove();
                }
                if(middleWrapper && this.state.mainSlider.generalTitle !==null && this.state.mainSlider.generalText ===null){
                    generalText.remove();
                }
                if(middleWrapper && this.state.mainSlider.generalTitle ===null && this.state.mainSlider.generalText !==null){
                    generalTitle.remove();
                }

                if(this.state.mainSlider.generalTitle){
                    generalTitle.innerText = '';
                    generalTitle.innerText = this.state.mainSlider.generalTitle;
                }

                if(this.state.mainSlider.generalText){
                    generalText.innerText = '';
                    generalText.innerText = this.state.mainSlider.generalText;
                }
            }




        }

        const indicatorsWrapper = iframe.contentDocument.querySelectorAll('.carousel-indicators');
        const indicators = iframe.contentDocument.querySelectorAll('.carousel-indicators li');

        if(this.state.mainSlider.slides.length < slides.length){

            slides.forEach((slideItem, i) => {
                if(i >= this.state.mainSlider.slides.length){
                    slideItem.remove();
                }

            });
            indicators.forEach((indicator, i) => {
                if(i >= this.state.mainSlider.slides.length){
                    indicator.remove();
                }

            });

            iframeSlides.forEach((slideItem, j) => {
                if(j >= this.state.mainSlider.slides.length){
                    const itemWidth = parseInt(slideItem.style.width);

                    iframeSlider.style.width = `${parseInt(iframeSlider.style.width) - 100}%`;
                    const transValue = itemWidth*(iframeSlides.length-1);

                    iframeSlider.style.transform = `translateX(${transValue})`;

                    slideItem.remove();
                }

            });

        }

        if(this.state.mainSlider.slides.length > slides.length){


            this.state.mainSlider.slides.forEach((slideItem, i) => {
                if(i >= slides.length){
                    const newSlide = slides[0].cloneNode(true);
                    slider.appendChild(newSlide);
                }

            });

            this.state.mainSlider.slides.forEach((indicator, i) => {
                if(i >= indicators.length){
                    const newIndicator = indicators[1].cloneNode(true);
                    indicatorsWrapper.appendChild(newIndicator);
                }

            });

            this.state.mainSlider.slides.forEach((slideItem, j) => {
                if(j >= iframeSlides.length){
                    const newSlide = slides[0].cloneNode(true);
                    const itemWidth = parseInt(slides[0].style.width);

                    iframeSlider.style.width = `${parseInt(iframeSlider.style.width) + 100}%`;
                    const transValue = itemWidth*(iframeSlides.length+1);

                    iframeSlider.style.transform = `translateX(${transValue})`;

                    iframeSlider.appendChild(newSlide);
                }

            });

        }
        const slidesAfter = newDom.querySelectorAll('.main-slider-item');

        const iframeSlidesAfter = iframe.contentDocument.querySelectorAll('.main-slider-item');

        slidesAfter.forEach((slideItem, i) => {

            slideItem.querySelector('img').setAttribute('src', this.state.mainSlider.slides[i].img);
            if(this.state.mainSlider.slides[i].heading){
                slideItem.querySelector('.main-heading').innerHTML = this.state.mainSlider.slides[i].heading;
            }
            if(this.state.mainSlider.slides[i].text){
                slideItem.querySelector('.main-text').innerHTML = this.state.mainSlider.slides[i].text;
            }


        });


        iframeSlidesAfter.forEach((slideItem, j) => {

            slideItem.querySelector('img').setAttribute('src', this.state.mainSlider.slides[j].img);
            if(this.state.mainSlider.slides[j].heading) {
                slideItem.querySelector('.main-heading').innerHTML = this.state.mainSlider.slides[j].heading;
            }
            if(this.state.mainSlider.slides[j].text) {
                slideItem.querySelector('.main-text').innerHTML = this.state.mainSlider.slides[j].text;
            }

        });
        //const imagesList = document.querySelectorAll(`div[data-slides]`);
        //this.state.mainSlider.slides.forEach((item, i) => {

            //imagesList[i].querySelector(`.main-heading`).value = '';
            //imagesList[i].querySelector(`.main-text`).value = '';

        //});

        iframe.contentWindow.document.body.querySelector('script').remove();
        const script = document.createElement('script');
        script.setAttribute('src', 'main.js');
        iframe.contentWindow.document.body.append(script);

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
    };




    addMainSlide = (e) => {
        e.preventDefault();

        const index = this.state.mainSlider.slides.length;

        let img = '../images/default.jpg';
        let text = null;
        let heading = null;


        if(this.state.mainSlider.slides[0].text !== null){
            text = 'Текст слайда.';
        }
        if(this.state.mainSlider.slides[0].heading !== null){
            heading = 'Заголовок слайда';
        }


        const newSlide = {
            index: index,
            img: img,
            heading: heading,
            text: text
        };

        this.setState(({mainSlider}) =>{
            const newMainSlides = [...mainSlider.slides, newSlide];
            return{
                mainSlider: {
                    ...mainSlider,
                    slides: newMainSlides
                }



            }
        })

    };

    closeAccord = () => {

        const accordBlock = document.querySelector('.slide-dialog');
        const links = accordBlock.querySelectorAll('.uk-accordion-title');
        const accords = accordBlock.querySelectorAll('li');

        accords.forEach((accord, i) => {
            if(accord.classList.contains('uk-open')){
                links[i].click();
            }


        });
    };

    addGeneralTitle = (e)=> {
        const prom = new Promise((resolve)=>{

            resolve();
        });
        prom.then(() => {

            this.setState(({mainSlider}) => {

                return{
                    mainSlider: {
                        ...mainSlider,
                        generalTitle: 'Новый общий заголовок'
                    }

                }
            });
        })
            .then(() => {
                UIkit.modal("#slider-modal").show();
            })

    }

    addGeneralText = (e)=> {
        const prom = new Promise((resolve)=>{

            resolve();
        });
        prom.then(() => {
            console.log('add');
            this.setState(({mainSlider}) => {

                return{
                    mainSlider: {
                        ...mainSlider,
                        generalText: 'Новый общий текст'
                    }

                }
            });
        })
            .then(() => {
                UIkit.modal("#slider-modal").show();
            })

    }

    deleteGeneralTitle = (e)=>{
        e.preventDefault();

        UIkit.modal.confirm("Вы действительно хотите удалить общий заголовок? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({mainSlider}) => {
                    let newMainSlider = {
                        ...mainSlider,
                        generalTitle: null
                    }
                    return{
                        mainSlider: newMainSlider
                    }
                });
            })
            .then(() => {UIkit.modal("#slider-modal").show();})
    }

    deleteGeneralText = (e)=>{
        e.preventDefault();

            UIkit.modal.confirm("Вы действительно хотите удалить общий текст? " +
                "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

                .then(() => {
                    this.setState(({mainSlider}) => {
                        let newMainSlider = {
                            ...mainSlider,
                            generalText: null
                        }
                        return{
                            mainSlider: newMainSlider
                        }
                    });
                })
                .then(() => {UIkit.modal("#slider-modal").show();})




    }

    deleteMainSlide = (e, index) => {

        e.preventDefault();
        if(this.state.mainSlider.slides.length < 2){
            UIkit.modal.alert("Вы не можете удалить последний слайд!", {labels: {ok: "Ok"}})
        }
        else{
            UIkit.modal.confirm("Вы действительно хотите удалить данный слайд? " +
                "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

                .then(() => {
                    this.setState(({mainSlider}) => {

                        const newSlides = [
                            ...mainSlider.slides.slice(0, index),
                            ...mainSlider.slides.slice(index+1)
                        ];
                        //console.log(newSlides);
                        newSlides.forEach((slideItem, j) => {
                            slideItem.index = j;
                        });
                        return {
                            mainSlider: {
                                ...mainSlider,
                                slides: newSlides
                            }
                        }
                    })
                })
                .then(() => {UIkit.modal("#slider-modal").show();})

        }
    };

    changeText = (e, index) => {
        this.setState(({mainSlider}) => {
            const newSlide = mainSlider.slides[index];
            newSlide.text = e.target.value;
            return {
                mainSlider: {
                    ...mainSlider,
                    slides: [
                        ...mainSlider.slice(0, index),
                        newSlide,
                        ...mainSlider.slice(index+1)
                    ]

                }
            }
        })
    };

    changeHeader = (e, index) => {

        this.setState(({mainSlider}) => {
            const newSlide = {
                ...mainSlider.slides[index],
                heading: e.target.value
            };

            return {
                mainSlider: {
                    ...mainSlider,
                    slides: [
                        ...mainSlider.slice(0, index),
                        newSlide,
                        ...mainSlider.slice(index+1)
                    ]
                }

            }
        })
    };

    changeImage = (e, index) => {

        if(e.target.files && e.target.files[0]){
            let formData = new FormData();
            formData.append("image", e.target.files[0]);

            fetch('../api/uploadImage.php', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then((res) => {
                    this.setState(({mainSlider}) => {

                        const newSlide = mainSlider.slides[+index];
                        newSlide.img = `../userDir/images/${res}`;

                        const images = document.querySelectorAll(`img[data-images]`);
                        let img = '';
                        images.forEach((item) => {
                            if (item.getAttribute('data-images') == index) {
                                img = item;
                            }
                        });
                        //console.log(img);
                        img.setAttribute('src', newSlide.img);
                        return {
                            mainSlider: {
                                ...mainSlider,
                                slides: [
                                    ...mainSlider.slides.slice(0, index),
                                    newSlide,
                                    ...mainSlider.slides.slice(index+1)
                                ]
                            }

                        }
                    })
                })
                .catch(() => this.showNotifications('Ошибка сохранения', 'danger'))






        }



    };

    changeGeneralHeader = (e) => {
        this.setState(({mainSlider}) => {
            let newMainSlider = {
                ...mainSlider,
                generalTitle: e.target.value
            }
            return{
                mainSlider: newMainSlider
            }
        });
    }

    changeGeneralText = (e) => {
        this.setState(({mainSlider}) => {
            let newMainSlider = {
                ...mainSlider,
                generalText: e.target.value
            }
            return{
                mainSlider: newMainSlider
            }
        });
    }

    getMainSlidesInfo = () => {
        const slides = this.getSlides('.main-slider-item');

        const newDom = document.querySelector('iframe');
        const generalWrapper = newDom.contentDocument.querySelector('.main-middle');
        let generalTitle = '';
        let generalText = '';
        let isMiddleBlock = false;
        if(generalWrapper){
            isMiddleBlock = true;
            generalTitle = generalWrapper.querySelector('.main-heading');
            generalText = generalWrapper.querySelector('.main-text');
        }


        let generalTitleStr = '';
        let generalTextStr = '';

        if(generalTitle){
            generalTitleStr = generalTitle.innerHTML;
        }
        else{
            generalTitleStr = null;
        }

        if(generalText){
            generalTextStr = generalText.innerHTML;
        }
        else{
            generalTextStr = null;
        }

        const mainSliderItems = [];
        slides.forEach((slideItem, i) => {
            const slide = {};
            slide.index = i;
            slide.img = slideItem.querySelector('img').getAttribute('src');

            if(slideItem.querySelector('.main-heading')){
                slide.heading = slideItem.querySelector('.main-heading').innerHTML;
            }
            else{
                slide.heading = null;
            }

            if(slideItem.querySelector('.main-text')){
                slide.text = slideItem.querySelector('.main-text').innerHTML;
            }
            else{
                slide.text = null;
            }


            mainSliderItems.push(slide);
        });


        this.setState(({mainSlides}) =>{

            const newMainSlider = {
                slides: mainSliderItems,
                generalTitle: generalTitleStr,
                generalText: generalTextStr,
                isMiddleBlock: isMiddleBlock
            }
            return{
                mainSlider: newMainSlider

            }
        })
    }

    getSlides = (str) => {
        const newDom = document.querySelector('iframe');

        const slides = newDom.contentDocument.querySelectorAll(str);
        return slides;
    }


    render() {
        const {target, modal} = this.props;
        const {slides, generalTitle, generalText, isMiddleBlock} = this.state.mainSlider;

        let mainSlider = '';

        if(slides.length > 0){
            const slidesHtml = slides.map((item, index)=> {

                let inputHeading = '';
                let inputText = '';


                if(item.heading !== null){
                    inputHeading = <div><div className="uk-form-label">Заголовок слайда</div>
                        <div className="uk-margin">
                            <input onChange={(e) => {this.changeHeader(e, index)}} className="uk-input main-heading" type="text" placeholder={item.heading} />
                        </div>
                    </div>;
                }
                else{
                    inputHeading = '';
                }

                if(item.text !== null){
                    inputText = <div>
                        <div className="uk-form-label">Текст слайда</div>
                        <div className="uk-margin">
                            <textarea onChange={(e) => {this.changeText(e, index)}} className="uk-textarea main-text" rows="5" placeholder={item.text}></textarea>
                        </div>

                    </div>
                }
                else{
                    inputText= '';
                }

                return <div key={index} data-slides={index}>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title">Слайд {index+1}</h3>
                        <div className="uk-card-media-top">
                            <img data-images={index} src={item.img} alt=""/>
                        </div>
                        <div className="uk-card-body">
                            <form>
                                <fieldset className="uk-fieldset">
                                    {inputHeading}
                                    {inputText}
                                    <div className="uk-margin">
                                        <div className="uk-form-label">Изображение</div>
                                        <div>
                                            <input onChange={(e) => {this.changeImage(e, index)}} type="file"/>
                                        </div>
                                    </div>


                                </fieldset>
                                <button onClick={(e) => {this.deleteMainSlide(e, index)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить слайд</button>
                            </form>
                        </div>
                    </div>
                </div>;

            });

            let generalTitleInput = '';
            let generalTextInput = '';

            let generalTitleButton = '';
            let generalTextButton = '';

            if(isMiddleBlock){
                if(generalTitle !== null){
                    generalTitleInput = <div>
                        <div className="uk-form-label">Общий заголовок</div>
                        <div className="uk-margin">
                            <input onChange={(e) => {this.changeGeneralHeader(e)}} className="uk-input main-heading" type="text" placeholder={generalTitle} />
                        </div>
                        <button onClick={(e) => {this.deleteGeneralTitle(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить общий заголовок</button>
                    </div>;
                    generalTitleButton = '';
                }
                else{
                    generalTitleInput = '';
                    generalTitleButton = <button className="uk-button uk-margin-left uk-button-default" type="button" onClick={(e) => {this.addGeneralTitle(e)}}>Добавить общий заголовок</button>
                }
                if(generalText !== null){
                    generalTextInput = <div><div className="uk-form-label">Общий текст</div>
                        <div className="uk-margin">
                            <textarea rows='5' cols='4' onChange={(e) => {this.changeGeneralText(e)}} className="uk-input main-heading" type="text" placeholder={generalText} ></textarea>
                        </div>
                        <button onClick={(e) => {this.deleteGeneralText(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить общий текст</button>
                    </div>;
                    generalTextButton = '';
                }
                else{
                    generalTextInput = '';
                    generalTextButton = <button className="uk-button uk-margin-left uk-button-default" type="button" onClick={(e) => {this.addGeneralText(e)}}>Добавить общий текст</button>

                }
            }


            mainSlider =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {slidesHtml}
                    {generalTitleInput}
                    {generalTextInput}
                    <p className="uk-text-right">
                        {generalTitleButton}
                        {generalTextButton}
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {this.saveMainSliderChange(e)}}>Сохранить изменения</button>
                        <button className="uk-button uk-margin-left uk-button-default" type="button" onClick={(e) => {this.addMainSlide(e)}}>Добавить новый слайд</button>
                    </p>
                </div>
            ;
        }
        else{
            mainSlider = 'На сайте нет основного слайдера';
        }



        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Настройка слайдера</h2>

                    <ul uk-accordion="true" className="slide-dialog">
                        <li>
                            <a className="uk-accordion-title" onClick={this.getMainSlidesInfo} href="#">Основной слайдер</a>
                            <div className="uk-accordion-content">
                                {mainSlider}
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

    virtualDomLoaded,
    virtualDomChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(SliderModal);