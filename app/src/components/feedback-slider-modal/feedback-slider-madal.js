import React, {Component} from 'react';
import {connect} from "react-redux";

import DOMHelper from "../../helpers/dom-helper";
import HtmlObjectTransform from "../../helpers/htmlObjectTransform";
import EditorText from "../editor-text";
import EditorImages from "../editor-images";
import {
    virtualDomLoaded
} from "../../actions";
import UIkit from "uikit";

class FeedbackSliderModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
            mainSlides: [],
            feedbackSlides: []
        };
        this.getMainSlidesInfo = this.getMainSlidesInfo.bind(this);
        this.getFeedbackSlidesInfo = this.getFeedbackSlidesInfo.bind(this);
        this.getSlides = this.getSlides.bind(this);
    }

    changeHeader = (e, index) => {

        this.setState(({mainSlides}) => {
            const newSlide = {
                ...mainSlides[index],
                heading: e.target.value
            };

            return {
                mainSlides: [
                    ...mainSlides.slice(0, index),
                    newSlide,
                    ...mainSlides.slice(index+1)
                ]
            }
        })
    };
    changeFeedbackHeader = (e, index) => {

        this.setState(({feedbackSlides}) => {
            const newSlide = {
                ...feedbackSlides[index],
                heading: e.target.value
            };

            return {
                feedbackSlides: [
                    ...feedbackSlides.slice(0, index),
                    newSlide,
                    ...feedbackSlides.slice(index+1)
                ]
            }
        })
    };
    changeText = (e, index) => {
        this.setState(({mainSlides}) => {
            const newSlide = mainSlides[index];
            newSlide.text = e.target.value;
            return {
                mainSlides: [
                    ...mainSlides.slice(0, index),
                    newSlide,
                    ...mainSlides.slice(index+1)
                ]
            }
        })
    };
    changeFeedbackText = (e, index) => {
        this.setState(({feedbackSlides}) => {
            const newSlide = feedbackSlides[index];
            newSlide.text = e.target.value;
            return {
                feedbackSlides: [
                    ...feedbackSlides.slice(0, index),
                    newSlide,
                    ...feedbackSlides.slice(index+1)
                ]
            }
        })
    };
    changeFeedbackAddress = (e, index) => {

        this.setState(({feedbackSlides}) => {
            const newSlide = {
                ...feedbackSlides[index],
                adress: e.target.value
            };

            return {
                feedbackSlides: [
                    ...feedbackSlides.slice(0, index),
                    newSlide,
                    ...feedbackSlides.slice(index+1)
                ]
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
                    this.setState(({mainSlides, mainSlider}) => {
                        const newSlide = mainSlides[index];
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
                            mainSlides: [
                                ...mainSlides.slice(0, index),
                                newSlide,
                                ...mainSlides.slice(index+1)
                            ]
                        }
                    })
                })
                .catch(() => this.showNotifications('Ошибка сохранения', 'danger'))






        }



    };
    changeFeedbackImage = (e, index) => {
        if(e.target.files && e.target.files[0]){
            let formData = new FormData();
            formData.append("image", e.target.files[0]);

            fetch('../api/uploadImage.php', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then((res) => {
                    this.setState(({feedbackSlides}) => {
                        const newSlide = feedbackSlides[index];
                        newSlide.img = `../userDir/images/${res}`;

                        const images = document.querySelectorAll(`img[data-feedback-images]`);
                        let img = '';
                        images.forEach((item) => {
                            if (item.getAttribute('data-feedback-images') == index) {
                                img = item;
                            }
                        });
                        //console.log(img);
                        img.setAttribute('src', newSlide.img);
                        return {
                            feedbackSlides: [
                                ...feedbackSlides.slice(0, index),
                                newSlide,
                                ...feedbackSlides.slice(index+1)
                            ]
                        }
                    })
                })
                .catch(() => this.showNotifications('Ошибка сохранения', 'danger'))

        }
    };
    addMainSlide = (e) => {
        e.preventDefault();
        //e.stopPropagation();
        //console.log('add slide');
        const index = this.state.mainSlides.length;
        const newSlide = {
            index: index,
            img: '../images/default.jpg',
            heading: 'Заголовок слайда',
            text: 'Текст слайда.'
        };

        this.setState(({mainSlider, mainSlides}) =>{
            const newMainSlides = [...mainSlides, newSlide];
            return{
                mainSlides: newMainSlides


            }
        })

    };
    addFeedbackSlide = (e) => {
        e.preventDefault();

        const index = this.state.feedbackSlides.length;
        const newSlide = {
            index: index,
            img: '../images/default.jpg',
            heading: 'Заголовок слайда',
            text: 'Текст слайда.'
        };

        this.setState(({feedbackSlides}) =>{
            const newFeedbackSlides = [...feedbackSlides, newSlide];
            return{
                feedbackSlides: newFeedbackSlides


            }
        })

    };
    saveMainSliderChange = (e) => {
        const newDom = this.props.virtualDom.cloneNode(this.props.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        DOMHelper.unwrapImages(newDom);
        //let iframeFromHTML =  HtmlObjectTransform.getObjectIframeFromHtml(newDom);
        const slides = newDom.querySelectorAll('.main-slider-item');
        const slider = newDom.querySelector('.main-slider');

        const iframe = document.querySelector('iframe');
        const iframeSlides = iframe.contentDocument.querySelectorAll('.main-slider-item');
        const iframeSlider = iframe.contentDocument.querySelector('.main-slider');

        const indicatorsWrapper = iframe.contentDocument.querySelectorAll('.carousel-indicators');
        const indicators = iframe.contentDocument.querySelectorAll('.carousel-indicators li');

        if(this.state.mainSlides.length < slides.length){

            slides.forEach((slideItem, i) => {
                if(i >= this.state.mainSlides.length){
                    slideItem.remove();
                }

            });
            indicators.forEach((indicator, i) => {
                if(i >= this.state.mainSlides.length){
                    indicator.remove();
                }

            });

            iframeSlides.forEach((slideItem, j) => {
                if(j >= this.state.mainSlides.length){
                    const itemWidth = parseInt(slideItem.style.width);

                    iframeSlider.style.width = `${parseInt(iframeSlider.style.width) - 100}%`;
                    const transValue = itemWidth*(iframeSlides.length-1);

                    iframeSlider.style.transform = `translateX(${transValue})`;

                    slideItem.remove();
                }

            });

        }

        if(this.state.mainSlides.length > slides.length){


            this.state.mainSlides.forEach((slideItem, i) => {
                if(i >= slides.length){
                    const newSlide = slides[0].cloneNode(true);
                    slider.appendChild(newSlide);
                }

            });

            this.state.mainSlides.forEach((indicator, i) => {
                if(i >= indicators.length){
                    const newIndicator = indicators[1].cloneNode(true);
                    indicatorsWrapper.appendChild(newIndicator);
                }

            });

            this.state.mainSlides.forEach((slideItem, j) => {
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

            slideItem.querySelector('img').setAttribute('src', this.state.mainSlides[i].img);
            slideItem.querySelector('.main-heading').innerHTML = this.state.mainSlides[i].heading;
            slideItem.querySelector('.main-text').innerHTML = this.state.mainSlides[i].text;

        });


        iframeSlidesAfter.forEach((slideItem, j) => {
            //console.log(this.state.mainSlides[j]);
            slideItem.querySelector('img').setAttribute('src', this.state.mainSlides[j].img);
            slideItem.querySelector('.main-heading').innerHTML = this.state.mainSlides[j].heading;
            slideItem.querySelector('.main-text').innerHTML = this.state.mainSlides[j].text;

        });
        const imagesList = document.querySelectorAll(`div[data-slides]`);
        this.state.mainSlides.forEach((item, i) => {

            imagesList[i].querySelector(`.main-heading`).value = '';
            imagesList[i].querySelector(`.main-text`).value = '';

        });

        iframe.contentWindow.document.body.querySelector('script').remove();
        const script = document.createElement('script');
        script.setAttribute('src', 'main.js');
        iframe.contentWindow.document.body.append(script);

        this.closeAccord();

        this.props.virtualDomLoaded(newDom);
    };
    saveFeedbackSliderChange = (e) => {
        const newDom = this.props.virtualDom.cloneNode(this.props.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        DOMHelper.unwrapImages(newDom);
        //let iframeFromHTML =  HtmlObjectTransform.getObjectIframeFromHtml(newDom);
        const slides = newDom.querySelectorAll('.feedback-slider-item');
        const slider = newDom.querySelector('.feedback-slider');

        const iframe = document.querySelector('iframe');
        const iframeSlides = iframe.contentDocument.querySelectorAll('.feedback-slider-item');
        const iframeSlider = iframe.contentDocument.querySelector('.feedback-slider');

        //const indicatorsWrapper = iframe.contentDocument.querySelectorAll('.carousel-indicators');
        //const indicators = iframe.contentDocument.querySelectorAll('.carousel-indicators li');

        if(this.state.feedbackSlides.length < slides.length){

            slides.forEach((slideItem, i) => {
                if(i >= this.state.feedbackSlides.length){
                    slideItem.remove();
                }

            });
            //indicators.forEach((indicator, i) => {
            //if(i >= this.state.mainSlides.length){
            //indicator.remove();
            // }

            //});

            iframeSlides.forEach((slideItem, j) => {
                if(j >= this.state.feedbackSlides.length){

                    slideItem.remove();
                }

            });

        }

        if(this.state.feedbackSlides.length > slides.length){


            this.state.feedbackSlides.forEach((slideItem, i) => {
                if(i >= slides.length){
                    const newSlide = slides[1].cloneNode(true);
                    slider.appendChild(newSlide);
                }

            });

            //this.state.mainSlides.forEach((indicator, i) => {
            //if(i >= indicators.length){
            //const newIndicator = indicators[1].cloneNode(true);
            //indicatorsWrapper.appendChild(newIndicator);
            //}

            //});

            this.state.feedbackSlides.forEach((slideItem, j) => {
                if(j >= iframeSlides.length){
                    const newSlide = slides[1].cloneNode(true);

                    iframeSlider.appendChild(newSlide);
                }

            });

        }
        const slidesAfter = newDom.querySelectorAll('.feedback-slider-item');

        const iframeSlidesAfter = iframe.contentDocument.querySelectorAll('.feedback-slider-item');

        slidesAfter.forEach((slideItem, i) => {
            if(slideItem.querySelector('img')){
                slideItem.querySelector('img').setAttribute('src', this.state.feedbackSlides[i].img);
            }

            slideItem.querySelector('.feedback-heading').innerHTML = this.state.feedbackSlides[i].heading;
            slideItem.querySelector('.feedback-text').innerHTML = this.state.feedbackSlides[i].text;
            slideItem.querySelector('.feedback-signature').innerHTML = this.state.feedbackSlides[i].adress;
        });


        iframeSlidesAfter.forEach((slideItem, j) => {
            if(slideItem.querySelector('img')){
                slideItem.querySelector('img').setAttribute('src', this.state.feedbackSlides[j].img);
            }

            slideItem.querySelector('.feedback-heading').innerHTML = this.state.feedbackSlides[j].heading;
            slideItem.querySelector('.feedback-text').innerHTML = this.state.feedbackSlides[j].text;
            slideItem.querySelector('.feedback-signature').innerHTML = this.state.feedbackSlides[j].adress;
        });

        iframe.contentWindow.document.body.querySelector('script').remove();
        const script = document.createElement('script');
        script.setAttribute('src', 'main.js');
        iframe.contentWindow.document.body.append(script);



        const imagesList = document.querySelectorAll(`div[data-feedback-slides]`);

        this.state.feedbackSlides.forEach((item, i) => {

            imagesList [i].querySelector(`.feedback-heading`).value = '';
            imagesList [i].querySelector(`.feedback-text`).value = '';
            imagesList [i].querySelector(`.feedback-adress`).value = '';
        });


        this.closeAccord();

        this.props.virtualDomLoaded(newDom);
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
    deleteMainSlide = (e, index) => {
        //console.log('delete');
        e.preventDefault();
        if(this.state.mainSlides.length < 2){
            UIkit.modal.alert("Вы не можете удалить последний слайд!", {labels: {ok: "Ok"}})
        }
        else{
            UIkit.modal.confirm("Вы действительно хотите удалить данный слайд? " +
                "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

                .then(() => {
                    this.setState(({mainSlides, mainSlider}) => {

                        const newSlides = [
                            ...mainSlides.slice(0, index),
                            ...mainSlides.slice(index+1)
                        ];
                        //console.log(newSlides);
                        newSlides.forEach((slideItem, j) => {
                            slideItem.index = j;
                        });
                        return {
                            mainSlides: newSlides
                        }
                    })
                })
                .then(() => {UIkit.modal("#slider-modal").show();})

        }
    };
    deleteFeedbackSlide = (e, index) => {
        e.preventDefault();
        if(this.state.feedbackSlides.length < 2){
            UIkit.modal.alert("Вы не можете удалить последний слайд!", {labels: {ok: "Ok"}})
        }
        else{
            UIkit.modal.confirm("Вы действительно хотите удалить данный слайд? " +
                "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

                .then(() => {
                    this.setState(({feedbackSlides}) => {


                        const newSlides = [
                            ...feedbackSlides.slice(0, index),
                            ...feedbackSlides.slice(index+1)
                        ];

                        newSlides.forEach((slideItem, j) => {
                            slideItem.index = j;
                        });

                        return {
                            feedbackSlides: newSlides
                        }
                    })
                })

                .then(() => {UIkit.modal("#slider-modal").show();})

        }
    };
    getMainSlidesInfo(){
        const slides = this.getSlides('.main-slider-item');

        const mainSliderItems = [];
        slides.forEach((slideItem, i) => {
            const slide = {};
            slide.index = i;
            slide.img = slideItem.querySelector('img').getAttribute('src');
            slide.heading = slideItem.querySelector('.main-heading').innerHTML;
            slide.text = slideItem.querySelector('.main-text').innerHTML;
            mainSliderItems.push(slide);
        });


        this.setState(({mainSlides}) =>{
            return{
                mainSlides: mainSliderItems
            }
        })
    }

    getSlides(str){
        const newDom = this.props.virtualDom.cloneNode(this.props.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        DOMHelper.unwrapImages(newDom);
        //let iframeFromHTML =  HtmlObjectTransform.getObjectIframeFromHtml(newDom);
        const slides = newDom.querySelectorAll(str);
        return slides;
    }

    getFeedbackSlidesInfo(){
        const slides = this.getSlides('.feedback-slider-item');

        const feedbackSliderItems = [];
        slides.forEach((slideItem, i) => {
            const slide = {};
            slide.index = i;
            if(slideItem.querySelector('img')){
                slide.img = slideItem.querySelector('img').getAttribute('src');
            }

            slide.heading = slideItem.querySelector('.feedback-heading').innerHTML;
            slide.text = slideItem.querySelector('.feedback-text').innerHTML;
            slide.adress = slideItem.querySelector('.feedback-signature').innerHTML;
            feedbackSliderItems.push(slide);
        });



        this.setState(({feedbackSlides}) =>{
            return{
                feedbackSlides: feedbackSliderItems
            }
        })
    }
    render() {
        const {target, modal} = this.props;
        const {mainSlides, feedbackSlides} = this.state;

        let mainSlider = '';
        let feedbackSlider = '';
        if(mainSlides){
            const slidesHtml = mainSlides.map((item, index)=> {
                return <div key={index} data-slides={index}>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title">Слайд {index+1}</h3>
                        <div className="uk-card-media-top">
                            <img data-images={index} src={item.img} alt=""/>
                        </div>
                        <div className="uk-card-body">
                            <form>
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Заголовок</div>
                                    <div className="uk-margin">
                                        <input onChange={(e) => {this.changeHeader(e, index)}} className="uk-input main-heading" type="text" placeholder={item.heading} />
                                    </div>
                                    <div className="uk-form-label">Текст</div>
                                    <div className="uk-margin">
                                        <textarea onChange={(e) => {this.changeText(e, index)}} className="uk-textarea main-text" rows="5" placeholder={item.text}></textarea>
                                    </div>
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


            mainSlider =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {slidesHtml}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {this.saveMainSliderChange(e)}}>Сохранить изменения</button>
                        <button className="uk-button uk-margin-left uk-button-default" type="button" onClick={(e) => {this.addMainSlide(e)}}>Добавить новый слайд</button>
                    </p>
                </div>
            ;
        }
        else{
            mainSlider = 'На сайте нет основного слайдера';
        }

        if(feedbackSlides){
            const slidesHtml = feedbackSlides.map((item, index)=> {
                return <div key={index} data-feedback-slides={index}>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title">Слайд {index+1}</h3>
                        {(item.img) ?
                            <div className="uk-card-media-top">
                                <img data-feedback-images={index} src={item.img} alt=""/>
                            </div> : ''

                        }

                        <div className="uk-card-body">
                            <form>
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Заголовок</div>
                                    <div className="uk-margin">
                                        <input onChange={(e) => {this.changeFeedbackHeader(e, index)}} className="uk-input feedback-heading" type="text"  placeholder={item.heading} />
                                    </div>
                                    <div className="uk-form-label">Текст</div>
                                    <div className="uk-margin">
                                        <textarea onChange={(e) => {this.changeFeedbackText(e, index)}} className="uk-textarea feedback-text" rows="5"  placeholder={item.text}></textarea>
                                    </div>
                                    <div className="uk-form-label">Адресат</div>
                                    <div className="uk-margin">
                                        <input onChange={(e) => {this.changeFeedbackAddress(e, index)}} className="uk-input feedback-adress" type="text"  placeholder={item.adress} />
                                    </div>
                                    {(item.img) ?
                                        <div className="uk-margin">
                                            <div className="uk-form-label">Изображение</div>
                                            <div>
                                                <input onChange={(e) => {this.changeFeedbackImage(e, index)}} type="file"/>
                                            </div>
                                        </div> : ''

                                    }



                                </fieldset>
                                <button onClick={(e) => {this.deleteFeedbackSlide(e, index)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить слайд</button>
                            </form>
                        </div>
                    </div>
                </div>;

            });
            //console.log(slidesHtml);

            feedbackSlider =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {slidesHtml}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {this.saveFeedbackSliderChange(e)}}>Сохранить изменения</button>
                        <button className="uk-button uk-margin-left uk-button-default" type="button" onClick={(e) => {this.addFeedbackSlide(e)}}>Добавить новый слайд</button>
                    </p>
                </div>
            ;
        }
        else{
            feedbackSlider = 'На сайте нет слайдера отзывов';
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
                        <li>
                            <a className="uk-accordion-title" onClick={this.getFeedbackSlidesInfo} href="#">Слайдер отзывов</a>
                            <div className="uk-accordion-content">
                                {feedbackSlider}
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

    virtualDomLoaded
};

export default connect(mapStateToProps, mapDispatchToProps)(SliderModal);