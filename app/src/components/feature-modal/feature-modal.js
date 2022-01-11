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

class FeatureModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            featureTitle: null,
            features: null
        }

    }

    saveFeatureChange = (e) => {
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

        const mainTitleHtml = newDom.querySelector('.feature__title');

        const featuresList = newDom.querySelectorAll('.feature-item');
        const featuresWrapper = newDom.querySelectorAll('.feature-wrapper');



        const iframeMainTitleHtml = iframe.contentDocument.querySelectorAll('.feature__title');
        const iframeFeaturesList = iframe.contentDocument.querySelectorAll('.feature-item');
        const iframeFeaturesWrapper = iframe.contentDocument.querySelector('.feature-wrapper');


        let middleWrapper = null;
        let generalTitle = '';
        let generalText = '';

        const {featureTitle, features} = this.state;

        if(featureTitle){
            mainTitleHtml.innerHTML = featureTitle;
            iframeMainTitleHtml.innerText = featureTitle;

        }
        else{
            mainTitleHtml.remove();
            iframeMainTitleHtml.remove();
        }




        if(features.length < featuresList.length){

            featuresList.forEach((item, i) => {
                if(i >= features.length){
                    item.remove();
                }

            });


            iframeFeaturesList.forEach((item, j) => {
                if(j >= features.length){
                    item.remove();
                }

            });

        }

        if(features.length > featuresList.length){


            features.forEach((slideItem, i) => {
                if(i >= featuresList.length){
                    const newFeature = featuresList[0].cloneNode(true);
                    featuresWrapper.appendChild(newFeature);
                }

            });
            features.forEach((slideItem, i) => {
                if(i >= iframeFeaturesList.length){
                    const newFeature = iframeFeaturesList[0].cloneNode(true);
                    iframeFeaturesWrapper.appendChild(newFeature);
                }

            });


        }
        const featuresListAfter = newDom.querySelectorAll('.feature-item');

        const iframeFeaturesListAfter = iframe.contentDocument.querySelectorAll('.feature-item');

        featuresListAfter.forEach((item, i) => {

            if(features[i].title !== null){
                item.querySelector('.feature-item__title').innerHTML = features[i].title;
            }
            if(features[i].text !== null){
                item.querySelector('.feature-item__text').innerHTML = features[i].text;
            }
            if(features[i].number !== null){
                item.querySelector('.feature-item_number').innerHTML = features[i].number;
            }
            if(features[i].icon !== null){
                item.querySelector('.feature-item_icon').innerHTML = '';
                let icon = document.createElement('i');
                features[i].icon.forEach((item) => {
                    icon.classList.add(item);
                });
                item.querySelector('.feature-item_icon').appendChild(icon);
            }

        });


        iframeFeaturesListAfter.forEach((item , j) => {

            if(features[j].title !== null){
                item.querySelector('.feature-item__title').innerHTML = features[j].title;
            }
            if(features[j].text !== null){
                item.querySelector('.feature-item__text').innerHTML = features[j].text;
            }
            if(features[j].number !== null){
                item.querySelector('.feature-item_number').innerHTML = features[j].number;
            }
            if(features[j].icon !== null){
                item.querySelector('.feature-item_icon').innerHTML = '';
                let icon = document.createElement('i');
                features[j].icon.forEach((item) => {
                    icon.classList.add(item);
                });
                item.querySelector('.feature-item_icon').appendChild(icon);
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
    addFeature = (e) => {
        e.preventDefault();
        const {features} = this.state;
        const index = features.length;

        let title = null;
        let text = null;
        let number = null;
        let icon = null;

        if(features[0].title !== null){
            title = 'Заголовок преимущества';
        }
        if(features[0].text !== null){
            text = 'Текст преимущества';
        }
        if(features[0].number !== null){
            number = index;
        }
        if(features[0].icon !== null){
            icon = ['fas','fa-bullhorn'];
        }


        const newFeature = {
            index: index,
            text: text,
            title: title,
            icon: icon,
            number: number
        };

        this.setState(({features}) =>{
            const newFeatures = [...features, newFeature];
            return{
                features: newFeatures

            }
        })
    }


    deleteFeature = (e, index) => {

        e.preventDefault();

        const {features} = this.state;
        if(features.length < 2){
            UIkit.modal.alert("Вы не можете удалить последнее преимущество!", {labels: {ok: "Ok"}})
        }
        else {
            UIkit.modal.confirm("Вы действительно хотите удалить данный элемент? " +
                "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

                .then(() => {
                    this.setState(({features}) => {

                        const newFeatures = [
                            ...features.slice(0, index),
                            ...features.slice(index + 1)
                        ];
                        //console.log(newSlides);
                        newFeatures.forEach((slideItem, j) => {
                            slideItem.index = j;
                        });
                        return {
                            features: newFeatures
                        }
                    })
                })
                .then(() => {
                    UIkit.modal("#feature-modal").show();
                })
        }
    }

    changeFeatureIcon = (e,index, name) => {

        let iconArray = ['fas', 'fa-'+name];
        this.setState(({features}) => {
            let newElem = {
                index: features[index].index,
                text: features[index].text,
                title: features[index].title,
                number: features[index].number,
                icon: iconArray
            }
            let newFeatures = [
                ...features.slice(0, index),
                newElem,
                ...features.slice(index+1)
            ];

            return{
                features: newFeatures
            }

        })
    }

    changeFeatureNumber = (e, index) => {
        this.setState(({features}) => {
            let newElem = {
                index: features[index].index,
                text: features[index].text,
                title: features[index].title,
                number: e.target.value,
                icon: features[index].icon
            }
            let newFeatures = [
                ...features.slice(0, index),
                newElem,
                ...features.slice(index+1)
            ];

            return{
                features: newFeatures
            }

        })
    }


    changeFeatureText = (e, index) => {
        this.setState(({features}) => {
            let newElem = {
                index: features[index].index,
                text: e.target.value,
                title: features[index].title,
                number: features[index].number,
                icon: features[index].icon
            }
            let newFeatures = [
                ...features.slice(0, index),
                newElem,
                ...features.slice(index+1)
            ];

            return{
                features: newFeatures
            }

        })
    }

    changeFeatureTitle = (e, index) => {

        this.setState(({features}) => {
            let newElem = {
                index: features[index].index,
                text: features[index].text,
                title: e.target.value,
                number: features[index].number,
                icon: features[index].icon
            }
            let newFeatures = [
                ...features.slice(0, index),
                newElem,
                ...features.slice(index+1)
            ];

            return{
                features: newFeatures
            }

        })
    }

    deleteFeatureTitle = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить общий заголовок? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({featureTitle}) => {
                    return {
                        featureTitle: null
                    }
                })
            })
            .then(() => {UIkit.modal("#feature-modal").show();})
    }

    changeFeatureHeader = (e) => {
        this.setState(({featureTitle}) => {
            return {
                featureTitle: e.target.value
            }
        })
    }
    closeAccord = () => {

        const accordBlock = document.querySelector('.feature-dialog');
        const links = accordBlock.querySelectorAll('.uk-accordion-title');
        const accords = accordBlock.querySelectorAll('li');

        accords.forEach((accord, i) => {
            if(accord.classList.contains('uk-open')){
                links[i].click();
            }


        });
    };
    getFeatureInfo = () => {
        const newDom = document.querySelector('iframe');

        let mainTitle = null;
        let features = null;


        const mainTitleHtml = newDom.contentDocument.querySelector('.feature__title');
        if(mainTitleHtml){
            mainTitle = mainTitleHtml.innerHTML;
        }

        const featuresList = newDom.contentDocument.querySelectorAll('.feature-item');

        if(featuresList.length > 0){
            features = [];
            featuresList.forEach((item, index) => {
                let title = null;
                let text = null;
                let number = null;
                let icon = null;

                const titleHtml = item.querySelector('.feature-item__title');
                if(titleHtml){
                    title = titleHtml.innerHTML;
                }
                const textHtml = item.querySelector('.feature-item__text');
                if(textHtml){
                    text = textHtml.innerHTML;
                }
                const numberHtml = item.querySelector('.feature-item_number');
                if(numberHtml){
                    number = numberHtml.innerHTML;
                }

                const iconHtml = item.querySelector('.feature-item_icon i');
                if(iconHtml){
                    icon = [];
                    //icon = document.createElement('i');
                    iconHtml.classList.forEach((item)=>{
                        icon.push(item);
                    });

                }

                let fObj = {
                    index: index,
                    title: title,
                    text: text,
                    number: number,
                    icon: icon
                }
                features.push(fObj);
            })
        }







        this.setState(() =>{
            return{
                featureTitle: mainTitle,
                features: features

            }
        })
    }


    render() {
        const {featureTitle, features} = this.state;
        const {target, modal} = this.props;


        let feature = '';

        if(features && features.length > 0){


            let featureTitleInput = '';
            let featuresStr = '';

            if(featureTitle !==null){
                featureTitleInput = <div>
                    <div className="uk-form-label">Общий заголовок</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeFeatureHeader(e)}} className="uk-input main-heading" type="text" placeholder={featureTitle} value={featureTitle}/>
                    </div>
                    {/*<button onClick={(e) => {this.deleteFeatureTitle(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить общий заголовок</button>*/}

                </div>;

            }
            else{
                featureTitleInput = '';
            }
            if(features.length > 0){

                let featureTitleStr = '';
                let featureTextStr = '';
                let featureNumberStr = '';
                let featureIconStr = '';



                featuresStr = features.map((item, index)=> {
                    if(item.title !== null){
                        featureTitleStr = <div className="uk-margin">
                            <input onChange={(e) => {this.changeFeatureTitle(e, index)}} className="uk-input main-heading" type="text" placeholder={item.title} value={item.title} />
                        </div>
                    }
                    else{
                        featureTitleStr = '';
                    }
                    if(item.text !== null){
                        featureTextStr = <div className="uk-margin">
                            <textarea onChange={(e) => {this.changeFeatureText(e, index)}} className="uk-textarea" type="text" placeholder={item.text} value={item.text} />
                        </div>
                    }
                    else{
                        featureTextStr = '';
                    }
                    if(item.number !== null){
                        featureNumberStr = <div className="uk-margin">
                            <input onChange={(e) => {this.changeFeatureNumber(e, index)}} className="uk-input main-heading" type="text" placeholder={item.number} value={item.number} />
                        </div>
                    }
                    else{
                        featureNumberStr = '';
                    }
                    if(item.icon !== null){

                        let nameArray = item.icon[1].split('-');
                        let newNameArray = nameArray.map((item) => {
                            return item.slice(0, 1).toUpperCase() + item.slice(1);
                        });
                        let nameStr = '';

                        newNameArray.forEach((item, i) => {
                            if(i > 0){
                                nameStr += item;
                            }

                        })

                        let buttons = Object.keys(Icons).map((btn) => {

                            if(btn !== 'fas' && btn !== 'prefix'){
                                return <span key={Icons[btn].iconName} onClick={(e) => {this.changeFeatureIcon(e,index, Icons[btn].iconName)}} className="uk-button uk-button-small" ><FontAwesomeIcon style={{height: '15px', width: '15px', color: 'gray', marginTop: '10px'}} icon={Icons[btn]} /></span>
                            }
                        })
                        let name = 'fa'+ nameStr;
                        let icon = <FontAwesomeIcon style={{height: '40px', width: '40px', color: '#888888', marginTop: '10px'}} icon={Icons[name]} />;
                        featureIconStr = <div className="uk-margin">
                            {icon}
                            <div>
                                <ul uk-accordion="true" >
                                    <li>
                                        <a className="uk-accordion-title"  href="#">Выбор иконки</a>
                                        <div className="uk-accordion-content">
                                            {buttons}
                                        </div>
                                    </li>

                                </ul>
                            </div>


                        </div>
                    }
                    else{
                        featureIconStr = '';
                    }
                    return <div key={index}>
                        <div className="uk-card uk-card-default">
                            <div className="uk-card-body">
                                <form>
                                    <fieldset className="uk-fieldset">
                                        <div className="uk-form-label">Преимущество {index+1}</div>
                                        {featureNumberStr}
                                        {featureIconStr}
                                        {featureTitleStr}
                                        {featureTextStr}
                                    </fieldset>
                                    <button onClick={(e) => {this.deleteFeature(e, index)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить элемент</button>
                                </form>
                            </div>
                        </div>
                    </div>;

                });
            }
            else{
                featuresStr = '';
            }



            feature =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {featureTitleInput}
                    {featuresStr}

                    <p className="uk-text-right">

                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {this.saveFeatureChange(e)}}>Сохранить изменения</button>
                        <button className="uk-button uk-margin-left uk-button-default" type="button" onClick={(e) => {this.addFeature(e)}}>Добавить преимущество</button>
                    </p>
                </div>
            ;
        }
        else{
            feature = 'На сайте нет секции Преимущества';
        }
        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Настройка секции преимущества</h2>

                    <ul uk-accordion="true" className="feature-dialog">
                        <li>
                            <a className="uk-accordion-title" onClick={this.getFeatureInfo} href="#">Преимущества</a>
                            <div className="uk-accordion-content">
                                {feature}
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
export default connect(mapStateToProps, mapDispatchToProps)(FeatureModal);