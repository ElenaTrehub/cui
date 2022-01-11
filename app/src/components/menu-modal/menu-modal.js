import React, {Component} from 'react';
import {connect} from "react-redux";

import DOMHelper from "../../helpers/dom-helper";
import HtmlObjectTransform from "../../helpers/htmlObjectTransform";
import EditorText from "../editor-text";
import EditorImages from "../editor-images";
import {
    virtualDomLoaded, virtualDomChanged
} from "../../actions";
import UIkit from "uikit";

class MenuModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
            headerLogo: {
                img: '',
                alt: ''
            },
            headerMenu: [ ],
            existSections: [],
            existPages: [],
            headerPhone: {
                phone: null
            },
            headerAddress: {
                address: null
            },
            headerEmail: {
                email: null
            },
            liIsActive: false,
            liActive: {}
        };




    }

    closeAccord = () => {

        const accordBlock = document.querySelector('.menu-dialog');
        const links = accordBlock.querySelectorAll('.uk-accordion-title');
        const accords = accordBlock.querySelectorAll('li');

        accords.forEach((accord, i) => {
            if(accord.classList.contains('uk-open')){
                links[i].click();
            }


        });
    };
    saveHeaderPhoneChange = (e) => {
        e.preventDefault();

        const {headerPhone} = this.state;

        let newVirtualDom = [];
        const iframe = document.querySelector('iframe');
        const iframePhone = iframe.contentDocument.querySelector('.info-phone');
        const iframeEmail = iframe.contentDocument.querySelector('.info-email');


        let iframeIcon = null;
        if(iframeEmail.querySelector('i')){
            iframeIcon= iframeEmail.querySelector('i');
        }

        if(headerPhone.phone === ''){

            if(iframePhone){
                iframePhone.innerHTML = '';
                iframePhone.style.display = 'none';
                iframePhone.setAttribute('disabled', '1');
            }

        }
        else{

            if(iframeIcon){

                while(iframePhone.firstChild){
                    iframePhone.firstChild.remove();
                }
                const iconDivIframe = document.createElement('i');
                iconDivIframe.innerHTML = '<i class="fas fa-phone-volume"></i>';

                iframePhone.appendChild(iconDivIframe);
                const phoneTextIframe = document.createTextNode(headerPhone.phone);

                iframePhone.appendChild(phoneTextIframe);


            }
            else{
                iframePhone.childNodes[1].textContent = headerPhone.phone ;
            }

            iframePhone.removeAttribute('style');
            iframePhone.removeAttribute('disabled');
        }




        for(let i = 0; i < this.props.virtualDom.length; i++){

            let icon = null;

            let newDom = this.props.virtualDom[i].html.cloneNode(this.props.virtualDom[i].html);
            //DOMHelper.unwrapTextNodes(newDom);
            //DOMHelper.unwrapImages(newDom);
            const phoneDom = newDom.querySelector('.info-phone');
            const emailDom = newDom.querySelector('.info-email');
            if(emailDom.querySelector('i')){
                 icon= emailDom.querySelector('i');
            }



            if(headerPhone.phone === ''){
                if(phoneDom){
                    phoneDom.innerHTML = '';
                    phoneDom.style.display = 'none';
                    phoneDom.setAttribute('disabled', '1');
                    phoneDom.remove();
                }

            }
            else{

                if(icon){
                    while(phoneDom.firstChild){
                        phoneDom.firstChild.remove();
                    }
                    const iconDiv = document.createElement('i');
                    iconDiv.innerHTML = '<i class="fas fa-phone-volume"></i>';

                    phoneDom.appendChild(iconDiv);
                    const phoneText = document.createTextNode(headerPhone.phone);

                    phoneDom.appendChild(phoneText);


                }
                else{
                    phoneDom.childNodes[1].textContent = headerPhone.phone;
                }

                phoneDom.removeAttribute('style');
                phoneDom.removeAttribute('disabled');


            }

            const virtualDomObj = {
                name: this.props.virtualDom[i].name,
                html: newDom
            }



            newVirtualDom.push(virtualDomObj);




        }
        this.props.virtualDomChanged(newVirtualDom);
        this.closeAccord();






    }
    saveHeaderEmailChange = (e) => {
        e.preventDefault();

        const {headerEmail} = this.state;
        const iframe = document.querySelector('iframe');
        let newVirtualDom = [];
        let iconIframe = null;

        const phoneIframeDom = iframe.contentDocument.querySelector('.info-phone');
        if(phoneIframeDom.querySelector('i')){
            iconIframe = phoneIframeDom.querySelector('i');
        }

        const iframeEmail = iframe.contentDocument.querySelector('.info-email');

        if(headerEmail.email === ''){

            if(iframeEmail){
                iframeEmail.innerHTML = '';
                iframeEmail.style.display = 'none';
                iframeEmail.setAttribute('disabled', '1');
            }

        }
        else{

            if(iconIframe){
                while(iframeEmail.firstChild){
                    iframeEmail.firstChild.remove();
                }


                const iconDivIframe = document.createElement('i');
                iconDivIframe.innerHTML = '<i class="fas fa-envelope"></i>';

                iframeEmail.appendChild(iconDivIframe);
                const emailTextIframe = document.createTextNode(headerEmail.email);
                iframeEmail.appendChild(emailTextIframe);

            }
            else{
                emailDom.childNodes[1].textContent = headerEmail.email;
                iframeEmail.childNodes[1].textContent = headerEmail.email ;
            }

            iframeEmail.removeAttribute('style');
            iframeEmail.removeAttribute('disabled');
        }


        for(let i = 0; i < this.props.virtualDom.length; i++){

            let icon = null;

            let newDom = this.props.virtualDom[i].html.cloneNode(this.props.virtualDom[i].html);
            //DOMHelper.unwrapTextNodes(newDom);
            //DOMHelper.unwrapImages(newDom);
            const phoneDom = newDom.querySelector('.info-phone');
            const emailDom = newDom.querySelector('.info-email');
            if(phoneDom.querySelector('i')){
                icon= phoneDom.querySelector('i');
            }

            if(headerEmail.email === ''){

                if(emailDom){
                    emailDom.innerHTML = '';
                    emailDom.style.display = 'none';
                    emailDom.setAttribute('disabled', '1');
                    emailDom.remove();
                }

            }
            else{

                if(icon){
                    while(emailDom.firstChild){
                        emailDom.firstChild.remove();
                    }

                    const iconDiv = document.createElement('i');
                    iconDiv.innerHTML = '<i class="fas fa-envelope"></i>';

                    emailDom.appendChild(iconDiv);
                    const emailText = document.createTextNode(headerEmail.email);

                    emailDom.appendChild(emailText);




                }
                else{
                    emailDom.childNodes[1].textContent = headerEmail.email;

                }

                emailDom.removeAttribute('style');
                emailDom.removeAttribute('disabled');


            }

            const virtualDomObj = {
                name: this.props.virtualDom[i].name,
                html: newDom
            }



            newVirtualDom.push(virtualDomObj);




        }
        this.props.virtualDomChanged(newVirtualDom);
        this.closeAccord();






    }

    deletePhone = (e) => {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить данные о телефоне?", {labels: {ok: "Ok", cancel: 'Отмена'}})
            .then(() => {

                this.setState(({headerPhone}) => {
                    const newPhone = {};
                    newPhone.phone = '';

                    return {
                        headerPhone: newPhone
                    }
                })
            })
            .then(() => {UIkit.modal("#menu-modal").show();})

    };
    deleteEmail = (e) => {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить данные о email?", {labels: {ok: "Ok", cancel: 'Отмена'}})
            .then(() => {

                this.setState(({headerEmail}) => {
                    const newEmail = {};
                    newEmail.email = '';
                    return {
                        headerEmail: newEmail
                    }
                })
            })
            .then(() => {UIkit.modal("#menu-modal").show();})

    };
    changePhone = (e) => {
        this.setState(({headerPhone}) =>{
            const newPhone = {};
            newPhone.phone = e.target.value;

            return{
                headerPhone: newPhone
            }
        })

    };
    changeEmail = (e) => {
        this.setState(({headerEmail}) =>{
            const newEmail = {};
            newEmail.email = e.target.value;
            return{
                headerEmail: newEmail
            }
        })

    };
    addMainMenu = (e) => {
        e.preventDefault();
        const newMenuItem = {};
        if(this.props.currentSiteType === 'landing'){

            newMenuItem.index = this.state.headerMenu.length;
            newMenuItem.name = 'Новый пункт меню';
            newMenuItem.link = '#about';
            newMenuItem.parent = 'user';
            newMenuItem.children = [];


        }
        if(this.props.currentSiteType === 'manyPage') {

            newMenuItem.index = this.state.headerMenu.length;
            newMenuItem.name = 'Новый пункт меню';
            newMenuItem.link = 'index.html';
            newMenuItem.parent = 'user';
            newMenuItem.children = [];
        }
        this.setState(({headerMenu}) =>{
            const newMenuItems = [...headerMenu, newMenuItem];
            return{
                headerMenu: newMenuItems


            }
        });

        UIkit.modal("#menu-modal").show();
    }
    addMenuItem = (e, index) => {
        e.preventDefault();

        const newMenuItem = {};

        if(this.props.currentSiteType === 'manyPage'){

            const parent = this.getMenuItemByIndex(index);

            newMenuItem.index = index + '.' + parent.children.length;
            newMenuItem.name = 'Новый пункт меню';
            newMenuItem.link = 'index.html';
            newMenuItem.parent = 'user';
            newMenuItem.children = [];

            let indexArray = [];

            if(index.toString().indexOf('.') !== -1){
                indexArray = index.split('.');
            }
            else{
                indexArray.push(index);
            }

            if(indexArray.length === 1){
                this.setState(({headerMenu}) => {
                    const mainParent = this.getMenuItemByIndex(+indexArray[0]);

                    const parent = {};
                    parent.index = mainParent.index;
                    parent.name = mainParent.name;
                    parent.link = mainParent.link;
                    parent.parent = mainParent.parent;
                    parent.children = [...mainParent.children, newMenuItem];



                    mainParent.children.push(newMenuItem);
                    const newHeaderMenu = [
                        ...headerMenu.slice(0, +indexArray[0]),
                        parent,
                        ...headerMenu.slice(+indexArray[0]+1)
                    ];
                    return{
                        headerMenu: newHeaderMenu


                    }
                })
            }
            else if(indexArray.length === 2){

                this.setState(({headerMenu}) => {

                    const mainParent = this.getMenuItemByIndex(+indexArray[0]);

                    const parent = {};
                    parent.index = mainParent.index;
                    parent.name = mainParent.name;
                    parent.link = mainParent.link;
                    parent.parent = mainParent.parent;
                    parent.children = mainParent.children;

                    parent.children[+indexArray[1]].children.push(newMenuItem);

                    const newHeaderMenu = [
                        ...headerMenu.slice(0, +indexArray[0]),
                        parent,
                        ...headerMenu.slice(+indexArray[0]+1)
                    ];

                    return {
                        headerMenu: newHeaderMenu
                    }
                })
            }

            UIkit.modal("#menu-modal").show();

        }



    };
    saveMenuChange = (e) =>  {

        const {headerMenu} = this.state;


        const iframe = document.querySelector('iframe');

        if(this.props.currentSiteType === 'landing'){

            let newVirtualDom = [];

            let newDom = this.props.virtualDom[0].html.cloneNode(this.props.virtualDom[0].html);
            //DOMHelper.unwrapTextNodes(newDom);
            //DOMHelper.unwrapImages(newDom);
            //const sections = newDom.querySelectorAll('section');

            // sections.forEach((section) => {
            //     const sectionName = section.id;
            //
            //     const arraySectionExist = headerMenu.filter((headerLink) => {
            //         return headerLink.link.slice(1) === sectionName;
            //     });
            //
            //     if(arraySectionExist.length < 1 && sectionName !=='header' && sectionName !=='footer'){
            //
            //         const iframeSection = iframe.contentDocument.querySelector('#'+sectionName);
            //         section.remove();
            //         iframeSection.remove();
            //     }
            // });

            //const footer = newDom.querySelector('.footer');
           // const iframeFooter = iframe.contentDocument.querySelector('.footer');

            //const footerDeleteId = iframeFooter.querySelector('delete-section').getAttribute('deletesectionid');

            //let currentDeleteSectionId = +footerDeleteId + 1;
// console.log(headerMenu);
//             headerMenu.forEach((item) => {
//
//                 const sectionLinkName =  item.link.slice(1);
//                 //if(item.parent === 'user'){
//                     const newSection = document.createElement('section');
//                     newSection.setAttribute('id', sectionLinkName);
//
//                     const container = document.createElement('div');
//                     container.classList.add('container');
//                     const title = document.createElement('div');
//                     title.classList.add('title', 'h2');
//                     title.innerText = 'Новая секция';
//                     container.appendChild(title);
//                     newSection.appendChild(container);
//
//                     const newSectionWihDelete = DOMHelper.addSectionPanel(newSection);
//
//                     newSectionWihDelete.setAttribute('deletesectionid', currentDeleteSectionId);
//
//                     currentDeleteSectionId = +currentDeleteSectionId +1;
//
//                     const delButton = newSectionWihDelete.querySelector(".delete-button");
//                     const changeButton = newSectionWihDelete.querySelector('.change-button');
//
//
//                     delButton.addEventListener('mouseover', (e)=> {
//                         delButton.style.opacity = '1';
//                         delButton.style.cursor = 'pointer';
//                     });
//                     changeButton.addEventListener('mouseover', (e)=> {
//                         changeButton.style.opacity = '1';
//                         changeButton.style.cursor = 'pointer';
//                     });
//                     delButton.addEventListener('mouseleave', (e)=> {
//                         delButton.style.opacity = '.8';
//                     });
//                     changeButton.addEventListener('mouseleave', (e)=> {
//                         changeButton.style.opacity = '.8';
//
//                     });
//                     changeButton.addEventListener('click', (e)=> {
//                         UIkit.modal.confirm("Вам нужно сначала наполнить данную секцию содержимым. Для этого " +
//                             "воспользуйтесь банком блоков.", {labels: {ok: "Удалить", cancel: 'Отмена'}})
//
//                     });
//                     delButton.addEventListener('click', (e)=> {
//                         UIkit.modal.alert("Вы действительно хотите далить блок из структуры сайта? " +
//                             "Все несохраненные данные будут потеряны!", {labels: {ok: "Ok"}})
//                             .then(() => {
//                                 newSectionWihDelete.remove();
//                                 newSectionWihDelete.remove();
//
//                             })
//
//
//                     });
//
//
//
//
//
//                     newDom.insertBefore(newSectionWihDelete, footer);
//                     iframe.contentDocument.body.insertBefore(newSectionWihDelete, iframeFooter);
//
//                 //}
//             })


            const menuItems = newDom.querySelectorAll('.menu_main li');
            const menu = newDom.querySelector('.menu_main');

            const iframeMenuItems = iframe.contentDocument.querySelectorAll('.menu_main li');
            const iframeMenu = iframe.contentDocument.querySelector('.menu_main ');

            const footerMenuItems = newDom.querySelectorAll('.footer__menu-sitemap li');
            const footerMenu = newDom.querySelector('.footer__menu-sitemap');

            const iframeFooterMenuItems = iframe.contentDocument.querySelectorAll('.footer__menu-sitemap li');
            const iframeFooterMenu = iframe.contentDocument.querySelector('.footer__menu-sitemap');



            if(headerMenu.length === 0){

                menu.remove();
                iframeMenu.remove();
                footerMenu.remove();
                iframeFooterMenu.remove();
            }
            else{
                if(headerMenu.length < menuItems.length){

                    menuItems.forEach((item, i) => {
                        if(i >= headerMenu.length){
                            item.remove();
                        }

                    });

                    iframeMenuItems.forEach((item, i) => {
                        if(i >= headerMenu.length){
                            item.remove();
                        }

                    });
                    if(footerMenuItems.length > 0){
                        footerMenuItems.forEach((item, i) => {
                            if(i >= headerMenu.length){
                                item.remove();
                            }

                        });

                        iframeFooterMenuItems.forEach((item, i) => {
                            if(i >= headerMenu.length){
                                item.remove();
                            }

                        });
                    }


                }

                if(headerMenu.length > menuItems.length){


                    headerMenu.forEach((slideItem, i) => {
                        if(i >= menuItems.length){
                            const newItem = menuItems[0].cloneNode(true);
                            menu.querySelector('ul').appendChild(newItem);
                        }

                    });

                    headerMenu.forEach((slideItem, i) => {
                        if(i >= iframeMenuItems.length){
                            const newItem = iframeMenuItems[0].cloneNode(true);
                            iframeMenu.querySelector('ul').appendChild(newItem);
                        }

                    });

                    if(footerMenuItems.length > 0){

                        headerMenu.forEach((slideItem, i) => {
                            if(i >= footerMenuItems.length){
                                const newItem = footerMenuItems[0].cloneNode(true);
                                footerMenu.appendChild(newItem);
                            }

                        });

                        headerMenu.forEach((slideItem, i) => {
                            if(i >= iframeFooterMenuItems.length){
                                const newItem = iframeFooterMenuItems[0].cloneNode(true);
                                iframeFooterMenu.appendChild(newItem);
                            }

                        });
                    }



                }
                const itemsMenuAfter = newDom.querySelectorAll('.menu_main li');

                const iframeMenuAfter = iframe.contentDocument.querySelectorAll('.menu_main li');

                const footerMenuItemsAfter = newDom.querySelectorAll('.footer__menu-sitemap li');

                const iframeFooterMenuItemsAfter = iframe.contentDocument.querySelectorAll('.footer__menu-sitemap li');


                iframeMenuAfter.forEach((item, i) => {

                    item.querySelector('a').setAttribute('href', headerMenu[i].link);
                    item.querySelector('a').innerHTML = headerMenu[i].name;

                });
                itemsMenuAfter.forEach((item, i) => {

                    item.querySelector('a').setAttribute('href', headerMenu[i].link);
                    item.querySelector('a').innerHTML = headerMenu[i].name;

                });


                footerMenuItemsAfter.forEach((item, i) => {

                    item.querySelector('a').setAttribute('href', headerMenu[i].link);
                    item.querySelector('a').innerHTML = headerMenu[i].name;

                });
                iframeFooterMenuItemsAfter.forEach((item, i) => {

                    item.querySelector('a').setAttribute('href', headerMenu[i].link);
                    item.querySelector('a').innerHTML = headerMenu[i].name;

                });
            }



            const virtualDomObj = {
                name: this.props.virtualDom[0].name,
                html: newDom
            }


            newVirtualDom.push(virtualDomObj);


            this.props.virtualDomChanged(newVirtualDom);
            this.closeAccord();

        }
        if(this.props.currentSiteType === 'manyPage'){

            let currentVirtualDom = [];

            const pages = this.props.virtualDom;
            let linkArray = [];
            currentVirtualDom = pages;
            //
            //
            // headerMenu.forEach((item) =>{
            //
            //     linkArray.push(item);
            //
            //     if(item.children.length > 0){
            //         item.children.forEach((firstChild) => {
            //             linkArray.push(firstChild);
            //
            //             if(firstChild.children.length > 0){
            //                 linkArray = [...linkArray, ...firstChild.children];
            //             }
            //         });
            //
            //     }
            //
            //
            // });
            //
            // pages.forEach((page) => {
            //     const pageName = page.name.toLowerCase() + '.html';
            //
            //
            //     const arrayPagesExist = linkArray.filter((headerLink) => {
            //         return headerLink.link === pageName;
            //     });
            //
            //     if(arrayPagesExist.length < 1){
            //
            //         fetch("../../api/deletePage.php", {
            //             method: 'POST',
            //             body: JSON.stringify({name: pageName})
            //         })
            //             .then((res) => {
            //                 if(!res.ok){
            //                     throw Error(res.statusText)
            //                 }
            //             })
            //
            //         currentVirtualDom = pages.filter((pageObj) => {
            //             return pageObj.name !== page.name;
            //         });
            //
            //
            //
            //     }
            // });
            //
            // linkArray.forEach((item) => {
            //
            //     if(item.parent === 'user'){
            //         const pageLinkName =  item.link;
            //
            //         let content = currentVirtualDom[0].html.cloneNode(currentVirtualDom[0].html);
            //         let contentSection = content.querySelectorAll('section');
            //         contentSection.forEach((item) => {
            //             item.remove();
            //         });
            //         let elem = document.createElement('div');
            //         elem.appendChild(content);
            //
            //         const contentText = elem.innerHTML;
            //
            //         const head = `<!DOCTYPE html><html lang="ru"><head>
            //         <meta charSet="UTF-8">
            //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
            //
            //         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
            //             <title>Title</title>
            //             <!-- Latest compiled and minified CSS -->
            //                 <link rel="stylesheet" href="../assets/bootstrap.min.css">
            //                 <link rel="stylesheet" href="../assets/animate.css">
            //
            //                 <link rel="stylesheet" href="style.css">
            //                 <link rel="stylesheet" href="fontStyle.css">
            //                 <link rel="stylesheet" href="theme.css">`+
            //             this.props.currentFontStyle.link +
            //
            //             `</head>`;
            //         const js = `
            //         <script src="../assets/wow.js"></script>
            //         <script src="main.js"></script>
            //
            //         </html>
            //     `;
            //         const contentStr = head + contentText + js;
            //
            //         fetch("../../api/createHtmlPage.php", {
            //             method: 'POST',
            //             body: JSON.stringify({name: pageLinkName, content: contentStr})
            //         })
            //             .then((res) => {
            //                 if(!res.ok){
            //                     throw Error(res.statusText)
            //                 }
            //             })
            //
            //         const virtualDomObj = {
            //             name: item.link.slice(0, -5),
            //             html: content
            //         }
            //         currentVirtualDom.push(virtualDomObj);
            //     }
            // });


            const newCurrentVirtualDom = [];
            for(let i = 0; i < currentVirtualDom.length; i++){

                let newDom = this.props.virtualDom[0].html.cloneNode(this.props.virtualDom[0].html);

                let menu = newDom.querySelector('.menu_main');

                const iframeMenu = iframe.contentDocument.querySelector('.menu_main ');


                const footerMenu = newDom.querySelector('.footer__menu-sitemap');

                const iframeFooterMenu = iframe.contentDocument.querySelector('.footer__menu-sitemap');

                if(iframeFooterMenu){
                    while(iframeFooterMenu.firstChild){
                        iframeFooterMenu.removeChild(iframeFooterMenu.firstChild);
                    }
                }


                let menuBlock = document.createElement('ul');
                menuBlock.classList.add('menu-sitemap');


                headerMenu.forEach((item, index) => {

                    if(item.children.length > 0){

                        let menuLi = document.createElement('li');
                        let link = document.createElement('a');
                        link.classList.add('linkSize');
                        link.setAttribute('href', item.link);
                        link.innerHTML = item.name;
                        menuLi.appendChild(link);

                        let childUl = document.createElement('ul');
                        menuLi.appendChild(childUl);

                        item.children.map((itemChild, indexChild) => {

                            if(itemChild.children.length > 0){
                                let childLi = document.createElement('li');
                                let childLink = document.createElement('a');
                                childLink.classList.add('linkSize');
                                childLink.setAttribute('href', itemChild.link);
                                childLink.innerHTML = itemChild.name;
                                childLi.appendChild(childLink);
                                childUl.appendChild(childLi);

                                let secondChildUl = document.createElement('ul');
                                childLi.appendChild(secondChildUl);
                                itemChild.children.map((secondChild, indexChild) => {

                                    let secondChildLi = document.createElement('li');
                                    let secondChildLink = document.createElement('a');
                                    secondChildLink.classList.add('linkSize');
                                    secondChildLink.setAttribute('href', secondChild.link);
                                    secondChildLink.innerHTML = secondChild.name;
                                    secondChildLi.appendChild(secondChildLink);
                                    secondChildUl.appendChild(secondChildLi);
                                });

                            }
                            else{
                                let childLi = document.createElement('li');
                                let childLink = document.createElement('a');
                                childLink.classList.add('linkSize');
                                childLink.setAttribute('href', itemChild.link);
                                childLink.innerHTML = itemChild.name;
                                childLi.appendChild(childLink);
                                childUl.appendChild(childLi);
                            }


                        });
                        const copyMenuLi = menuLi.cloneNode(true);
                        menuBlock.appendChild(menuLi);
                        if(iframeFooterMenu){
                            iframeFooterMenu.appendChild(copyMenuLi);
                        }


                    }
                    else{
                        let menuLi = document.createElement('li');
                        let link = document.createElement('a');
                        link.classList.add('linkSize');
                        link.setAttribute('href', item.link);
                        link.innerHTML = item.name;
                        menuLi.appendChild(link);
                        const copyMenuLi = menuLi.cloneNode(true);
                        menuBlock.appendChild(menuLi);
                        if(iframeFooterMenu){
                            iframeFooterMenu.appendChild(copyMenuLi);
                        }


                    }



                });

                if(headerMenu.length === 0){

                    menu.remove();
                    iframeMenu.remove();
                    footerMenu.remove();
                    iframeFooterMenu.remove();
                }
                else{

                    while(iframeMenu.firstChild){
                        iframeMenu.removeChild(iframeMenu.firstChild);
                    }


                    iframeMenu.appendChild(menuBlock);

                }

                const virtualDomObj = {
                    name: currentVirtualDom[i].name,
                    html: iframe.contentDocument
                }
                newCurrentVirtualDom.push(virtualDomObj);
            }

            this.props.virtualDomChanged(newCurrentVirtualDom);
            this.closeAccord();
        }
    };
    deleteMenuItem = (e, index) => {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить данный пункт? " +
                     "Все несохраненные данные будут потеряны! Также из структуры сайта будет удалена секция, за которую отвечает данный пункт меню.", {labels: {ok: "Удалить", cancel: 'Отмена'}})

                     .then(() => {
                         if(this.state.headerMenu.length < 2){
                             this.setState(({headerMenu}) => {
                                 return {
                                     headerMenu: []
                                 }
                             })
                         }
                         else{
                             let indexArray = [];

                             if(index.toString().indexOf('.') !== -1){
                                 indexArray = index.split('.');
                             }
                             else{
                                 indexArray.push(index);
                             }

                             if(indexArray.length === 1){
                                 this.setState(({headerMenu}) => {

                                     const newHeaderMenu = [
                                         ...headerMenu.slice(0, indexArray[0]),
                                         ...headerMenu.slice(indexArray[0]+1)
                                     ];

                                     newHeaderMenu.forEach((item, j) => {
                                         item.index = j;
                                         if(item.children.length > 0){
                                             item.children.forEach((childItem)=>{
                                                 childItem.index = j + childItem.index.slice(1);

                                                 if(childItem.children.length > 0){
                                                     childItem.children.forEach((secondChildItem)=> {
                                                         secondChildItem.index = j + secondChildItem.index.slice(1);
                                                     });
                                                 }
                                             });
                                         }
                                     });

                                     return {
                                         headerMenu: newHeaderMenu
                                     }
                                 })
                             }
                             else if(indexArray.length === 2){

                                 this.setState(({headerMenu}) => {

                                     const newMainItem = {};
                                     newMainItem.name = headerMenu[indexArray[0]].name;
                                     newMainItem.index = headerMenu[indexArray[0]].index;
                                     newMainItem.link = headerMenu[indexArray[0]].link;
                                     newMainItem.parent = headerMenu[indexArray[0]].parent;
                                     newMainItem.children = headerMenu[indexArray[0]].children;

                                     newMainItem.children.splice(indexArray[1], 1);

                                     newMainItem.children.forEach((item, j) => {
                                         item.index = item.index.slice(0, 2) + j;
                                     });



                                     const newHeaderMenu = [
                                         ...headerMenu.slice(0, +indexArray[0]),
                                         newMainItem,
                                         ...headerMenu.slice(+indexArray[0]+1)
                                     ];


                                     return {
                                         headerMenu: newHeaderMenu
                                     }
                                 })
                             }
                             else{
                                 this.setState(({headerMenu}) => {

                                     const newMainItem = headerMenu[indexArray[0]];
                                     const newSecondItem = newMainItem.children[indexArray[1]];

                                     newSecondItem.children.splice(indexArray[2], 1);

                                     newSecondItem.children.forEach((item, j) => {
                                         item.index = item.index.slice(0, 4) + j;
                                     });


                                     const newHeaderMenu = [
                                         ...headerMenu.slice(0, +indexArray[0]),
                                         newMainItem,
                                         ...headerMenu.slice(+indexArray[0]+1)
                                     ];


                                     return {
                                         headerMenu: newHeaderMenu
                                     }
                                 })
                             }
                         }
                     })
                    .then(() => {

                        let input = document.querySelector('.main-heading-input');
                        let inputLink = document.querySelector('.main-text-input');
                        let button = document.querySelector('.del-li');


                        if(input){
                            input.value = '';
                            input.placeholder = '';
                        }
                        if(inputLink){
                            inputLink.value = '';
                            inputLink.placeholder = '';
                        }
                        if(button){
                            button.setAttribute('disabled', 'true');
                        }


                    })
                    .then(() => {UIkit.modal("#menu-modal").show();});



    };
    changeTextLink = (e, index) => {
        e.preventDefault();
        const {headerMenu} = this.state;

        //if(headerMenu[index].parent === 'user' && this.props.currentSiteType === 'landing'){
        if(this.props.currentSiteType === 'landing'){
            const link = e.target.value;

            const newLink = '#'+link;

            this.setState(({headerMenu, liActive}) => {
                const newHeaderMenuItem = {
                    ...headerMenu[index],
                    link: newLink
                };

                const newLiActive = {};
                newLiActive.index = liActive.index;
                newLiActive.name = liActive.name;
                newLiActive.link = newLink;
                newLiActive.parent = liActive.parent;
                newLiActive.children = liActive.children;

                return {
                    headerMenu: [
                        ...headerMenu.slice(0, index),
                        newHeaderMenuItem,
                        ...headerMenu.slice(index+1)
                    ],
                    liActive: newLiActive
                }
            })




            //if( /^\S*$/.test(newLink) === true){


            //}
            // else{
            //     UIkit.modal.alert('Ссылка должна включать в себя только буквы латинского алфавита и цифры, без пробелов!', {labels:{ok: "Ok"}})
            //         .then(() => {UIkit.modal("#menu-modal").show();})
            // }

        }
        else if(this.props.currentSiteType === 'manyPage'){

            const newLink = e.target.value;
            this.setState(({headerMenu, liActive}) => {
                const li = this.getMenuItemByIndex(index);
                const newHeaderMenuItem = {
                    ...li,
                    link: e.target.value
                };


                let indexArray = [];

                if(index.toString().indexOf('.') !== -1){
                    indexArray = index.split('.');
                }
                else{
                    indexArray.push(index);
                }

                const newLiActive = {};
                newLiActive.index = liActive.index;
                newLiActive.name = liActive.name;
                newLiActive.link = newLink;
                newLiActive.parent = liActive.parent;
                newLiActive.children = liActive.children;

                if(indexArray.length === 1){
                    return {
                        headerMenu: [
                            ...headerMenu.slice(0, indexArray[0]),
                            newHeaderMenuItem,
                            ...headerMenu.slice(indexArray[0]+1)
                        ],
                        liActive: newLiActive
                    }
                }
                else if(indexArray.length === 2){

                    let newMainLi = headerMenu[indexArray[0]];
                    newMainLi.children[indexArray[1]] = newHeaderMenuItem;

                    return {
                        headerMenu: [
                            ...headerMenu.slice(0, indexArray[0]),
                            newMainLi,
                            ...headerMenu.slice(indexArray[0]+1)
                        ],
                        liActive: newLiActive
                    }
                }
                else{
                    let newMainLi = headerMenu[indexArray[0]];
                    let secondLi = newMainLi.children[indexArray[1]];
                    secondLi.children[indexArray[2]] = newHeaderMenuItem;
                    return {
                        headerMenu: [
                            ...headerMenu.slice(0, indexArray[0]),
                            newMainLi,
                            ...headerMenu.slice(indexArray[0]+1)
                        ],
                        liActive: newLiActive
                    }
                }




            })
            // if( /^\S*\w\.html/.test(newLink) === true){
            //
            //     this.setState(({headerMenu}) => {
            //         const newHeaderMenuItem = {
            //             ...headerMenu[index],
            //             link: e.target.value
            //         };
            //
            //         return {
            //             headerMenu: [
            //                 ...headerMenu.slice(0, index),
            //                 newHeaderMenuItem,
            //                 ...headerMenu.slice(index+1)
            //             ]
            //         }
            //     })
            // }
            // else{
            //     UIkit.modal.alert('Ссылка должна включать в себя только буквы латинского алфавита и цифры, без пробелов! В конце ссылки должно быть указано ' +
            //         'расширение файла .html', {labels:{ok: "Ok"}})
            //         .then(() => {UIkit.modal("#menu-modal").show();})
            // }
        }
        // else{
        //     UIkit.modal.alert('Вы не можете изменять ссылку! Вы можете создать новый пункт меню' +
        //         'с необходимыми параметрами.', {labels:{ok: "Ok"}})
        //         .then(() => {UIkit.modal("#menu-modal").show();})
        //
        // }

    };
    deleteLogo(e){
        e.preventDefault();

            UIkit.modal.alert("Вы действительно хотите удалить логотип?", {labels: {ok: "Ok", cancel: 'Отмена'}})
                .then(() => {

                    this.setState(({headerLogo}) => {

                        const newHeaderLogo = headerLogo;
                        newHeaderLogo.img = '';
                        newHeaderLogo.alt = '';

                        return {
                            headerLogo: newHeaderLogo
                        }
                    })
                })
                .then(() => {UIkit.modal("#menu-modal").show();})


    }
    saveHeaderLogoChange = (e) => {

        e.preventDefault();

        const {img, alt} = this.state.headerLogo;
        let newVirtualDom = [];

        for(let i = 0; i < this.props.virtualDom.length; i++){

                    let newDom = this.props.virtualDom[i].html.cloneNode(this.props.virtualDom[i].html);
                    DOMHelper.unwrapTextNodes(newDom);
                    DOMHelper.unwrapImages(newDom);
                    const logo= newDom.querySelectorAll('.logo img')[0];
                    const logoBlock= newDom.querySelectorAll('.logo')[0];

                    const iframe = document.querySelector('iframe');
                    const iframeLogo = iframe.contentDocument.querySelectorAll('.logo img')[0];
                    const iframeLogoBlock = iframe.contentDocument.querySelectorAll('.logo')[0];


                    if(this.state.headerLogo.img === ''){

                        if(logo){
                            logo.remove();
                            logoBlock.style.display = 'none';
                            logoBlock.setAttribute('disabled', '1');
                        }
                        if(iframeLogo){
                            iframeLogo.remove();
                            iframeLogoBlock.style.display = 'none';
                            iframeLogoBlock.setAttribute('disabled', '1');
                        }

                    }
                    else {
                        if(logoBlock && logo){
                            logo.setAttribute('src', img);
                            logo.setAttribute('alt', alt);

                        }
                        else{
                            const newLogoBlock = newDom.querySelector('.logo');
                            newLogoBlock.removeAttribute('style');
                            newLogoBlock.removeAttribute('disabled');

                            const newLogo = document.createElement('img');
                            newLogo.setAttribute('src', img);
                            newLogo.setAttribute('alt', alt);
                            newLogoBlock.appendChild(newLogo);


                        }


                        if(iframeLogoBlock && iframeLogo){
                            iframeLogo.setAttribute('src', img);
                            iframeLogo.setAttribute('alt', alt);

                        }
                        else{
                            const newIframeLogoBlock = iframe.contentDocument.querySelectorAll('.logo')[0];
                            newIframeLogoBlock.removeAttribute('style');
                            newIframeLogoBlock.removeAttribute('disabled');

                            const newIframeLogo = document.createElement('img');
                            newIframeLogo.setAttribute('src', img);
                            newIframeLogo.setAttribute('alt', alt);
                            newIframeLogoBlock.appendChild(newIframeLogo);

                        }

                    }

                    const virtualDomObj = {
                        name: this.props.virtualDom[i].name,
                        html: newDom
                    }



                newVirtualDom.push(virtualDomObj);




        }
        this.props.virtualDomChanged(newVirtualDom);
        this.closeAccord();
    }
    changeLogoImage = (e) =>{

        if(e.target.files && e.target.files[0]){
            let formData = new FormData();
            formData.append("image", e.target.files[0]);

            fetch('../api/uploadImage.php', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then((res) => {

                    this.setState(({headerLogo}) => {

                        const newLogo = this.state.headerLogo;
                        newLogo.img = `../userDir/images/${res}`;

                        return {
                            headerLogo: newLogo
                        }
                    })
                })
                .catch(() => this.showNotifications('Ошибка сохранения', 'danger'))






        }
    }
    changeLogoAlt = (e) => {
        this.setState(({headerLogo}) => {
            const newHeaderLogo = headerLogo;
            newHeaderLogo.alt = e.target.value;
            return {
                headerLogo: newHeaderLogo
            }
        })
    }

    changeAddress = (e) => {
        this.setState(({headerAddress}) =>{
            const newAddress = {};
            newAddress.address = e.target.value;
            return{
                headerAddress: newAddress
            }
        })
    }

    deleteAddress = (e) => {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить данные об адресе?", {labels: {ok: "Ok", cancel: 'Отмена'}})
            .then(() => {

                this.setState(({headerAddress}) => {
                    const newAddress = {};
                    newAddress.address = '';
                    return {
                        headerAddress: newAddress
                    }
                })
            })
            .then(() => {UIkit.modal("#menu-modal").show();})
    }

    saveHeaderAddressChange = (e) => {
        e.preventDefault();

        const {headerAddress} = this.state;
        const iframe = document.querySelector('iframe');
        let newVirtualDom = [];
        let iconIframe = null;

        const addressIframeDom = iframe.contentDocument.querySelector('.adress');
        if(addressIframeDom.querySelector('i')){
            iconIframe = addressIframeDom.querySelector('i');
        }


        if(headerAddress.address === ''){

            if(addressIframeDom){
                addressIframeDom.innerHTML = '';
                addressIframeDom.style.display = 'none';
                addressIframeDom.setAttribute('disabled', '1');
            }

        }
        else{

            if(iconIframe){
                while(addressIframeDom.firstChild){
                    addressIframeDom.firstChild.remove();
                }


                const iconDivIframe = document.createElement('i');
                iconDivIframe.innerHTML = '<i class="fas fa-map-marker-alt"></i>';

                addressIframeDom.appendChild(iconDivIframe);
                const addressTextIframe = document.createTextNode(headerAddress.email);
                addressIframeDom.appendChild(addressTextIframe);

            }
            else{
                addressIframeDom.childNodes[1].textContent = headerAddress.email ;
            }

            addressIframeDom.removeAttribute('style');
            addressIframeDom.removeAttribute('disabled');
        }


        for(let i = 0; i < this.props.virtualDom.length; i++){

            let icon = null;

            let newDom = this.props.virtualDom[i].html.cloneNode(this.props.virtualDom[i].html);
            //DOMHelper.unwrapTextNodes(newDom);
            //DOMHelper.unwrapImages(newDom);
            const addressDom = newDom.querySelector('.adress');

            if(addressDom.querySelector('i')){
                icon= addressDom.querySelector('i');
            }

            if(headerAddress.address === ''){

                if(addressDom){
                    addressDom.innerHTML = '';
                    addressDom.style.display = 'none';
                    addressDom.setAttribute('disabled', '1');
                    addressDom.remove();
                }

            }
            else{

                if(icon){
                    while(addressDom.firstChild){
                        addressDom.firstChild.remove();
                    }

                    const iconDiv = document.createElement('i');
                    iconDiv.innerHTML = '<i class="fas fa-map-marker-alt"></i>';

                    addressDom.appendChild(iconDiv);
                    const addressText = document.createTextNode(headerAddress.address);

                    addressDom.appendChild(addressText);




                }
                else{
                    addressDom.childNodes[1].textContent = headerAddress.address;

                }

                addressDom.removeAttribute('style');
                addressDom.removeAttribute('disabled');


            }

            const virtualDomObj = {
                name: this.props.virtualDom[i].name,
                html: newDom
            }



            newVirtualDom.push(virtualDomObj);




        }
        this.props.virtualDomChanged(newVirtualDom);
        this.closeAccord();






    }




    changeTitleLink = (e, index) => {

        this.setState(({headerMenu}) => {
            const li = this.getMenuItemByIndex(index);
            const newHeaderMenuItem = {
                ...li,
                name: e.target.value
            };

            let indexArray = [];

            if(index.toString().indexOf('.') !== -1){
                indexArray = index.split('.');
            }
            else{
                indexArray.push(index);
            }

            if(indexArray.length === 1){
                return {
                    headerMenu: [
                        ...headerMenu.slice(0, indexArray[0]),
                        newHeaderMenuItem,
                        ...headerMenu.slice(indexArray[0]+1)
                    ]
                }
            }
            else if(indexArray.length === 2){

                let newMainLi = headerMenu[indexArray[0]];
                newMainLi.children[indexArray[1]] = newHeaderMenuItem;

                return {
                    headerMenu: [
                        ...headerMenu.slice(0, indexArray[0]),
                        newMainLi,
                        ...headerMenu.slice(indexArray[0]+1)
                    ]
                }
            }
            else{
                let newMainLi = headerMenu[indexArray[0]];
                let secondLi = newMainLi.children[indexArray[1]];
                secondLi.children[indexArray[2]] = newHeaderMenuItem;
                return {
                    headerMenu: [
                        ...headerMenu.slice(0, indexArray[0]),
                        newMainLi,
                        ...headerMenu.slice(indexArray[0]+1)
                    ]
                }
            }

        })
    };

    getHeaderMenuInfo = (e) => {
        
        const newDom = this.props.virtualDom[0].html.cloneNode(this.props.virtualDom[0].html);

        DOMHelper.unwrapTextNodes(newDom);
        DOMHelper.unwrapImages(newDom);
        const menuItems = newDom.querySelectorAll('.menu_main > ul > li');

        const sectionsName = [];
        const pagesName = [];

        if(this.props.currentSiteType === 'manyPage'){

            const pages = this.props.virtualDom;

            pages.forEach((page) => {
                const pageOgj = {};
                pageOgj.pageName = page.name.toLowerCase() + '.html';
                pagesName.push(pageOgj);
            })

        }
        else{
            const sections = newDom.querySelectorAll('section');

            if(sections.length > 0){

                sections.forEach((section) => {
                    const sectionName = section.getAttribute('id');

                    if(sectionName !=='header' && sectionName !=='footer'){
                        const sectionOgj = {};
                        sectionOgj.sectionName = sectionName;
                        sectionsName.push(sectionOgj);
                    }
                });
            }
        }



        const headerMenuItems = [];

        menuItems.forEach((menuItem, i) => {

            const item = {};
            item.index = i;
            item.name = menuItem.querySelector('a').innerHTML;
            item.link = menuItem.querySelector('a').getAttribute('href');
            item.parent = 'site';
            item.children = [];



            if(menuItem.querySelector('ul')){
                const menuLiItems = menuItem.querySelectorAll(':scope > ul > li');

                menuLiItems.forEach((menuLiItem, j) => {

                    const itemChild = {};
                    itemChild.index = i+'.'+(j);
                    itemChild.name = menuLiItem.querySelector('a').innerHTML;
                    itemChild.link = menuLiItem.querySelector('a').getAttribute('href');
                    itemChild.parent = 'site';
                    itemChild.children = [];

                    if(menuLiItem.querySelector('ul')) {
                        const menuLiChildItems = menuLiItem.querySelectorAll(':scope > ul > li');
                        menuLiChildItems.forEach((menuLiChildItem, k) => {
                            const itemSecondChild = {};
                            itemSecondChild.index = i + '.' + (j) + '.' + (k);
                            itemSecondChild.name = menuLiChildItem.querySelector('a').innerHTML;
                            itemSecondChild.link = menuLiChildItem.querySelector('a').getAttribute('href');
                            itemSecondChild.parent = 'site';
                            itemSecondChild.children = [];

                            itemChild.children.push(itemSecondChild);
                        })
                    }

                    item.children.push(itemChild);

                })

            }





            headerMenuItems.push(item);

        });


        this.setState(({headerMenu, existSections, existsPages}) =>{
            return{
                headerMenu: headerMenuItems,
                existSections: sectionsName,
                existPages: pagesName
            }
        })
    }

    getItemsHeader = (str) => {

        //const newDom = this.props.virtualDom[0].html.cloneNode(this.props.virtualDom[0].html);
        const newDom = document.querySelector('iframe');
        //DOMHelper.unwrapTextNodes(newDom);
        //DOMHelper.unwrapImages(newDom);
        //let iframeFromHTML =  HtmlObjectTransform.getObjectIframeFromHtml(newDom);
        const items = newDom.contentDocument.querySelectorAll(str);
        return items;
    }
    getHeaderLogoInfo = () => {

        const logo = this.getItemsHeader('.logo img')[0];

        this.setState(({headerLogo}) =>{

            const logoObj = headerLogo;
            if(logo){
                logoObj.img = logo.getAttribute('src');
                logoObj.alt = logo.getAttribute('alt');

            }
            else{
                logoObj.img = '';
                logoObj.alt = '';
            }
            return{
                headerLogo: logoObj
            }
        })

    }



    getHeaderPhoneInfo = (e) => {
        const phone = this.getItemsHeader('.info-phone')[0];
        let phoneNumber = '';
        if(phone){

            if(phone.childNodes.length > 1){
                phoneNumber = phone.childNodes[1].textContent;
            }
            else{
                phoneNumber = phone.innerHTML;
            }
        }
        else{
            phoneNumber = null;
        }
        this.setState(({headerPhone}) =>{
            const newPhone = {};
            newPhone.phone = phoneNumber;


            return{
                headerPhone: newPhone
            }
        })

    }

    getHeaderEmailInfo = () =>{
        const email = this.getItemsHeader('.info-email')[0];
        let emailStr = '';
        if(email){

            if(email.childNodes.length > 1){
                emailStr = email.childNodes[1].textContent;
            }
            else{
                emailStr = email.innerHTML;
            }
        }
        else{
            emailStr = null;
        }

        this.setState(({headerEmail}) =>{
            const newEmail = {};
            newEmail.email = emailStr;


            return{
                headerEmail: newEmail
            }
        })



    }

    getMenuItemByIndex = (index) => {

        const {headerMenu} = this.state;
        let indexArray = [];

        if(index.toString().indexOf('.') !== -1){
            indexArray = index.split('.');
        }
        else{
            return headerMenu[index];
        }

        const mainLi = headerMenu[+indexArray[0]];

        let secondLi = {};
        if(indexArray[1]){
            secondLi = mainLi.children[+indexArray[1]];
            if(indexArray[2]){
                return secondLi.children[+indexArray[2]];
            }else{
                return secondLi;
            }
        }


    }

    getInfoMenuItem = (e, index) => {
        e.preventDefault();

        let menuList = document.querySelectorAll('.menu-change a');
        let button = document.querySelector('.del-li');

        if(button && button.hasAttribute('disabled')){
            button.removeAttribute('disabled');
        }
        menuList.forEach((item) => {
            item.style.color = 'white';
        });

        e.target.style.color = 'blue';
        const li = this.getMenuItemByIndex(index);


        let input = document.querySelector('.main-heading-input');
        if(input){
            input.value = '';
        }

        this.setState((liActive, liIsActive) => {
            return {
                liActive: li,
                liIsActive: true
            }
        })


    }

    getHeaderAddressInfo = (e) => {
        const address = this.getItemsHeader('.adress')[0];

        let addressStr = '';
        if(address){

            if(address.childNodes.length > 1){
                addressStr = address.childNodes[2].textContent;
            }
            else{
                addressStr = address.innerHTML;
            }
        }
        else{
            addressStr = null;
        }

        this.setState(({headerAddress}) =>{
            const newAddress = {};
            newAddress.address = addressStr;


            return{
                headerAddress: newAddress
            }
        })
    }
    render() {
        const {target, modal} = this.props;
        const {headerMenu, existSections, existPages, headerPhone, headerEmail, headerLogo, liIsActive, liActive, headerAddress} = this.state;



        const classButtonDelete = 'uk-button uk-button-danger uk-modal-close';
        const classButtonDisabled = {
            display: 'none'
        };


        let headerMenuStr = '';
        let headerPhoneStr = '';
        let headerEmailStr = '';
        let headerAddressStr = '';
        let headerLogoStr = '';

        if (headerMenu) {
            const menuHtml = headerMenu.map((item, index) => {
                let liStr = '';
                if(item.children.length > 0){
                    let firstChildLi = '';

                    firstChildLi = item.children.map((itemChild, indexChild) => {

                        if(itemChild.children.length > 0){

                            let child = itemChild.children.map((itemSecondChild, indexSecondChild) => {
                                return <li className="uk-margin-left" key={indexSecondChild} data-header-menu={indexSecondChild  }><a onClick={(e) => {
                                    this.getInfoMenuItem(e, itemSecondChild.index)
                                }}>{itemSecondChild.name}</a></li>;
                            });
                            return <li className="uk-margin-left"  key={indexChild} data-header-menu={indexChild}><a onClick={(e) => {
                                this.getInfoMenuItem(e, itemChild.index)
                            }}>{itemChild.name}</a>
                                <ul>
                                    {child}
                                </ul>
                            </li>;
                        }
                        else{
                            return <li className="uk-margin-left" key={indexChild} data-header-menu={indexChild}><a onClick={(e) => {
                                this.getInfoMenuItem(e, itemChild.index)
                            }}>{itemChild.name}</a></li>;

                        }
                    });
                    liStr = <li key={index} data-header-menu={index}><a onClick={(e) => {
                        this.getInfoMenuItem(e, item.index)
                    }}>{item.name}</a>
                        <ul>
                            {firstChildLi}
                        </ul>
                    </li>;

                }
                else{
                    liStr = <li key={index} data-header-menu={index}><a onClick={(e) => {
                                             this.getInfoMenuItem(e, item.index)
                                         }}>{item.name}</a></li>;
                }
                return liStr;


            });

            let menuForm = '';
            let addButton = '';
            if(liIsActive){

                if(this.props.currentSiteType === 'manyPage' && (liActive.index.toString().indexOf('.')===-1 || liActive.index.split('.').length <= 2)){

                    addButton = <button onClick={(e) => {
                        this.addMenuItem(e, liActive.index)
                    }} className="uk-button uk-button-primary uk-margin-top del-li uk-modal-close" type="button">Добавить пункт
                    </button>
                }

                let sectionsList = '';
                let selectHtml = '';

                if(this.props.currentSiteType === 'manyPage'){
                    sectionsList = existPages.map((page) => {
                        return <option  key={page.pageName}>{page.pageName}</option>
                    });
                    selectHtml =  <select className="uk-select" value={liActive.link } onChange={(e) => {this.changeTextLink(e, liActive.index)} }>
                        {sectionsList}
                    </select>
                }
                if(this.props.currentSiteType === 'landing'){
                    sectionsList = existSections.map((section) => {
                        return <option  key={section.sectionName}>{section.sectionName}</option>
                    });
                    selectHtml =  <select className="uk-select" value={liActive.link.substr(1)} onChange={(e) => {this.changeTextLink(e, liActive.index)} }>
                        {sectionsList}
                    </select>
                }


                menuForm = <div>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title li-title">Пункт меню {liActive.index}</h3>
                        <div className="uk-card-body">
                            <form className="li-form">
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Название</div>
                                    <div className="uk-margin">
                                        <input onChange={(e) => {
                                            this.changeTitleLink(e, liActive.index)
                                        }} className="uk-input main-heading-input" type="text" placeholder={liActive.name} />
                                    </div>
                                    <div className="uk-form-label">Секция</div>
                                    <div className="uk-margin">
                                      {selectHtml}


                                    </div>
                                </fieldset>

                                <button onClick={(e) => {
                                    this.deleteMenuItem(e, liActive.index)
                                }} className="uk-button uk-button-danger del-li uk-modal-close" type="button">Удалить пункт
                                </button>
                                {addButton}
                            </form>
                        </div>
                    </div>
                </div>;
            }
            else{
                menuForm = <div className="uk-dark uk-background-muted uk-paddinge" style={{height: '100%'}}>
                    <h3>Редактирование меню сайта</h3>
                    <p>Для редактирования пункта меню кликните на него и в открывшемся окне внесите небходимые правки</p>

                </div>;
            }

            headerMenuStr =
                <div className="main-slider-wrapper">
                    <div className="uk-child-width-1-2@m main-slider-wrapper uk-flex">
                        <div >
                            <div  className="uk-light uk-background-secondary uk-padding" style={{height: '100%'}}>
                                <h3>Меню сайта</h3>
                                <ul className="uk-nav menu-change">
                                    {menuHtml}
                                </ul>
                            </div>
                        </div>
                        <div>
                            {menuForm}
                        </div>
                    </div>

                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-default uk-button-small uk-modal-close" type="button" onClick={(e) => {
                            this.addMainMenu(e)
                        }}>Добавить основной пункт меню
                        </button>
                        <button className="uk-button uk-margin-left uk-button-primary uk-button-small uk-modal-close" type="button" onClick={(e) => {
                            this.saveMenuChange(e)
                        }}>Сохранить изменения
                        </button>

                    </p>
                </div>
            ;
        }
        else {
            headerMenuStr = 'В шапке сайта нет меню';
        }

        if (headerPhone.phone!== null) {
            const infoHtml =
                <div>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title">Номер телефона</h3>
                        <div className="uk-card-body">
                            <form>
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Номер телефона</div>
                                    <div className="uk-margin">
                                        <input onChange={this.changePhone} className="uk-input main-heading" type="text" placeholder={headerPhone.phone}/>
                                    </div>
                                </fieldset>
                                <button onClick={(e) => {
                                    this.deletePhone(e)
                                }} className="uk-button uk-button-danger uk-modal-close" disabled={headerPhone.phone ? false : true} type="button">Удалить телефон
                                </button>
                            </form>
                        </div>
                    </div>


                </div>;




            headerPhoneStr =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {infoHtml}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {
                            this.saveHeaderPhoneChange(e)
                        }}>Сохранить изменения
                        </button>

                    </p>
                </div>
            ;
        }
        else {
            headerPhoneStr = 'У вас не указан телефон';
        }

        if (headerEmail.email!== null) {
            const infoHtml =
                <div>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title">Email</h3>
                        <div className="uk-card-body">
                            <form>
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Email</div>
                                    <div className="uk-margin">
                                        <input onChange={this.changeEmail} className="uk-input main-heading" type="text" placeholder={headerEmail.email}/>
                                    </div>
                                </fieldset>
                                <button onClick={(e) => {
                                    this.deleteEmail(e)
                                }} className="uk-button uk-button-danger uk-modal-close" disabled={headerEmail.email ? false : true} type="button">Удалить email
                                </button>
                            </form>
                        </div>
                    </div>


                </div>;




            headerEmailStr =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {infoHtml}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={this.saveHeaderEmailChange}>Сохранить изменения
                        </button>

                    </p>
                </div>
            ;
        } else {
            headerEmailStr = 'У вас не указан email';
        }
        if (headerAddress.address !== null) {
            const infoHtml =
                <div>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title">Адресс</h3>
                        <div className="uk-card-body">
                            <form>
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Адресс</div>
                                    <div className="uk-margin">
                                        <input onChange={this.changeAddress} className="uk-input main-heading" type="text" placeholder={headerAddress.address}/>
                                    </div>
                                </fieldset>
                                <button onClick={(e) => {
                                    this.deleteAddress(e)
                                }} className="uk-button uk-button-danger uk-modal-close" disabled={headerAddress.address ? false : true} type="button">Удалить адрес
                                </button>
                            </form>
                        </div>
                    </div>


                </div>;




            headerAddressStr =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {infoHtml}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={this.saveHeaderAddressChange}>Сохранить изменения
                        </button>

                    </p>
                </div>
            ;
        } else {
            headerAddressStr = 'У вас не указан адресс';
        }
        if (headerLogo) {
            const infoHtml = <div>

                    <div className="uk-card uk-card-default">
                        <div className="uk-card-media-top uk-padding uk-padding-remove-bottom">
                            <img style={{backgroundColor: '#f1f1f1'}} className="uk-width-1-3 uk-align-center" src={headerLogo.img ? headerLogo.img : '../images/default.jpg'} alt=""/>
                        </div>
                        <div className="uk-card-body">
                            <form>
                                <div className="uk-margin">
                                    <div className="uk-form-label">Изображение</div>
                                    <div>
                                        <input onChange={this.changeLogoImage} type="file"/>
                                    </div>
                                </div>
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Настройка alt</div>
                                    <div className="uk-margin">
                                        <input onChange={(e) => {
                                            this.changeLogoAlt(e)
                                        }} className="uk-input main-heading" type="text" placeholder={headerLogo.alt}/>
                                    </div>
                                </fieldset>
                                <button onClick={(e) => {
                                    this.deleteLogo(e)
                                }} className='uk-button uk-button-danger uk-modal-close' disabled={headerLogo.img ? false : true}  type="button">Удалить логотип
                                </button>
                            </form>
                        </div>
                    </div>


                </div>;


            headerLogoStr =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {infoHtml}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={this.saveHeaderLogoChange}>Сохранить изменения
                        </button>

                    </p>
                </div>
            ;

        }
        else {
            headerLogoStr = 'Логотип отсутствует';
        }
        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Настройка шапки сайта</h2>

                    <ul uk-accordion="true" className="menu-dialog">
                        <li>
                            <a className="uk-accordion-title" onClick={this.getHeaderLogoInfo} href="#">Логотип</a>
                            <div className="uk-accordion-content">
                                {headerLogoStr}
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title" onClick={this.getHeaderMenuInfo} href="#">Меню</a>
                            <div className="uk-accordion-content">
                                {headerMenuStr}
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title" onClick={this.getHeaderPhoneInfo} href="#">Телефон</a>
                            <div className="uk-accordion-content">
                                {headerPhoneStr}
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title" onClick={this.getHeaderEmailInfo} href="#">Email</a>
                            <div className="uk-accordion-content">
                                {headerEmailStr}
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title" onClick={this.getHeaderAddressInfo} href="#">Адрес</a>
                            <div className="uk-accordion-content">
                                {headerAddressStr}
                            </div>
                        </li>
                    </ul>

                    <p className="uk-text-right">
                        <button className="uk-button uk-button-default uk-margin-small-right uk-modal-close"
                                type="button">Выйти
                        </button>

                    </p>

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        virtualDom: state.virtualDom,
        currentSiteType: state.currentSiteType,
        currentFontStyle: state.currentFontStyle
    }
};
const mapDispatchToProps = {
    virtualDomLoaded,
    virtualDomChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuModal);