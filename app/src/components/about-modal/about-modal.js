import React, {Component} from "react";
import {connect} from "react-redux";
import UIkit from "uikit";
import {
    virtualDomChanged
} from "../../actions";

class AboutModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            aboutTitle: null,
            aboutText: null,
            aboutImg: null,
            leftPart: null,
            rightPart: null
        }

    }

    saveAboutChange = (e)=> {
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

        const {aboutImg, aboutTitle, aboutText, leftPart, rightPart} = this.state;
        //DOMHelper.unwrapTextNodes(newDom);
        //DOMHelper.unwrapImages(newDom);

        const img = newDom.querySelector('.about-img');

        const titleHtml = newDom.querySelector('.about-content__title');

        const paragraph = newDom.querySelectorAll('.about-content__text p');

        const paragraphLeft = newDom.querySelectorAll('.about-content__left p');

        const paragraphRight = newDom.querySelectorAll('.about-content__right p');



        const imgIframe = iframe.contentDocument.querySelector('.about-img');

        const titleHtmlIframe = iframe.contentDocument.querySelector('.about-content__title');

        const paragraphIframe = iframe.contentDocument.querySelectorAll('.about-content__text p');

        const paragraphLeftIframe = iframe.contentDocument.querySelectorAll('.about-content__left p');

        const paragraphRightIframe = iframe.contentDocument.querySelectorAll('.about-content__right p');
        const paragraphAfter = '';
        const paragraphIframeAfter = '';

        if(imgIframe !== null && aboutImg === null){
            imgIframe.remove();
            img.remove();
        }

        if(imgIframe !== null && aboutImg !== null){
            imgIframe.setAttribute('src', aboutImg);
            img.setAttribute('src', aboutImg);
        }
        if(titleHtmlIframe !== null && aboutTitle === null){
            titleHtmlIframe.remove();
            titleHtml.remove();
        }

        if(titleHtmlIframe !== null && aboutTitle !== null){
            titleHtmlIframe.innerHTML = aboutTitle;
            titleHtml.innerHTML = aboutTitle;
        }


        if(paragraphIframe.length > 0){

            if(aboutText.length > paragraphIframe.length){

                aboutText.forEach((item, i) => {
                    if(i >= paragraphIframe.length){
                        const newItem = paragraphIframe[0].cloneNode(true);
                        paragraphIframe.appendChild(newItem);
                    }

                });

                aboutText.forEach((item, i) => {
                    if(i >= paragraph.length){
                        const newItem = paragraph[0].cloneNode(true);
                        paragraph.appendChild(newItem);
                    }

                });


            }
            if(aboutText.length < paragraphIframe.length){

                paragraphIframe.forEach((item, i) => {
                    if(i >= aboutText.length){
                        item.remove();
                    }

                });

                paragraph.forEach((item, i) => {
                    if(i >= aboutText.length){
                        item.remove();
                    }

                });


            }

            const paragraphAfter = newDom.querySelectorAll('.about-content__text p');
            const paragraphIframeAfter = iframe.contentDocument.querySelectorAll('.about-content__text p');

            paragraphAfter.forEach((item, i) => {
                item.innerHTML = aboutText[i].text;
            });

            paragraphIframeAfter.forEach((item, i) => {
                item.innerHTML = aboutText[i].text;
            });



        }

        if(paragraphLeftIframe.length > 0){

            if(leftPart.length > paragraphLeftIframe.length){

                leftPart.forEach((item, i) => {
                    if(i >= paragraphLeftIframe.length){
                        const newItem = paragraphLeftIframe[0].cloneNode(true);
                        paragraphLeftIframe.appendChild(newItem);
                    }

                });

                leftPart.forEach((item, i) => {
                    if(i >= paragraphLeft.length){
                        const newItem = paragraphLeft[0].cloneNode(true);
                        paragraphLeft.appendChild(newItem);
                    }

                });


            }
            if(leftPart.length < paragraphLeftIframe.length){

                paragraphLeftIframe.forEach((item, i) => {
                    if(i >= leftPart.length){
                        item.remove();
                    }

                });

                paragraphLeft.forEach((item, i) => {
                    if(i >= leftPart.length){
                        item.remove();
                    }

                });


            }

            const paragraphLeftAfter = newDom.querySelectorAll('.about-content__left p');
            const paragraphLeftIframeAfter = iframe.contentDocument.querySelectorAll('.about-content__left p');

            paragraphLeftAfter.forEach((item, i) => {
                item.innerHTML = leftPart[i].text;
            });

            paragraphLeftIframeAfter.forEach((item, i) => {
                item.innerHTML = leftPart[i].text;
            });



        }

        if(paragraphRightIframe.length > 0){

            if(rightPart.length > paragraphRightIframe.length){

                rightPart.forEach((item, i) => {
                    if(i >= paragraphRightIframe.length){
                        const newItem = paragraphRightIframe[0].cloneNode(true);
                        paragraphRightIframe.appendChild(newItem);
                    }

                });

                rightPart.forEach((item, i) => {
                    if(i >= paragraphRight.length){
                        const newItem = paragraphRight[0].cloneNode(true);
                        paragraphRight.appendChild(newItem);
                    }

                });


            }
            if(rightPart.length < paragraphRightIframe.length){

                paragraphRightIframe.forEach((item, i) => {
                    if(i >= rightPart.length){
                        item.remove();
                    }

                });

                paragraphRight.forEach((item, i) => {
                    if(i >= rightPart.length){
                        item.remove();
                    }

                });


            }

            const paragraphRightAfter = newDom.querySelectorAll('.about-content__right p');
            const paragraphRightIframeAfter = iframe.contentDocument.querySelectorAll('.about-content__right p');

            paragraphRightAfter.forEach((item, i) => {
                item.innerHTML = rightPart[i].text;
            });

            paragraphRightIframeAfter.forEach((item, i) => {
                item.innerHTML = rightPart[i].text;
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

    deleteAboutImg = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить изображение? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({aboutImg}) => {
                    return {
                        aboutImg: null
                    }
                })
            })
            .then(() => {UIkit.modal("#about-modal").show();})
    }


    changeAboutImage = (e) => {
        if(e.target.files && e.target.files[0]){
            let formData = new FormData();
            formData.append("image", e.target.files[0]);

            fetch('../api/uploadImage.php', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then((res) => {
                    this.setState(({aboutImg}) => {

                        const newImg = `../userDir/images/${res}`;
                        return {
                            aboutImg: newImg

                        }
                    })
                })
                .catch(() => this.showNotifications('Ошибка сохранения', 'danger'))

        }


    }
    addRightText = (e)=>  {
        this.setState(({rightPart}) => {
            const newParagraph = {
                index: rightPart.length,
                text: 'Новый абзац'
            }

            const newArray = [
                ...rightPart,
                newParagraph
            ];
            return {
                rightPart: newArray
            }
        })
    }
    deleteRightAboutText = (e, index) => {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить абзац? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {

                this.setState(({rightPart}) => {
                    const newArray = [
                        ...rightPart.slice(0, index),
                        ...rightPart.slice(index+1)
                    ];
                    newArray.forEach((item, j) => {
                        item.index = j;
                    });

                    return{

                        rightPart: newArray
                    }

                })
            })
            .then(() => {UIkit.modal("#about-modal").show();})
    }

    changeRightAboutText = (e, index)=> {
        this.setState(({rightPart}) => {
            let newElem = rightPart[index];
            newElem.text = e.target.value;
            let newAboutText = [
                ...rightPart.slice(0, index),
                newElem,
                ...rightPart.slice(index+1)
            ];

            return{
                rightPart: newAboutText
            }

        })
    }

    addLeftParagraph = (e)=> {
        this.setState(({leftPart}) => {
            const newParagraph = {
                index: leftPart.length,
                text: 'Новый абзац'
            }

            const newArray = [
                ...leftPart,
                newParagraph
            ];
            return {
                leftPart: newArray
            }
        })
    }

    deleteLeftAboutText = (e, index)=> {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить абзац? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {

                this.setState(({leftPart}) => {
                    const newArray = [
                        ...leftPart.slice(0, index),
                        ...leftPart.slice(index+1)
                    ];
                    newArray.forEach((item, j) => {
                        item.index = j;
                    });

                    return{

                        leftPart: newArray
                    }

                })
            })
            .then(() => {UIkit.modal("#about-modal").show();})
    }

    changeLeftAboutText = (e, index)=>{
        this.setState(({leftPart}) => {
            let newElem = leftPart[index];
            newElem.text = e.target.value;
            let newAboutText = [
                ...leftPart.slice(0, index),
                newElem,
                ...leftPart.slice(index+1)
            ];

            return{
                leftPart: newAboutText
            }

        })
    }

    addParagraph = (e) => {
        this.setState(({aboutText}) => {
            const newParagraph = {
                index: aboutText.length,
                text: 'Новый абзац'
            }

            const newArray = [
                ...aboutText,
                newParagraph
            ];
            return {
                aboutText: newArray
            }
        })
    }

    deleteAboutText = (e, index) => {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить абзац? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {

                this.setState(({aboutText}) => {
                    const newArray = [
                        ...aboutText.slice(0, index),
                        ...aboutText.slice(index+1)
                    ];
                    newArray.forEach((item, j) => {
                        item.index = j;
                    });

                    return{

                        aboutText: newArray
                    }

                })
            })
            .then(() => {UIkit.modal("#about-modal").show();})

    }
    changeAboutText = (e, index) => {
        this.setState(({aboutText}) => {
            let newElem = aboutText[index];
            newElem.text = e.target.value;
            let newAboutText = [
                ...aboutText.slice(0, index),
                newElem,
                ...aboutText.slice(index+1)
            ];

            return{
                aboutText: newAboutText
            }

        })

    }

    deleteAboutTitle = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить общий заголовок? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({aboutTitle}) => {
                    return {
                        aboutTitle: null
                    }
                })
            })
            .then(() => {UIkit.modal("#about-modal").show();})

    }
    changeAboutHeader = (e) => {
        this.setState(({aboutTitle}) => {
            return {
                aboutTitle: e.target.value
            }
        })
    }

    closeAccord = () => {

        const accordBlock = document.querySelector('.about-dialog');
        const links = accordBlock.querySelectorAll('.uk-accordion-title');
        const accords = accordBlock.querySelectorAll('li');

        accords.forEach((accord, i) => {
            if(accord.classList.contains('uk-open')){
                links[i].click();
            }


        });
    };
    getAboutInfo = () => {
        const newDom = document.querySelector('iframe');

        let image = null;
        let title = null;
        let text = null;
        let leftText = null;
        let rightText = null;


        const img = newDom.contentDocument.querySelector('.about-img');
        if(img){
            image = img.getAttribute('src');
        }

        const titleHtml = newDom.contentDocument.querySelector('.about-content__title');
        if(titleHtml){
            title = titleHtml.innerHTML;
        }

        const paragraph = newDom.contentDocument.querySelectorAll('.about-content__text p');

        if(paragraph.length > 0){
            text = [];
            paragraph.forEach((item, index) => {
                let pObj = {
                    index: index,
                    text: item.innerHTML
                }
                text.push(pObj);
            })
        }

        const paragraphLeft = newDom.contentDocument.querySelectorAll('.about-content__left p');

        if(paragraphLeft.length > 0){
            leftText = [];
            paragraphLeft.forEach((item, index) => {
                let pObj = {
                    index: index,
                    text: item.innerHTML
                }
                leftText.push(pObj);
            })
        }

        const paragraphRight = newDom.contentDocument.querySelectorAll('.about-content__right p');

        if(paragraphRight.length > 0){
            rightText = [];
            paragraphRight.forEach((item, index) => {
                let pObj = {
                    index: index,
                    text: item.innerHTML
                }
                rightText.push(pObj);
            })
        }




        this.setState(() =>{
            return{
                aboutTitle: title,
                aboutText: text,
                aboutImg: image,
                leftPart: leftText,
                rightPart: rightText

            }
        })
    }
    render() {
        const {aboutTitle, aboutText, aboutImg, leftPart, rightPart} = this.state;
        const {target, modal} = this.props;


        let about = '';

        if(aboutText || leftPart || rightPart){

            let aboutImgStr = '';
            let aboutTitleInput = '';
            let aboutTextStr = '';

            let addParagraphButton = '';


            let leftPartStr = '';
            let rightPartStr = '';

            if(aboutTitle){
                aboutTitleInput = <div>
                    <div className="uk-form-label">Общий заголовок</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeAboutHeader(e)}} className="uk-input main-heading" type="text" placeholder={aboutTitle} value={aboutTitle}/>
                    </div>
                    {/*<button onClick={(e) => {this.deleteAboutTitle(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить общий заголовок</button>*/}

                </div>;

            }
            else{
                aboutTitleInput = '';
            }
            if(aboutText !== null){

                aboutTextStr = aboutText.map((item, index)=> {
                    return <div key={index}>
                        <div className="uk-card uk-card-default">
                            <div className="uk-card-body">
                                <form>
                                    <fieldset className="uk-fieldset">
                                        <div className="uk-form-label">Абзац {index+1}</div>
                                        <div className="uk-margin">
                                            <textarea onChange={(e) => {this.changeAboutText(e, index)}} className="uk-textarea" type="text" placeholder={item.text} value={item.text} />
                                        </div>
                                    </fieldset>
                                    <button onClick={(e) => {this.deleteAboutText(e, index)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить абзац</button>
                                </form>
                            </div>
                        </div>
                    </div>;

                });
                addParagraphButton = <button className="uk-button uk-margin-left uk-button-default" type="button" onClick={(e) => {this.addParagraph(e)}}>Добавить новый абзац</button>;
            }
            else{
                aboutTextStr = '';
                addParagraphButton = '';
            }

            if(leftPart !==null) {
                const leftTextStr = leftPart.map((item, index) => {
                    return <div key={index}
                                data-slides={index}>
                        <div className="uk-card uk-card-default">
                            <div className="uk-card-body">
                                <form>
                                    <fieldset className="uk-fieldset">
                                        <div className="uk-form-label">Абзац {index + 1}</div>
                                        <div className="uk-margin">
                                            <textarea onChange={(e) => {
                                                this.changeLeftAboutText(e, index)
                                            }}
                                                   className="uk-input main-heading"
                                                   type="text"
                                                      placeholder={item.text} value={item.text}/>
                                        </div>
                                    </fieldset>
                                    <button onClick={(e) => {
                                        this.deleteLeftAboutText(e, index)
                                    }}
                                            className="uk-button uk-button-danger uk-modal-close"
                                            type="button">Удалить абзац
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>;
                });
                leftPartStr = <div>
                    <h2>Левая часть</h2>
                    {leftTextStr}
                    <p className="uk-text-right">
                        <button className="uk-button uk-margin-left uk-button-default" type="button" onClick={(e) => {this.addLeftParagraph(e)}}>Добавить абзац</button>
                    </p>
                </div>
            }
            else{
                leftPartStr = '';
            }
            if(rightPart !==null) {
                const rightTextStr = rightPart.map((item, index) => {
                    return <div key={index}
                                data-slides={index}>
                        <div className="uk-card uk-card-default">
                            <div className="uk-card-body">
                                <form>
                                    <fieldset className="uk-fieldset">
                                        <div className="uk-form-label">Абзац {index + 1}</div>
                                        <div className="uk-margin">
                                            <textarea onChange={(e) => {
                                                this.changeRightAboutText(e, index)
                                            }}
                                                   className="uk-input main-heading"
                                                   type="text"
                                                   placeholder={item.text} value={item.text}/>
                                        </div>
                                    </fieldset>
                                    <button onClick={(e) => {
                                        this.deleteRightAboutText(e, index)
                                    }}
                                            className="uk-button uk-button-danger uk-modal-close"
                                            type="button">Удалить абзац
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>;
                });
                rightPartStr = <div>
                    <h2>Правая часть</h2>
                    {rightTextStr}
                    <p className="uk-text-right">
                        <button className="uk-button uk-margin-left uk-button-default" type="button" onClick={(e) => {this.addRightText(e)}}>Добавить абзац</button>
                    </p>
                </div>
            }
            else{
                rightPartStr = '';
            }
            if(aboutImg !== null){
                aboutImgStr = <div>
                    <div className="uk-form-label">Изображение</div>
                    <div className="uk-card-media-top">
                        <img src={aboutImg} alt=""/>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-form-label">Изображение</div>
                        <div>
                            <input onChange={(e) => {this.changeAboutImage(e)}} type="file"/>
                        </div>
                    </div>
                    <button onClick={(e) => {this.deleteAboutImg(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить изображение</button>
                </div>;

            }
            else{
                aboutImgStr = '';


            }



            about =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {aboutTitleInput}
                    {aboutImgStr}
                    {aboutTextStr}
                    {leftPartStr}
                    {rightPartStr}
                    <p className="uk-text-right">

                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {this.saveAboutChange(e)}}>Сохранить изменения</button>
                        {addParagraphButton}
                    </p>
                </div>
            ;
        }
        else{
            about = 'На сайте нет секции О компании';
        }
        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Настройка секции о компании</h2>

                    <ul uk-accordion="true" className="about-dialog">
                        <li>
                            <a className="uk-accordion-title" onClick={this.getAboutInfo} href="#">О компании</a>
                            <div className="uk-accordion-content">
                                {about}
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
export default connect(mapStateToProps, mapDispatchToProps)(AboutModal);