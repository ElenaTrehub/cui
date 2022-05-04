import React, {Component} from 'react';
import WithCreateService from "../hoc";
import {
    iframeLoaded,
    iframeRequested,
    iframeError,
    imageLoading,
    imageLoaded,
    virtualDomLoaded,
    iframeIsChange,
    deleteFavoriteIframe,
    chooseCurrentTheme,
    chooseCurrentFontStyle, chooseCurrentRubric, chooseCurrentSiteType, chooseChangeSectionName, virtualDomChanged
} from '../../actions';
import Spinner from "../spinner";
import {connect} from "react-redux";
//import axios from 'axios';
import "../../helpers/iframeLoader.js";
import EditorText from '../editor-text';
//import EditorMeta from "../editor-meta";
import EditorImages from "../editor-images";
import UIkit from "uikit";
import PostponeModal from "../postpone-modal";
import HtmlObjectTransform from "../../helpers/htmlObjectTransform";
import DOMHelper from '../../helpers/dom-helper';
import ChooseModal from "../choose-modal";
import AddElementModal from "../add-element-modal/add-element-modal";

import "uikit/dist/css/uikit.min.css";

import SliderModal from "../slider-modal/slider-modal";
import MenuModal from "../menu-modal/menu-modal";
import SettingsSiteModal from "../settings-site-modal/settings-site-modal";
import {Button} from "reactstrap";
import AboutModal from "../about-modal/about-modal";
import FeatureModal from "../feature-modal/feature-modal";
import ServiceModal from "../service-modal/service-modal";
import FeedbackModal from "../feedback-modal/feedback-modal";
import ContactModal from "../contact-modal/contact-modal";
import FooterModal from "../footer-modal/footer-modal";
import SectionChangeModal from "../section-change-modal/section-change-modal";

class CreateSection extends Component{
    constructor(props) {
        super(props);


    }


    componentDidMount() {
        this.props.iframeRequested();

        const idRubrics = +this.props.match.params.id;
        const siteType = this.props.match.params.site;
        const lang = this.props.currentLang;

        this.props.chooseCurrentRubric(idRubrics);
        this.props.chooseCurrentSiteType(siteType);

        const siteStyle = this.props.currentSiteStyle;
        const siteTheme = this.props.currentTheme;

        this.createNewIframe(idRubrics, siteType, siteStyle.name, siteTheme.name, lang);



    }

    createNewIframe(idRubrics, siteType, siteStyle, siteTheme, lang){
        const {CreatorService} = this.props;

        const iframe = document.querySelector('iframe');

        CreatorService.getIframeByRubricId(idRubrics, siteType, siteStyle, siteTheme, lang)
            .then(res => {
                //console.log(res);
                //this.props.libsSet(res.set.libs);

                return res;
            })
            .then(res => {
                const answer = HtmlObjectTransform.buildCssFile(res.css);
                return res;
            })
            //.then(res => console.log(res.html))
            //.then(res => JSON.parse(res.html))
            .then(res => {
                const answer = HtmlObjectTransform.buildJsFile(res.script);
                return res;
            })
            .then(res => {

                const answer = HtmlObjectTransform.buildFontFile(res.fontStyle);
                return res;
            })
            .then((res) => {
                const answer = HtmlObjectTransform.buildThemeFile(this.props.currentTheme.name);
                return res;
            })
            .then((res) => {
                this.props.chooseCurrentFontStyle(res.fontStyle);
                return res;
            })
            .then(
                (res) => {

                    let htmlArray = [];
                    res.html.forEach((item) => {
                        let obj = {};
                        obj.name = item.name;

                        let body = document.createElement('body');
                        body.setAttribute('id', 'up');
                        body.setAttribute('data-page', item.name);
                        body.innerHTML = item.html;
                        obj.html = body;
                        htmlArray.push(obj);
                    });



                    iframe.appendChild(htmlArray[0].html);

                    return {
                        //html: HtmlObjectTransform.getTextHtml(res.html, iframe),
                        html: htmlArray[0].html,
                        fontLink: res.fontStyle.link,
                        htmlArray: htmlArray
                    }

                }
            )


            .then((obj) => {

                this.props.iframeLoaded(obj.html);
                return obj;})

            // .then(obj => {return {
            //     html: DOMHelper.wrapTextNodes(obj.html),
            //     fontLink: obj.fontLink
            // };})
            // .then(obj => {return {
            //     html: DOMHelper.wrapImages(obj.html),
            //     fontLink: obj.fontLink
            // };})
            .then(obj => {
                let withSectionArray = [];
                obj.htmlArray.forEach((item) => {
                    let obj = {};
                    obj.name = item.name;
                    obj.html = DOMHelper.addSectionPanel(item.html);

                    withSectionArray.push(obj );
                });
                return {
                    html: withSectionArray[0],
                    fontLink: obj.fontLink,
                    htmlArray: withSectionArray
                };})
            .then(obj => {
                obj.htmlArray.forEach((item) => {

                    this.props.virtualDomLoaded(item);
                });

                return obj;
            })
            .then(obj => {

                let serializeArray = [];
                obj.htmlArray.forEach((item) => {
                    let obj = {};
                    obj.name = item.name;
                    obj.html = DOMHelper.serializeDOMToString(item.html);
                    serializeArray.push(obj);
                });

                return {
                    html: serializeArray[0],
                    fontLink: obj.fontLink,
                    htmlArray: serializeArray
                };})
            .then(obj => {

                let pageArray = [];
                obj.htmlArray.forEach((item) => {
                    let objIframe = {};
                    objIframe.name = item.name;


                    const head = `<!DOCTYPE html><html lang="ru"><head>
                    <meta charSet="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    
<!--                    <meta http-equiv="Cache-Control" content="no-cach">-->
<!--                    <meta http-equiv="expires" content="0">-->
<!--                    <meta http-equiv="pragma" content="no-cach">-->
                    
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
                        <title>Title</title>
                        <!-- Latest compiled and minified CSS -->
                            <link rel="stylesheet" href="../assets/bootstrap.min.css">
                            <link rel="stylesheet" href="../assets/animate.css">
                            
                            <link rel="stylesheet" href="style.css">
                            <link rel="stylesheet" href="fontStyle.css">
                            <link rel="stylesheet" href="theme.css">`+
                        obj.fontLink +

                        `</head>`;
                    const js = `
                    <script src="../assets/wow.js"></script>
<!--                    <script src="../assets/iframe.js"></script>-->
                    <script src="main.js"></script>
                    
                    
                    </html>
                `;
                    objIframe.html = head + item.html + js;
                    pageArray.push(objIframe);
                })

                return pageArray;

            })
            .then(pageArray =>{
                //const version = Math.random(1, 100000000000000);
                pageArray.forEach((item) => {

                    fetch("../../api/saveTempPage.php", {
                        method: 'POST',
                        body: JSON.stringify({html: item.html, name: item.name})
                    })
                        .then((res) => {
                            if(!res.ok){
                                throw Error(res.statusText)
                            }
                            //return res.json();
                        })

                })



            })

            .then(() => iframe.load("../userDir/empty.html"))
            .then(() => iframe.load("../userDir/index.html"))
            //.then(() => this.enableEditing(iframe))
            //.then(() => this.enableDeleteSectionButton(iframe))
//             .then(() => {
//                 if(this.props.currentSiteType === 'manyPage'){
//                     const linksHeader = iframe.contentDocument.querySelectorAll('.menu_main > ul > li a');
//                     const footerLinks = iframe.contentDocument.querySelectorAll('.menu-sitemap > li a');
//
//                     let links = [];
//                     if(footerLinks){
//                         links = [...linksHeader, ...footerLinks];
//                     }
//                     else{
//                         links = [...linksHeader];
//                     }
//
//
//                     const message = 'При переходе по ссылке все изменения на странице пропадут. Сохранить данные изменения? ';
//
//                     links.forEach((item) => {
//                         item.addEventListener('click', (e) => {
//                             e.preventDefault();
//                             if(confirm(message)){
//                                 this.saveCurrentChangeInPage();
//                             }
// console.log(window.frames[0].location.href);
//                             console.log(e.target.getAttribute('href'));
//                             window.frames[0].location.href = 'http://cui-prog:1252/userDir/about.html';
//
//                             //confirm(message);
//                             //console.log(e.target.getAttribute('href'));
//                         })
//                     })
//
//
//
//                 }
//             })
            .then(() => this.injectStyles(iframe))

        iframe.onload = () => {
            this.enableDeleteSectionButton(iframe);
        }
    }

    enableEditing(iframe) {
        iframe.contentDocument.querySelectorAll("text-editor").forEach(element => {
            const id = element.getAttribute("nodeid");
            const virtualElement = this.props.virtualDom.querySelector(`[nodeid="${id}"]`);

            new EditorText(element, virtualElement);
        });

        iframe.contentDocument.querySelectorAll("[editableimgid]").forEach(element => {
            const id = element.getAttribute("editableimgid");
            const virtualElement = this.props.virtualDom.querySelector(`[editableimgid="${id}"]`);

            new EditorImages(element, virtualElement, this.props.imageLoading, this.props.imageLoaded, this.showNotifications);
        });
    }

    enableDeleteSectionButton = (iframe)=> {

            iframe.contentDocument.querySelectorAll("delete-section").forEach(element => {
                 const idNumber = element.getAttribute("deleteSectionId");



                const delButton = element.querySelector(".delete-button");
                const changeButton = element.querySelector('.change-button');
                const sectionListButton = element.querySelector('.section-list-button');


                delButton.addEventListener('mouseover', (e)=> {
                    delButton.style.opacity = '1';
                    delButton.style.cursor = 'pointer';
                });
                changeButton.addEventListener('mouseover', (e)=> {
                    changeButton.style.opacity = '1';
                    changeButton.style.cursor = 'pointer';
                });
                sectionListButton.addEventListener('mouseover', (e)=> {
                    sectionListButton.style.opacity = '1';
                    sectionListButton.style.cursor = 'pointer';
                });
                delButton.addEventListener('mouseleave', (e)=> {
                    delButton.style.opacity = '.8';
                });
                changeButton.addEventListener('mouseleave', (e)=> {
                    changeButton.style.opacity = '.8';

                });
                sectionListButton.addEventListener('mouseleave', (e)=> {
                    sectionListButton.style.opacity = '.8';

                });
                changeButton.addEventListener('click', (e)=> {


                    if (element.parentElement.classList.contains('header')){
                        changeButton.setAttribute('uk-toggle', 'target: #menu-modal');
                        UIkit.modal('#menu-modal').show();
                    }
                    else if(element.parentElement.classList.contains('main')){

                        changeButton.setAttribute('uk-toggle', 'target: #slider-modal');
                        UIkit.modal('#slider-modal').show();
                    }
                    else if(element.parentElement.classList.contains('about')){

                        changeButton.setAttribute('uk-toggle', 'target: #about-modal');
                        UIkit.modal('#about-modal').show();
                    }
                    else if(element.parentElement.classList.contains('feature')){

                        changeButton.setAttribute('uk-toggle', 'target: #feature-modal');
                        UIkit.modal('#feature-modal').show();
                    }
                    else if(element.parentElement.classList.contains('service')){

                        changeButton.setAttribute('uk-toggle', 'target: #service-modal');
                        UIkit.modal('#service-modal').show();
                    }
                    else if(element.parentElement.classList.contains('feedback')){

                        changeButton.setAttribute('uk-toggle', 'target: #feedback-modal');
                        UIkit.modal('#feedback-modal').show();
                    }
                    else if(element.parentElement.classList.contains('contact')){

                        changeButton.setAttribute('uk-toggle', 'target: #contact-modal');
                        UIkit.modal('#contact-modal').show();
                    }
                    else if(element.parentElement.classList.contains('footer')){

                        changeButton.setAttribute('uk-toggle', 'target: #footer-modal');
                        UIkit.modal('#footer-modal').show();
                    }

                });
                delButton.addEventListener('click', (e)=> {
                    UIkit.modal.confirm("Вы действительно хотите далить блок из структуры сайта? " +
                        "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})
                        .then(() => {

                            if(this.props.currentSiteType === 'manyPage' && (element.parentNode.getAttributeNode('id').value === 'header'
                            || element.parentNode.getAttributeNode('id').value === 'footer')){

                                //let id = element.parentNode.getAttributeNode('id').value;

                                //if(id === 'header' || id === 'footer'){
                                    let newVirtualDom = [];
                                    let newDom = '';
                                    let names = [];
                                    this.props.virtualDom.forEach(item => {

                                        newDom = item.html.cloneNode(true);
                                        names.push(item.name);
                                        newVirtualDom.push(newDom);
                                    });
                                    let changedVirtualDom = [];
                                    newVirtualDom.forEach((newDom, index) => {
                                        const name  = names[index];
                                        let section = newDom.querySelector('#'+id);
                                        if(section){
                                            section.remove();
                                        }

                                        const virtualDomObj = {
                                            name: name,
                                            html: newDom
                                        }
                                        changedVirtualDom.push(virtualDomObj);
                                    })
                                    element.parentNode.remove();
                                    this.props.virtualDomChanged(changedVirtualDom);


                                //}

                            }
                            else{
                                element.parentNode.remove();
                                const page = iframe.contentDocument.body.getAttribute('data-page');
                                //let newDom = '';

                                let newVirtualDom = [];
                                let names = [];
                                this.props.virtualDom.forEach(item => {

                                    let newDom = item.html.cloneNode(true);
                                    names.push(item.name);
                                    newVirtualDom.push(newDom);
                                });

                                let changedVirtualDom = [];
                                newVirtualDom.forEach((newDom, index) => {
                                    const name  = names[index];


                                    if(name === page){
                                        console.log(name);
                                        console.log(page);
                                        console.log(idNumber);
                                        if(newDom.querySelector(`[deleteSectionId="${idNumber}"]`)){
                                            newDom.querySelector(`[deleteSectionId="${idNumber}"]`).parentNode.remove();
                                        }
                                    }

                                    const virtualDomObj = {
                                        name: name,
                                        html: newDom
                                    }
                                    changedVirtualDom.push(virtualDomObj);
                                })

                                this.props.virtualDomChanged(changedVirtualDom);
                            }




                        })


                });
                sectionListButton.addEventListener('click', (e)=> {

                     const prom = new Promise((resolve)=>{
                         resolve();
                     });
                     prom.then(() => {
                         sectionListButton.setAttribute('uk-toggle', 'target: #section-change-modal');
                     })
                         .then(() => {
                             this.props.chooseChangeSectionName(element.parentElement.classList[0]);
                         })
                         .then(() => {
                                UIkit.modal('#section-change-modal').show();
                         })


                });
            });

    }
    injectStyles(iframe) {
        const style = iframe.contentDocument.createElement("style");
        style.innerHTML = `
            text-editor:hover {
                outline: 3px solid orange;
                outline-offset: 8px;
            }
            text-editor:focus {
                outline: 3px solid red;
                outline-offset: 8px;
            }
            [editableimgid]:hover{
                outline: 3px solid orange;
                outline-offset: 8px;
            }
        `;
        iframe.contentDocument.head.appendChild(style);
    }

    deleteIframe = (e, name) => {
        e.preventDefault();
        try{
            UIkit.modal.confirm("Вы действительно хотите удалить данный шаблон? " +
                "Все данные будут поткряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})
                .then(() => {
                    this.props.deleteFavoriteIframe(name);

                })
                .then(() => {
                    UIkit.modal.alert("Шаблон успешно удален!", {labels: {ok: "Ok"}})
                })
        }
        catch(e){
            UIkit.modal.alert("Не удалось удалить данный шаблон! Повторите попытку.", {labels: {ok: "Ok"}});
        }


    };

    openFavoriteIframe = (e, obj) => {

        e.preventDefault();
        const prom = new Promise((resolve)=>{
            //HtmlObjectTransform.buildCssFile(obj.css);
            resolve();
        });

        const iframe = document.querySelector('iframe');
        prom.then(() => HtmlObjectTransform.buildCssFile(obj.css))
            .then(() => HtmlObjectTransform.buildJsFile(obj.script))
            .then(() => HtmlObjectTransform.buildThemeFile(obj.theme))
            //.then(() => HtmlObjectTransform.changeFontStyleFileByObject(obj.font))
            .then(
                () => {

                    let arrayPage = [];
                    obj.html.forEach((item) => {
                        let objIframe = {};
                        objIframe.name = item.name;
                        let elem = document.createElement('div');

                        objIframe.html = HtmlObjectTransform.getTextHtml(item.html, elem);

                        arrayPage.push(objIframe);
                    });

                    this.props.iframeLoaded(arrayPage[0].html);
                    this.props.chooseCurrentTheme(obj.theme);

                    return arrayPage;
                }
            )
            //.then(res => DOMHelper.wrapTextNodes(res))
            //.then(res => DOMHelper.wrapImages(res))
            .then(obj => {
                let withSectionArray = [];
                obj.forEach((item) => {
                    let obj = {};
                    obj.name = item.name;
                    obj.html = DOMHelper.addSectionPanel(item.html);

                    withSectionArray.push(obj);
                });

                return withSectionArray; })
            .then(obj => {
                obj.forEach((item) => {
                    this.props.virtualDomLoaded(item);
                });


                return obj;
            })

            .then((res) => {
                let stringArray = [];

                res.forEach((item) => {
                    let obj = {};
                    obj.name = item.name;
                    obj.html = DOMHelper.serializeDOMToString(item.html);

                    stringArray.push(obj);
                });
                return stringArray;
            })


            .then(htmlArray => {

                let pageArray = [];
                htmlArray.forEach((item) => {

                    let objIframe = {};
                    objIframe.name = item.name;


                    const head = `<!DOCTYPE html><html lang="ru"><head>
                    <meta charSet="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
                        <title>Title</title>
                        <!-- Latest compiled and minified CSS -->
                            <link rel="stylesheet" href="../assets/bootstrap.min.css">
                            <link rel="stylesheet" href="../assets/animate.css">
                            
                            <link rel="stylesheet" href="style.css">
                            <link rel="stylesheet" href="fontStyle.css">
                            <link rel="stylesheet" href="theme.css">`+
                        this.props.currentFontStyle.link +

                        `</head>`;
                    const js = `
                    <script src="../assets/wow.js"></script>
                    <script src="main.js"></script>
                    </html>
                `;
                    objIframe.html = head + item.html + js;
                    pageArray.push(objIframe);
                })

                return pageArray;
            })
            .then(pageArray =>{

                pageArray.forEach((item) => {
                    fetch("../../api/saveTempPage.php", {
                        method: 'POST',
                        body: JSON.stringify({html: item.html, name: item.name})
                    })
                        .then((res) => {
                            if(!res.ok){
                                throw Error(res.statusText)
                            }
                            //return res.json();
                        })

                })

            })
            //.then(() => {const html = ''; iframe.load(html)})
            .then(() => iframe.load("../../userDir/index.html"))
            .then(() => this.enableEditing(iframe))
            .then(() => this.enableDeleteSectionButton(iframe))
            .then(() => this.injectStyles(iframe))



    };
    saveCurrentChangeInPage = () => {
        //e.preventDefault();

        function save(virtualDom, link){
            const prom = new Promise((resolve)=>{
                resolve();
            });
            prom
                .then(() => {
                    let arrayPage = [];
                    //console.log(this.props.virtualDom);
                    virtualDom.forEach((item) => {

                        const objIframe = {};
                        objIframe.name = item.name;
                        const newDom = item.html.cloneNode(true);

                        //DOMHelper.unwrapTextNodes(newDom);
                        //DOMHelper.unwrapImages(newDom);

                        let iframeFromHTML =  HtmlObjectTransform.getObjectIframeFromHtml(newDom);


                        let elem = document.createElement('div');

                        objIframe.html = HtmlObjectTransform.getTextHtml(iframeFromHTML, elem);

                        arrayPage.push(objIframe);



                    });

                    return arrayPage;
                })


                .then((res) => {
                    let stringArray = [];

                    res.forEach((item) => {
                        let obj = {};

                        obj.name = item.name;
                        obj.html = DOMHelper.serializeDOMToString(item.html);

                        stringArray.push(obj);
                    });


                    return stringArray;

                })


                .then(htmlArray => {

                    let pageArray = [];
                    htmlArray.forEach((item) => {

                        let objIframe = {};
                        objIframe.name = item.name;


                        const head = `<!DOCTYPE html><html lang="ru"><head>
                    <meta charSet="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
                        <title>Title</title>
                        <!-- Latest compiled and minified CSS -->
                            <link rel="stylesheet" href="../assets/bootstrap.min.css">
                            <link rel="stylesheet" href="../assets/animate.css">
                            
                            <link rel="stylesheet" href="style.css">
                            <link rel="stylesheet" href="fontStyle.css">
                            <link rel="stylesheet" href="theme.css">`+
                            link +

                            `</head>`;
                        const js = `
                    <script src="../assets/wow.js"></script>
                    <script src="main.js"></script>
                    </html>
                `;
                        objIframe.html = head + item.html + js;
                        pageArray.push(objIframe);
                    })
                    return pageArray;
                })
                .then((pageArray) => {
                    fetch("../../api/saveTempStyle.php", {
                        method: 'POST'
                    })
                        .then((res) => {
                            if(!res.ok){
                                throw Error(res.statusText)
                            }

                        })
                    return pageArray;
                })
                .then((pageArray) => {
                    fetch("../../api/saveTempJs.php", {
                        method: 'POST'
                    })
                        .then((res) => {
                            if(!res.ok){
                                throw Error(res.statusText)
                            }

                          })
                    return pageArray;
                })
                .then(pageArray =>{

                    pageArray.forEach((item) => {

                        fetch("../../api/saveTempPage.php", {
                            method: 'POST',
                            body: JSON.stringify({html: item.html, name: item.name})
                        })
                            .then((res) => {
                                if(!res.ok){
                                    throw Error(res.statusText)
                                }
                                else{
                                    UIkit.modal.alert('Страница успешно сохранена!', {labels: {ok: "Ok"}})

                                }

                            })

                    })

                })

        }

        let newDom = this.props.virtualDom[0].html.cloneNode(this.props.virtualDom[0].html);

        let repeatLinks = [];
        if(this.props.currentSiteType === 'landing'){

            const itemsMenu = newDom.querySelectorAll('.menu_main li');



            itemsMenu.forEach((item, i) => {

                let currentLink = item.querySelector('a').getAttribute('href');
                let currentText = item.querySelector('a').innerHTML
                let currentLinksArray = [];

                let linkExist = false;

                repeatLinks.forEach((link) => {
                    if(link.indexOf(currentText)!==-1){
                        linkExist =true;
                    }
                })
                if(!linkExist) {

                    itemsMenu.forEach((li, j) => {
                        let currentLi = li.querySelector('a').getAttribute('href');
                        //console.log(currentLi);
                        //console.log(i);
                        //console.log(currentLink);


                        //console.log(j);
                        if (currentLi === currentLink && i !== j) {
                            currentLinksArray.push(li.querySelector('a').innerHTML);

                        }
                    })

                    if (currentLinksArray.length > 0) {
                        currentLinksArray.push(currentText);
                        repeatLinks.push(currentLinksArray);
                    }
                }

            })



        }

        if(this.props.currentSiteType === 'manyPage'){

            const menuItems = newDom.querySelectorAll('.menu_main > ul > li');

            let linksArray = [];

            menuItems.forEach((menuItem, i) => {

                const item = {};
                item.index = i;
                item.name = menuItem.querySelector('a').innerHTML;
                item.link = menuItem.querySelector('a').getAttribute('href');

                linksArray.push(item);
                if(menuItem.querySelector('ul')){
                    const menuLiItems = menuItem.querySelectorAll(':scope > ul > li');

                    menuLiItems.forEach((menuLiItem, j) => {

                        const itemChild = {};
                        itemChild.index = i+'.'+(j);
                        itemChild.name = menuLiItem.querySelector('a').innerHTML;
                        itemChild.link = menuLiItem.querySelector('a').getAttribute('href');
                        linksArray.push(itemChild);

                        if(menuLiItem.querySelector('ul')) {
                            const menuLiChildItems = menuLiItem.querySelectorAll(':scope > ul > li');
                            menuLiChildItems.forEach((menuLiChildItem, k) => {
                                const itemSecondChild = {};
                                itemSecondChild.index = i + '.' + (j) + '.' + (k);
                                itemSecondChild.name = menuLiChildItem.querySelector('a').innerHTML;
                                itemSecondChild.link = menuLiChildItem.querySelector('a').getAttribute('href');

                                linksArray.push(itemSecondChild);

                            })
                        }

                    })

                }




            });


            linksArray.forEach((item, i) => {

                let currentLink = item.link;
                let currentText = item.name;
                let currentLinksArray = [];

                let linkExist = false;

                repeatLinks.forEach((link) => {
                    if(link.indexOf(currentText)!==-1){
                        linkExist =true;
                    }
                })
                if(!linkExist){
                    linksArray.forEach((li, j) => {
                        let currentLi = li.link;

                        if(currentLi === currentLink && i !== j){
                            currentLinksArray.push(li.name);

                        }
                    })
                    if(currentLinksArray.length > 0){
                        currentLinksArray.push(currentText);
                        repeatLinks.push(currentLinksArray);
                    }
                }

            })


        }

        if(repeatLinks.length > 0){
            const strLink = repeatLinks.map((item) => {
                let str = '';
                item.forEach((link) => {
                    str = str + link + ' ';
                });

                if(this.props.currentSiteType === 'landing'){
                    return 'Данные группы ссылок ' + str + '; '+'ссылаются на одну секцию сайта! Остановить сохранение?';
                }
                if(this.props.currentSiteType === 'manyPage'){
                    return 'Данные группы ссылок ' + str + '; '+'ссылаются на одну страницу сайта! Остановить сохранение?';
                }


            });


            UIkit.modal.confirm(''+ strLink, {labels: {ok: "Продолжить", cancel: 'Остановить'}})
                .then(() => {
                    save(this.props.virtualDom, this.props.currentFontStyle.link);
                })

        }
        else{
            save(this.props.virtualDom, this.props.currentFontStyle.link);
        }
    }
    showNotifications(message, status){
        UIkit.notification({message, status});
    }
    selectColor = (e, colorName) => {
        e.preventDefault();

        const prom = new Promise((resolve)=>{
            //HtmlObjectTransform.buildCssFile(obj.css);
            resolve();
        });
        prom
            .then(() =>HtmlObjectTransform.buildThemeFile(colorName))

            .then(() => this.props.chooseCurrentTheme(colorName))
            .then(() => {
                const iframe = document.querySelector('iframe');
                iframe.contentWindow.document.head.querySelector('link[href="theme.css"]').remove();

                const link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', 'theme.css');

                iframe.contentWindow.document.head.append(link);
            });


    };
    changeSiteStyle = (e) => {

        const idRubrics = this.props.currentRubric;
        const siteType = this.props.currentSiteType;
        const currentSiteStyle = this.props.currentSiteStyle;
        const siteTheme = this.props.currentTheme;

        this.createNewIframe(idRubrics, siteType, currentSiteStyle.name, siteTheme.name);
    }


    // chooseFontStyle = (e, obj, fonts) => {
    //     e.preventDefault();
    //      console.log(obj);
    //     console.log(fonts);
    //     let fontObj = {};
    //     fontObj.obj = obj;
    //     fontObj.fonts = fonts;
    //
    //
    //     const prom = new Promise((resolve)=>{
    //         resolve(fontObj);
    //     });
    //     prom
    //         .then((fontObj) => {HtmlObjectTransform.changeFontStyleFileByObject(fontObj.obj)
    //
    //             return fontObj;
    //
    //         })
    //
    //         .then((fontObj) => {this.props.chooseCurrentFontStyle(fontObj.obj); return fontObj;})
    //         .then((fontObj) => {
    //
    //
    //             let fontNames = [];
    //             if(fontNames.indexOf(fontObj.obj.bigTypeFont) === -1){
    //                 fontNames.push(fontObj.obj.bigTypeFont);
    //             }
    //
    //             if(fontNames.indexOf(fontObj.obj.firstHeadingTypeFont) === -1){
    //                 fontNames.push(fontObj.obj.firstHeadingTypeFont);
    //             }
    //
    //             if(fontNames.indexOf(fontObj.obj.mainHeadingTypeFont) === -1){
    //                 fontNames.push(fontObj.obj.mainHeadingTypeFont);
    //             }
    //
    //             if(fontNames.indexOf(fontObj.obj.secondHeadingTypeFont) === -1){
    //                 fontNames.push(fontObj.obj.secondHeadingTypeFont);
    //             }
    //
    //             if(fontNames.indexOf(fontObj.obj.thirdHeadingTypeFont) === -1){
    //                 fontNames.push(fontObj.obj.thirdHeadingTypeFont);
    //             }
    //
    //             if(fontNames.indexOf(fontObj.obj.textType) === -1){
    //                 fontNames.push(fontObj.obj.textType);
    //             }
    //             if(fontNames.indexOf(fontObj.obj.menuType) === -1){
    //                 fontNames.push(fontObj.obj.menuType);
    //             }
    //
    //             let links = [];
    //             fontNames.forEach((item) => {
    //                 let currentFont = fontObj.fonts.filter(font => font.name === item);
    //                 links.push(currentFont);
    //             })
    //
    //             return links;
    //
    //         })
    //         .then((links) => {
    //             const iframe = document.querySelector('iframe');
    //             iframe.contentWindow.document.head.querySelector('link[href="fontStyle.css"]').remove();
    //
    //             let oldLinks = iframe.contentWindow.document.head.querySelectorAll(
    //                 'link[href]:not([href="fontStyle.css"], [href="style.css"], [href="theme.css"], [href="../assets/bootstrap.min.css"], [href="../assets/animate.css"])')
    //
    //             oldLinks.forEach((item) => {
    //                 item.remove();
    //             })
    //
    //             links.forEach((item) => {
    //
    //                 const link = document.createElement('link');
    //
    //                 link.innerHTML = item[0].link;
    //
    //                 iframe.contentWindow.document.head.append(link);
    //
    //
    //             })
    //
    //
    //             const link = document.createElement('link');
    //             link.setAttribute('rel', 'stylesheet');
    //             link.setAttribute('href', 'fontStyle.css');
    //
    //             iframe.contentWindow.document.head.append(link);
    //
    //         });
    //
    // };


    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps !== this.props){

            if(this.props.changePanelShow !== false){
                const iframe = document.querySelector('iframe');

                //console.log(iframe.contentDocument);
                iframe.contentDocument.querySelectorAll("delete-section").forEach(element => {
                    element.style.opacity = '.8';
                });

            }
            else{
                const iframe = document.querySelector('iframe');

                iframe.contentDocument.querySelectorAll("delete-section").forEach(element => {
                    element.style.opacity = '0';
                });
            }
        }

    }

    render() {
        const {loading, favoriteIframes, themes, changePanelShow, changeSectionName} = this.props;

        let isSpinner;
        if(loading){
            isSpinner =  <Spinner/>;
        }

        const modal = true;
        const modal1 = true;
        const modal_slider = true;
        const placeholder = "Введите название отложенного варианта";
        let panelStr = '';
        if(changePanelShow){
            panelStr =
                <div className="panel">
                    <Button color="success" onClick={this.saveCurrentChangeInPage} >Сохранить изменения </Button>
                    <Button color="primary" >Отменить изменения</Button>
                </div>


        }

        return (
            <>
                {isSpinner}
                {panelStr}
                <div className="iframe-wrapper">
                    <iframe src="" frameBorder="0"></iframe>
                </div>
                <PostponeModal  modal={modal} target={'postpone'} placeholder={placeholder} title='Добавьте шаблон в отложенные'/>
                <ChooseModal modal={modal1} target={'choose-modal'} itemsList={favoriteIframes} title='Список отложенных шаблонов'
                             openFavoriteIframe = {this.openFavoriteIframe} deleteIframe = {this.deleteIframe}/>

                <SliderModal modal={modal_slider} target={'slider-modal'}/>
                <MenuModal modal={modal_slider} target={'menu-modal'}/>
                <SettingsSiteModal modal={modal_slider} target={'setting-site-modal'} changeSiteStyle = {this.changeSiteStyle}
                                   changeTheme = {this.changeTheme}/>
                <AboutModal modal={modal_slider} target={'about-modal'}/>
                <FeatureModal modal={modal_slider} target={'feature-modal'}/>
                <ServiceModal modal={modal_slider} target={'service-modal'}/>
                <FeedbackModal modal={modal_slider} target={'feedback-modal'}/>
                <ContactModal modal={modal_slider} target={'contact-modal'}/>
                <FooterModal modal={modal_slider} target={'footer-modal'}/>
                <SectionChangeModal modal={modal_slider} enableDeleteSectionButton={this.enableDeleteSectionButton} enableEditing={this.enableEditing} section={changeSectionName} saveSiteChange={this.saveCurrentChangeInPage} target={'section-change-modal'}/>
                <AddElementModal modal={modal_slider} enableDeleteSectionButton={this.enableDeleteSectionButton} enableEditing={this.enableEditing}  saveSiteChange={this.saveCurrentChangeInPage} target={'add-element-modal'}/>
            </>


        )
    }
}
const mapStateToProps = (state) => {
    return {
        iframe: state.iframe,
        loading: state.loading,
        virtualDom: state.virtualDom,
        favoriteIframes: state.favoriteIframes,
        currentTheme: state.currentTheme,
        themes: state.themes,
        changePanelShow: state.changePanelShow,
        currentFontStyle: state.currentFontStyle,
        currentRubric: state.currentRubric,
        currentSiteType: state.currentSiteType,
        currentSiteStyle: state.currentSiteStyle,
        changeSectionName: state.changeSectionName,
        currentLang: state.currentLang
    }
};
const mapDispatchToProps = {
    iframeLoaded,
    iframeRequested,
    iframeError,
    imageLoading,
    imageLoaded,
    virtualDomLoaded,
    iframeIsChange,
    deleteFavoriteIframe,
    chooseCurrentTheme,
    chooseCurrentFontStyle,
    chooseCurrentRubric,
    chooseCurrentSiteType,
    chooseChangeSectionName,
    virtualDomChanged

};
export default WithCreateService()(connect(mapStateToProps, mapDispatchToProps)(CreateSection));