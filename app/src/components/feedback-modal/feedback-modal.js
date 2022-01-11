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

class FeedbackModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            feedbackTitle: null,
            feedbacks: null
        }

    }

    saveFeedbackChange = (e) => {
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

        const mainTitleHtml = newDom.querySelector('.feedback-title');

        const feedbacksList = newDom.querySelectorAll('.feedback-slider-item');
        const feedbackWrapper = newDom.querySelectorAll('.feedback-slider');



        const iframeMainTitleHtml = iframe.contentDocument.querySelector('.feedback-title');
        const iframeFeedbackList = iframe.contentDocument.querySelectorAll('.feedback-slider-item');
        const iframeFeedbackWrapper = iframe.contentDocument.querySelector('.feedback-slider');


        const {feedbackTitle, feedbacks} = this.state;

        if(feedbackTitle){
            mainTitleHtml.innerHTML = feedbackTitle;
            iframeMainTitleHtml.innerText= feedbackTitle;

        }
        else{
            mainTitleHtml.remove();
            iframeMainTitleHtml.remove();
        }



        if(feedbacks.length < feedbacksList.length){

            feedbacksList.forEach((item, i) => {
                if(i >= feedbacks.length){
                    item.remove();
                }

            });


            iframeFeedbackList.forEach((item, j) => {
                if(j >= feedbacks.length){
                    item.remove();
                }

            });

        }

        if(feedbacks.length > feedbacksList.length){


            feedbacks.forEach((slideItem, i) => {
                if(i >= feedbacksList.length){
                    const newFeedback = feedbacksList[0].cloneNode(true);
                    feedbackWrapper.appendChild(newFeedback);
                }

            });
            feedbacks.forEach((slideItem, i) => {
                if(i >= iframeFeedbackList.length){
                    const newFeedback = iframeFeedbackList[0].cloneNode(true);
                    iframeFeedbackWrapper.appendChild(newFeedback);
                }

            });


        }
        const feedbacksListAfter = newDom.querySelectorAll('.feedback-slider-item');

        const iframeFeedbacksListAfter = iframe.contentDocument.querySelectorAll('.feedback-slider-item');

        feedbacksListAfter.forEach((item, i) => {

            if(feedbacks[i].title !== null){
                item.querySelector('.feedback-heading').innerHTML = feedbacks[i].title;
            }
            if(feedbacks[i].text !== null){
                item.querySelector('.feedback-text').innerHTML = feedbacks[i].text;
            }
            if(feedbacks[i].signature !== null){
                item.querySelector('.feedback-signature').innerHTML = feedbacks[i].signature;
            }


        });


        iframeFeedbacksListAfter.forEach((item, i) => {

            if(feedbacks[i].title !== null){
                item.querySelector('.feedback-heading').innerHTML = feedbacks[i].title;
            }
            if(feedbacks[i].text !== null){
                item.querySelector('.feedback-text').innerHTML = feedbacks[i].text;
            }
            if(feedbacks[i].signature !== null){
                item.querySelector('.feedback-signature').innerHTML = feedbacks[i].signature;
            }


        });




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
    addFeedback = (e) => {
        e.preventDefault();
        const {feedbacks} = this.state;
        const index = feedbacks.length;

        let title = null;
        let text = null;
        let signature = null;

        if(feedbacks[0].title !== null){
            title = 'Заголовок отзыва';
        }
        if(feedbacks[0].text !== null){
            text = 'Текст отзыва';
        }
        if(feedbacks[0].signature !== null){
            signature = 'Имя отправителя, адрес';
        }



        const newFeedback = {
            index: index,
            text: text,
            title: title,
            signature: signature
        };

        this.setState(({feedbacks}) =>{
            const newFeedbacks = [...feedbacks, newFeedback];
            return{
                feedbacks: newFeedbacks

            }
        })
    }
    deleteFeedback = (e, index) => {
        e.preventDefault();

        const {feedbacks} = this.state;
        if(feedbacks.length < 2){
            UIkit.modal.alert("Вы не можете удалить последнее отзыв!", {labels: {ok: "Ok"}})
        }
        else {
            UIkit.modal.confirm("Вы действительно хотите удалить данный элемент? " +
                "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

                .then(() => {
                    this.setState(({feedbacks}) => {

                        const newFeedbacks = [
                            ...feedbacks.slice(0, index),
                            ...feedbacks.slice(index + 1)
                        ];

                        newFeedbacks.forEach((slideItem, j) => {
                            slideItem.index = j;
                        });
                        return {
                            feedbacks: newFeedbacks
                        }
                    })
                })
                .then(() => {
                    UIkit.modal("#feedback-modal").show();
                })
        }
    }

    changeFeedbackSignature = (e, index) => {
        this.setState(({feedbacks}) => {
            let newElem = {
                index: feedbacks[index].index,
                text: feedbacks[index].text,
                title: feedbacks[index].title,
                signature: e.target.value
            }
            let newFeedback = [
                ...feedbacks.slice(0, index),
                newElem,
                ...feedbacks.slice(index+1)
            ];

            return{
                feedbacks: newFeedback
            }

        });
    }

    changeFeedbackText = (e, index) => {
        this.setState(({feedbacks}) => {
            let newElem = {
                index: feedbacks[index].index,
                text: e.target.value,
                title: feedbacks[index].title,
                signature: feedbacks[index].signature
            }
            let newFeedback = [
                ...feedbacks.slice(0, index),
                newElem,
                ...feedbacks.slice(index+1)
            ];

            return{
                feedbacks: newFeedback
            }

        });
    }

    changeFeedbackTitle = (e, index) => {
        this.setState(({feedbacks}) => {
            let newElem = {
                index: feedbacks[index].index,
                text: feedbacks[index].text,
                title: e.target.value,
                signature: feedbacks[index].signature
            }
            let newFeedback = [
                ...feedbacks.slice(0, index),
                newElem,
                ...feedbacks.slice(index+1)
            ];

            return{
                feedbacks: newFeedback
            }

        });
    }


    deleteFeedbackTitle = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить общий заголовок? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({feedbackTitle}) => {
                    return {
                        feedbackTitle: null
                    }
                })
            })
            .then(() => {UIkit.modal("#feedback-modal").show();})
    }
    changeFeedbackHeader = (e) => {
        this.setState(({feedbackTitle}) => {
            return {
                feedbackTitle: e.target.value
            }
        })
    }
    closeAccord = () => {

        const accordBlock = document.querySelector('.feedback-dialog');
        const links = accordBlock.querySelectorAll('.uk-accordion-title');
        const accords = accordBlock.querySelectorAll('li');

        accords.forEach((accord, i) => {
            if(accord.classList.contains('uk-open')){
                links[i].click();
            }


        });
    };
    getFeedbackInfo = () => {
        const newDom = document.querySelector('iframe');

        let feedbackTitle = null;
        let feedbacks = null;


        const mainTitleHtml = newDom.contentDocument.querySelector('.feedback-title');
        if(mainTitleHtml){
            feedbackTitle = mainTitleHtml.innerHTML;
        }

        const feedbacksList = newDom.contentDocument.querySelectorAll('.feedback-slider-item');

        if(feedbacksList.length > 0){
            feedbacks = [];
            feedbacksList.forEach((item, index) => {
                let title = null;
                let text = null;
                let signature = null;


                const titleHtml = item.querySelector('.feedback-heading');
                if(titleHtml){
                    title = titleHtml.innerHTML;
                }
                const textHtml = item.querySelector('.feedback-text');
                if(textHtml){
                    text = textHtml.innerHTML;
                }
                const signatureHtml = item.querySelector('.feedback-signature');
                if(signatureHtml){
                    signature = signatureHtml.innerHTML;
                }



                let fObj = {
                    index: index,
                    title: title,
                    text: text,
                    signature: signature,
                }
                feedbacks.push(fObj);
            })
        }







        this.setState(() =>{
            return{
                feedbackTitle: feedbackTitle,
                feedbacks: feedbacks

            }
        })
    }


    render() {
        const {feedbackTitle, feedbacks} = this.state;
        const {target, modal} = this.props;


        let feedback = '';

        if(feedbacks && feedbacks.length > 0){


            let feedbackTitleInput = '';
            let feedbacksStr = '';

            if(feedbackTitle !==null){
                feedbackTitleInput = <div>
                    <div className="uk-form-label">Общий заголовок</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeFeedbackHeader(e)}} className="uk-input main-heading" type="text" placeholder={feedbackTitle} value={feedbackTitle}/>
                    </div>
                    {/*<button onClick={(e) => {this.deleteFeedbackTitle(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить общий заголовок</button>*/}



                </div>;

            }
            else{
                feedbackTitleInput = '';
            }
            if(feedbacks.length > 0){

                let feedbackTitleStr = '';
                let feedbackTextStr = '';
                let feedbackSignatureStr = '';




                feedbacksStr = feedbacks.map((item, index)=> {
                    if(item.title !== null){
                        feedbackTitleStr = <div className="uk-margin">
                            <input onChange={(e) => {this.changeFeedbackTitle(e, index)}} className="uk-input main-heading" type="text" placeholder={item.title} value={item.title} />
                        </div>
                    }
                    else{
                        feedbackTitleStr = '';
                    }
                    if(item.text !== null){
                        feedbackTextStr = <div className="uk-margin">
                            <textarea onChange={(e) => {this.changeFeedbackText(e, index)}} className="uk-textarea" type="text" placeholder={item.text} value={item.text} />
                        </div>
                    }
                    else{
                        feedbackTextStr = '';
                    }
                    if(item.signature !== null){
                        feedbackSignatureStr = <div className="uk-margin">
                            <input onChange={(e) => {this.changeFeedbackSignature(e, index)}} className="uk-input main-heading" type="text" placeholder={item.signature} value={item.signature} />
                        </div>
                    }
                    else{
                        feedbackSignatureStr = '';
                    }

                    return <div key={index}>
                        <div className="uk-card uk-card-default">
                            <div className="uk-card-body">
                                <form>
                                    <fieldset className="uk-fieldset">
                                        <div className="uk-form-label">Отзыв {index+1}</div>
                                        {feedbackTitleStr}
                                        {feedbackTextStr}
                                        {feedbackSignatureStr}
                                    </fieldset>
                                    <button onClick={(e) => {this.deleteFeedback(e, index)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить элемент</button>
                                </form>
                            </div>
                        </div>
                    </div>;

                });
            }
            else{
                feedbacksStr = '';
            }



            feedback =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {feedbackTitleInput}
                    {feedbacksStr}

                    <p className="uk-text-right">

                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {this.saveFeedbackChange(e)}}>Сохранить изменения</button>
                        <button className="uk-button uk-margin-left uk-button-default" type="button" onClick={(e) => {this.addFeedback(e)}}>Добавить отзыв</button>
                    </p>
                </div>
            ;
        }
        else{
            feedback = 'На сайте нет секции Преимущества';
        }
        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Настройка секции отзывов</h2>

                    <ul uk-accordion="true" className="feedback-dialog">
                        <li>
                            <a className="uk-accordion-title" onClick={this.getFeedbackInfo} href="#">Отзывы</a>
                            <div className="uk-accordion-content">
                                {feedback}
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
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackModal);