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

class FooterModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
            footerLogo: {
                img: null,
                alt: null,
                isLogo: false
            },
            footerMap: {
                iframe: null
            },
            footerServiceMenu: [ ],
            footerPhone: {
                phone: null
            },
            footerAddress: {
                address: null
            },
            footerEmail: {
                email: null
            },
            footerTime: {
                time: null
            },
            footerHoliday: {
                holiday: null
            },
            footerCompany: {
                company: null
            },
            liServiceIsActive: false,
            liServiceActive: {}
        };
    }

    closeAccord = () => {

        const accordBlock = document.querySelector('.footer-dialog');
        const links = accordBlock.querySelectorAll('.uk-accordion-title');
        const accords = accordBlock.querySelectorAll('li');

        accords.forEach((accord, i) => {
            if(accord.classList.contains('uk-open')){
                links[i].click();
            }


        });
    };


    saveHeaderCompanyChange = (e) => {
        e.preventDefault();

        const {footerCompany} = this.state;
        const iframe = document.querySelector('iframe');
        let newVirtualDom = [];
        let iconIframe = null;

        const companyIframeDom = iframe.contentDocument.querySelector('.footer-text span');




        if(footerCompany.company === null){
            companyIframeDom.remove();
        }
        else{
            companyIframeDom.innerHTML = footerCompany.company;
        }


        for(let i = 0; i < this.props.virtualDom.length; i++){

            let icon = null;

            let newDom = this.props.virtualDom[i].html.cloneNode(this.props.virtualDom[i].html);
            //DOMHelper.unwrapTextNodes(newDom);
            //DOMHelper.unwrapImages(newDom);

            const companyDom = newDom.querySelector('.footer-text span');


            if(footerCompany.company === null){
                companyDom.remove();
            }
            else{
                companyDom.innerHTML = footerCompany.company;
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
    changeFooterCompany = (e) => {
        this.setState(({footerCompany}) => {
            let newCompanyName = {};
            newCompanyName.company = e.target.value;

            return{
                footerCompany: newCompanyName
            }
        });
    }
    getFooterCompanyInfo = () => {
        const newDom = document.querySelector('iframe');

        const name = newDom.contentDocument.querySelector('.footer-text span');

        this.setState(({footerCompany}) => {
            let newCompanyName = {};
            if(name){
                newCompanyName.company = name.innerHTML;
            }
            else{
                newCompanyName.company = null;
            }
            return{
                footerCompany: newCompanyName
            }
        })

    }


    saveFooterInfoChange = (e) => {
        e.preventDefault();

        const {footerEmail, footerPhone, footerAddress, footerTime, footerHoliday} = this.state;
        const iframe = document.querySelector('iframe');

        let newVirtualDom = [];
        let iconIframe = null;

        const email = iframe.contentDocument.querySelector('.footer-email');
        const address = iframe.contentDocument.querySelector('.footer-address');
        const phone = iframe.contentDocument.querySelector('.footer-phone');
        const time = iframe.contentDocument.querySelector('.footer-time');
        const holiday = iframe.contentDocument.querySelector('.footer-holiday');

        const infoWrapper = iframe.contentDocument.querySelector('.footer-contacts');

        if(footerEmail.email){

            if(email){
                email.innerHTML = footerEmail.email;
            }
            else{
                let link = document.createElement('a');
                link.classList.add('footer-info');
                link.classList.add('textSize');
                link.setAttribute('href', 'mailto:'+footerEmail.email);

                let iconDiv = '';
                if(infoWrapper.querySelector('i')){
                    iconDiv = document.createElement('i');
                    iconDiv.innerHTML = '<i class="fas fa-envelope"></i>';

                    link.appendChild(iconDiv);
                }

                let emailSpan = document.createElement('span');
                emailSpan.classList.add('footer-email');
                emailSpan.innerHTML = footerEmail.email;
                link.appendChild(emailSpan);
            }
        }
        else{
            if(email){
                email.parentNode.remove();
            }
        }

        if(footerPhone.phone){
            let phoneNumberStr = footerPhone.phone.replace(/[^\d]/g, '');
            if(phone){
                phone.innerHTML = footerPhone.phone;
                phone.setAttribute('href', 'tel:+'+phoneNumberStr);
            }
            else{
                let link = document.createElement('a');
                link.classList.add('footer-info');
                link.classList.add('textSize');

                link.setAttribute('href', 'tel:+'+phoneNumberStr);

                let iconDiv = '';
                if(infoWrapper.querySelector('i')){
                    iconDiv = document.createElement('i');
                    iconDiv.innerHTML = '<i class="fas fa-phone-volume"></i>';

                    link.appendChild(iconDiv);
                }

                let phoneSpan = document.createElement('span');
                phoneSpan.classList.add('footer-phone ');
                phoneSpan.innerHTML = footerPhone.phone;
                link.appendChild(phoneSpan);

                infoWrapper.appendChild(link);
            }
        }
        else{
            if(phone){
                phone.parentNode.remove();
            }
        }


        if(footerAddress.address){

            if(address){
                address.innerHTML = footerAddress.address;
            }
            else{
                let link = document.createElement('a');
                link.classList.add('footer-info');
                link.classList.add('textSize');


                let iconDiv = '';
                if(infoWrapper.querySelector('i')){
                    iconDiv = document.createElement('i');
                    iconDiv.innerHTML = '<i class="fas fa-map-marker-alt"></i>';

                    link.appendChild(iconDiv);
                }

                let emailSpan = document.createElement('span');
                emailSpan.classList.add('footer-address');
                emailSpan.innerHTML = footerAddress.address;
                link.appendChild(emailSpan);

                infoWrapper.appendChild(link);
            }
        }
        else{
            if(address){
                address.parentNode.remove();
            }
        }

        if(footerTime.time){

            if(time){
                time.innerHTML = footerTime.time;
            }
            else{
                let link = document.createElement('a');
                link.classList.add('footer-info');
                link.classList.add('textSize');


                let iconDiv = '';
                if(infoWrapper.querySelector('i')){
                    iconDiv = document.createElement('i');
                    iconDiv.innerHTML = '<i class="fas fa-calendar-alt"></i>';

                    link.appendChild(iconDiv);
                }

                let timeSpan = document.createElement('span');
                timeSpan.classList.add('footer-time');
                timeSpan.innerHTML = footerTime.time;
                link.appendChild(timeSpan);

                infoWrapper.appendChild(link);
            }
        }
        else{
            if(time){
                time.parentNode.remove();
            }
        }

        if(footerHoliday.holiday){

            if(holiday){
                holiday.innerHTML = footerHoliday.holiday;
            }
            else{
                let link = document.createElement('a');
                link.classList.add('footer-info');
                link.classList.add('textSize');


                let iconDiv = '';
                if(infoWrapper.querySelector('i')){
                    iconDiv = document.createElement('i');
                    iconDiv.innerHTML = '<i class="fas fa-mug-hot"></i>';

                    link.appendChild(iconDiv);
                }

                let holidaySpan = document.createElement('span');
                holidaySpan.classList.add('footer-holiday');
                holidaySpan.innerHTML = footerHoliday.holiday;
                link.appendChild(holidaySpan);

                infoWrapper.appendChild(link);
            }
        }
        else{
            if(holiday){
                holiday.parentNode.remove();
            }
        }


        for(let i = 0; i < this.props.virtualDom.length; i++){

            let icon = null;

            let newDom = this.props.virtualDom[i].html.cloneNode(this.props.virtualDom[i].html);
            //DOMHelper.unwrapTextNodes(newDom);
            //DOMHelper.unwrapImages(newDom);

            const infoWrapper = newDom.querySelector('.footer-contacts');
            const infoWrapperIframe = iframe.contentDocument.querySelector('.footer-contacts');

            infoWrapper.innerHTML = '';
            infoWrapper.innerHTML = infoWrapperIframe.innerHTML;


            const virtualDomObj = {
                name: this.props.virtualDom[i].name,
                html: newDom
            }



            newVirtualDom.push(virtualDomObj);




        }
        this.closeAccord();
        this.props.virtualDomChanged(newVirtualDom);

    }

    deleteFooterHoliday = (e) => {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить данные о выходных?", {labels: {ok: "Ok", cancel: 'Отмена'}})
            .then(() => {

                this.setState(({footerHoliday}) => {
                    const newHoliday = {};
                    newHoliday.holiday = null;

                    return {
                        footerHoliday: newHoliday
                    }
                })
            })
            .then(() => {UIkit.modal("#footer-modal").show();})
    }

    changeFooterHoliday = (e) => {
        this.setState(({footerHoliday}) =>{
            const newHoliday = {};
            newHoliday.holiday = e.target.value;
            return{
                footerHoliday: newHoliday
            }
        })
    }

    deleteFooterTime = (e) => {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить данные о времени работы?", {labels: {ok: "Ok", cancel: 'Отмена'}})
            .then(() => {

                this.setState(({footerTime}) => {
                    const newTime = {};
                    newTime.time = null;

                    return {
                        footerTime: newTime
                    }
                })
            })
            .then(() => {UIkit.modal("#footer-modal").show();})
    }

    changeFooterTime = (e) => {
        this.setState(({footerTime}) =>{
            const newTime = {};
            newTime.time = e.target.value;
            return{
                footerTime: newTime
            }
        })
    }

    deleteFooterAddress = (e) => {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить данные об адресе?", {labels: {ok: "Ok", cancel: 'Отмена'}})
            .then(() => {

                this.setState(({footerAddress}) => {
                    const newAddress = {};
                    newAddress.address = null;

                    return {
                        footerAddress: newAddress
                    }
                })
            })
            .then(() => {UIkit.modal("#footer-modal").show();})
    }

    changeFooterAddress = (e) => {
        this.setState(({footerAddress}) =>{
            const newAddress = {};
            newAddress.address = e.target.value;
            return{
                footerAddress: newAddress
            }
        })
    }

    deleteFooterEmail = (e) => {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить данные о email?", {labels: {ok: "Ok", cancel: 'Отмена'}})
            .then(() => {

                this.setState(({footerEmail}) => {
                    const newEmail = {};
                    newEmail.email = null;

                    return {
                        footerEmail: newEmail
                    }
                })
            })
            .then(() => {UIkit.modal("#footer-modal").show();})
    }

    changeFooterEmail = (e) => {
        this.setState(({footerEmail}) =>{
            const newEmail = {};
            newEmail.email = e.target.value;
            return{
                footerEmail: newEmail
            }
        })
    }

    deleteFooterPhone = (e) => {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить данные о телефоне?", {labels: {ok: "Ok", cancel: 'Отмена'}})
            .then(() => {

                this.setState(({footerPhone}) => {
                    const newPhone = {};
                    newPhone.phone = null;

                    return {
                        footerPhone: newPhone
                    }
                })
            })
            .then(() => {UIkit.modal("#footer-modal").show();})
    }

    changeFooterPhone = (e) => {
        this.setState(({footerPhone}) =>{
            const newPhone = {};
            newPhone.phone = e.target.value;
            return{
                footerPhone: newPhone
            }
        })
    }

    getFooterInfoInfo = () =>{

        const newDom = document.querySelector('iframe');

        const email = newDom.contentDocument.querySelector('.footer-email');
        const address = newDom.contentDocument.querySelector('.footer-address');
        const phone = newDom.contentDocument.querySelector('.footer-phone');
        const time = newDom.contentDocument.querySelector('.footer-time');
        const holiday = newDom.contentDocument.querySelector('.footer-holiday');


        let emailStr = '';
        let addressStr = '';
        let phoneStr = '';
        let timeStr = '';
        let holidayStr = '';

        if(email === null && phone === null && time === null && address === null && holiday === null){
            this.setState(({footerPhone, footerEmail, footerAddress, footerTime, footerHoliday}) =>{
                const newEmail = {};
                newEmail.email = null;

                const newPhone = {};
                newPhone.phone = null;

                const newAddress = {};
                newAddress.address = null;

                const newTime = {};
                newTime.time = null;

                const newHoliday = {};
                newHoliday.holiday = null;


                return{
                    footerEmail: newEmail,
                    footerPhone: newPhone,
                    footerAddress: newAddress,
                    footerTime: newTime,
                    footerHoliday: newHoliday
                }
            })
        }
        else{
            if(email){
                emailStr = email.innerText;
            }


            if(address){
                addressStr = address.innerText;
            }



            if(phone){
                phoneStr = phone.innerText;
            }


            if(time){
                timeStr = time.innerText;
            }


            if(holiday){
                holidayStr = holiday.innerText;
            }



            this.setState(({footerPhone, footerEmail, footerAddress, footerTime, footerHoliday}) =>{
                const newEmail = {};
                newEmail.email = emailStr;

                const newPhone = {};
                newPhone.phone = phoneStr;

                const newAddress = {};
                newAddress.address = addressStr;

                const newTime = {};
                newTime.time = timeStr;

                const newHoliday = {};
                newHoliday.holiday = holidayStr;


                return{
                    footerEmail: newEmail,
                    footerPhone: newPhone,
                    footerAddress: newAddress,
                    footerTime: newTime,
                    footerHoliday: newHoliday
                }
            })
        }





    }





    saveFooterServiceChange = (e) => {

        const {footerServiceMenu} = this.state;

        if(this.props.currentSiteType === 'manyPage'){
            footerServiceMenu.forEach((item) => {
                if( /^\S*\w\.html/.test(item.link) !== true){
                    UIkit.modal.alert(`Ссылка ${item.link} должна включать в себя только буквы латинского алфавита и цифры, без пробелов! В конце ссылки должно быть указано ` +
                        'расширение файла .html', {labels:{ok: "Ok"}})
                        .then(() => {UIkit.modal("#footer-modal").show();})

                }
            });
        }

        const iframe = document.querySelector('iframe');

        if(this.props.currentSiteType === 'landing'){

            let newVirtualDom = [];

            let newDom = this.props.virtualDom[0].html.cloneNode(this.props.virtualDom[0].html);


            const menuItems = newDom.querySelectorAll('.footer-services li');
            const menu = newDom.querySelector('.footer-services ul');

            const iframeMenuItems = iframe.contentDocument.querySelectorAll('.footer-services li');
            const iframeMenu = iframe.contentDocument.querySelector('.footer-services ul');


            if(footerServiceMenu.length === 0){

                menu.remove();
                iframeMenu.remove();
            }
            else{
                if(footerServiceMenu.length < menuItems.length){

                    menuItems.forEach((item, i) => {
                        if(i >= footerServiceMenu.length){
                            item.remove();
                        }

                    });

                    iframeMenuItems.forEach((item, i) => {
                        if(i >= footerServiceMenu.length){
                            item.remove();
                        }

                    });

                }

                if(footerServiceMenu.length > menuItems.length){


                    footerServiceMenu.forEach((slideItem, i) => {
                        if(i >= menuItems.length){
                            const newItem = menuItems[0].cloneNode(true);
                            menu.appendChild(newItem);
                        }

                    });

                    footerServiceMenu.forEach((slideItem, i) => {
                        if(i >= iframeMenuItems.length){
                            const newItem = iframeMenuItems[0].cloneNode(true);
                            iframeMenu.appendChild(newItem);
                        }

                    });


                }
                const itemsMenuAfter = newDom.querySelectorAll('.footer-services a');

                const iframeMenuAfter = iframe.contentDocument.querySelectorAll('.footer-services a ');
                iframeMenuAfter.forEach((item, i) => {

                    item.setAttribute('href', footerServiceMenu[i].link);
                    item.innerHTML = footerServiceMenu[i].name;

                });
                itemsMenuAfter.forEach((item, i) => {

                    item.setAttribute('href', footerServiceMenu[i].link);
                    item.innerHTML = footerServiceMenu[i].name;

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
        if(this.props.currentSiteType === 'manyPage') {

            let currentVirtualDom = [];

            const pages = this.props.virtualDom;
            let linkArray = [];
            currentVirtualDom = pages;


            footerServiceMenu.forEach((item) => {

                linkArray.push(item);


            });

            pages.forEach((page) => {
                const pageName = page.name.toLowerCase() + '.html';


                const arrayPagesExist = linkArray.filter((headerLink) => {
                    return headerLink.link === pageName;
                });

                if (arrayPagesExist.length < 1) {

                    fetch("../../api/deletePage.php", {
                        method: 'POST',
                        body: JSON.stringify({name: pageName})
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw Error(res.statusText)
                            }
                        })

                    currentVirtualDom = pages.filter((pageObj) => {
                        return pageObj.name !== page.name;
                    });


                }
            });

            linkArray.forEach((item) => {

                if (item.parent === 'user') {
                    const pageLinkName = item.link;

                    let content = currentVirtualDom[0].html.cloneNode(currentVirtualDom[0].html);
                    let contentSection = content.querySelectorAll('section');
                    contentSection.forEach((item) => {
                        item.remove();
                    });
                    let elem = document.createElement('div');
                    elem.appendChild(content);

                    const contentText = elem.innerHTML;

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
                            <link rel="stylesheet" href="theme.css">` +
                        this.props.currentFontStyle.link +

                        `</head>`;
                    const js = `
                    <script src="../assets/wow.js"></script>
                    <script src="main.js"></script>
                    
                    </html>
                `;
                    const contentStr = head + contentText + js;

                    fetch("../../api/createHtmlPage.php", {
                        method: 'POST',
                        body: JSON.stringify({name: pageLinkName, content: contentStr})
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw Error(res.statusText)
                            }
                        })

                    const virtualDomObj = {
                        name: item.link.slice(0, -5),
                        html: content
                    }
                    currentVirtualDom.push(virtualDomObj);
                }
            });


            const newCurrentVirtualDom = [];
            for (let i = 0; i < currentVirtualDom.length; i++) {

                let newDom = this.props.virtualDom[0].html.cloneNode(this.props.virtualDom[0].html);

                const menuItems = newDom.querySelectorAll('.footer-services li');
                const menu = newDom.querySelector('.footer-services ul');

                const iframeMenuItems = iframe.contentDocument.querySelectorAll('.footer-services li');
                const iframeMenu = iframe.contentDocument.querySelector('.footer-services ul');


                while (iframeMenu.firstChild) {
                    iframeMenu.removeChild(iframeMenu.firstChild);
                }
                footerServiceMenu.forEach((item, index) => {

                    let menuLi = document.createElement('li');
                    let link = document.createElement('a');
                    link.setAttribute('href', item.link);
                    link.innerHTML = item.name;
                    menuLi.appendChild(link);
                    iframeMenu.appendChild(menuLi);


                });

                if (footerServiceMenu.length === 0) {

                    menu.remove();
                    iframeMenu.remove();
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
    }

    addFooterServiceMenu = (e) => {
        e.preventDefault();
        const newMenuItem = {};
        if(this.props.currentSiteType === 'landing'){

            newMenuItem.index = this.state.footerServiceMenu.length;
            newMenuItem.name = 'Новый пункт меню';
            newMenuItem.link = null;
            newMenuItem.parent = 'user';
            newMenuItem.children = [];


        }
        if(this.props.currentSiteType === 'manyPage') {

            newMenuItem.index = this.state.footerServiceMenu.length;
            newMenuItem.name = 'Новый пункт меню';
            newMenuItem.link = 'new.html';
            newMenuItem.parent = 'user';
            newMenuItem.children = [];
        }
        this.setState(({footerServiceMenu}) =>{
            const newMenuItems = [...footerServiceMenu, newMenuItem];
            return{
                footerServiceMenu: newMenuItems


            }
        });

        UIkit.modal("#footer-modal").show();
    }

    deleteMenuServiceItem = (e, index) => {
        e.preventDefault();
        UIkit.modal.confirm("Вы действительно хотите удалить данный пункт? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                if(this.state.footerServiceMenu.length < 2){
                    this.setState(({footerMenu}) => {
                        return {
                            footerServiceMenu: []
                        }
                    })
                }
                else{
                    this.setState(({footerServiceMenu}) => {

                        const newFooterServiceMenu = [
                            ...footerServiceMenu.slice(0, index),
                            ...footerServiceMenu.slice(index+1)
                        ];

                        newFooterServiceMenu.forEach((item, j) => {
                            item.index = j;
                        });

                        return {
                            footerServiceMenu: newFooterServiceMenu
                        }
                    })
                }
            })
            .then(() => {

                let input = document.querySelector('.service-heading-input');
                let inputLink = document.querySelector('.service-text-input');
                let button = document.querySelector('.del-li-service');

                if(button){
                    button.setAttribute('disabled', 'true');
                }


            })
            .then(() => {UIkit.modal("#footer-modal").show();});



    };

    changeTextServiceLink = (e, index) => {
        e.preventDefault();
        const {footerServiceMenu} = this.state;
        if(footerServiceMenu[index].parent === 'user' && this.props.currentSiteType === 'manyPage'){


            this.setState(({footerServiceMenu}) => {
                const newFooterMenuItem = {
                    ...footerServiceMenu[index],
                    link: e.target.value
                };

                return {
                    footerServiceMenu: [
                        ...footerServiceMenu.slice(0, index),
                        newFooterMenuItem,
                        ...footerServiceMenu.slice(index+1)
                    ]
                }
            })

        }
        else{
            UIkit.modal.alert('Вы не можете изменять ссылку! Вы можете создать новый пункт меню' +
                'с необходимыми параметрами.', {labels:{ok: "Ok"}})
                .then(() => {UIkit.modal("#footer-modal").show();})

        }

    };

    changeTitleServiceLink = (e, index) => {

        this.setState(({footerServiceMenu}) => {

            let newFooterServiceMenuItem = {};
            newFooterServiceMenuItem.index = footerServiceMenu[index].index;
            newFooterServiceMenuItem.name = e.target.value;
            newFooterServiceMenuItem.link = footerServiceMenu[index].link;
            newFooterServiceMenuItem.parent = footerServiceMenu[index].parent;
            newFooterServiceMenuItem.children = footerServiceMenu[index].children;


            return {
                footerServiceMenu: [
                    ...footerServiceMenu.slice(0, index),
                    newFooterServiceMenuItem,
                    ...footerServiceMenu.slice(index+1)
                ]
            }

        })
    };



    getServiceItemByIndex = (index) => {

        const {footerServiceMenu} = this.state;
        return footerServiceMenu[index];
    }
    getInfoServiceMenuItem = (e, index) => {
        e.preventDefault();


        let menuList = document.querySelectorAll('.menu-service-change a');
        let button = document.querySelector('.del-li-service');

        if(button && button.hasAttribute('disabled')){
            button.removeAttribute('disabled');
        }
        menuList.forEach((item) => {
            item.style.color = 'white';
        });

        e.target.style.color = 'blue';
        const li = this.getServiceItemByIndex(index);


        let input = document.querySelector('.service-heading-input');
        if(input){
             input.value = '';
        }
        let inputText = document.querySelector('.service-text-input');
        if(inputText){
            inputText.value = '';
        }

        this.setState((liActive, liIsActive) => {
            return {
                liServiceActive: li,
                liServiceIsActive: true
            }
        })


    }
    getFooterMenuServiceInfo = (e) => {
        const newDom = document.querySelector('iframe');


        const menuItems = newDom.contentDocument.querySelectorAll('.footer-services a');


        let newFooterServiceMenu = [];

        menuItems.forEach((menuItem, i) => {

            const item = {};
            item.index = i;
            item.name = menuItem.innerHTML;

            item.parent = 'site';
            item.children = [];

            if(this.props.currentSiteType === 'landing'){
                item.link = null;
            }
            else{
                item.link = menuItem.getAttribute('href');
            }

            newFooterServiceMenu.push(item);

        });


        this.setState(({footerServiceMenu}) =>{
            return{
                footerServiceMenu: newFooterServiceMenu
            }
        })
    }

    deleteFooterLogo = (e) => {
        e.preventDefault();

            UIkit.modal.alert("Вы действительно хотите удалить логотип?", {labels: {ok: "Ok", cancel: 'Отмена'}})
                .then(() => {

                    this.setState(({footerLogo}) => {

                        const newFooterLogo = footerLogo;
                        newFooterLogo.img = null;
                        newFooterLogo.alt = null;

                        return {
                            footerLogo: newFooterLogo
                        }
                    })
                })
                .then(() => {UIkit.modal("#footer-modal").show();})

    }

    changeFooterLogoImage = (e) => {
        if(e.target.files && e.target.files[0]){

            let formData = new FormData();
            formData.append('image', e.target.files[0]);

            fetch('../api/uploadImage.php',{
                method: 'POST',
                body: formData
            })
                .then((res) => res.json())
                .then((res) => {
                    this.setState(({footerLogo}) => {
                        const newLogo = footerLogo;
                        newLogo.img = `../userDir/images/${res}`;

                        return {
                            footerLogo: newLogo
                        }
                    })
                })
                .catch(() => this.showNotifications('Ошибка сохранения', 'danger'))



        }
    }

    changeFooterLogoAlt = (e) => {
        this.setState(({footerLogo}) => {
            const newFooterLogo = footerLogo;
            newFooterLogo.alt = e.target.value;
            return {
                footerLogo: newFooterLogo
            }
        });
    }

    getFooterLogoInfo = (e) => {
        const newDom = document.querySelector('iframe');
        const logo = newDom.contentDocument.querySelectorAll('.footer-logo-img')[0];

        this.setState(({footerLogo}) =>{

            const logoObj = {};
            if(logo){
                logoObj.img = logo.getAttribute('src');
                logoObj.alt = logo.getAttribute('alt');
                logoObj.isLogo = true;

            }
            else{
                logoObj.img = null;
                logoObj.alt = null;
            }
            return{
                footerLogo: logoObj
            }
        })
    }


    render() {
        const {target, modal} = this.props;
        const {footerLogo, footerMap,  footerServiceMenu,
            footerPhone, footerAddress, footerEmail, footerTime,
            footerHoliday, footerCompany,
            liServiceIsActive,  liServiceActive} = this.state;



        const classButtonDelete = 'uk-button uk-button-danger uk-modal-close';
        const classButtonDisabled = {
            display: 'none'
        };



        let footerInfoStr = '';
        let footerMenuStr = '';
        let FooterMap = '';
        let footerLogoStr = '';
        let FooterCompanyStr = '';


        if (footerLogo.isLogo === true) {

            const infoHtml = <div>

                <div className="uk-card uk-card-default">
                    <div className="uk-card-media-top uk-padding uk-padding-remove-bottom">
                        <img style={{backgroundColor: '#f1f1f1'}} className="uk-width-1-3 uk-align-center" src={footerLogo.img ? footerLogo.img : '../images/default.jpg'} alt=""/>
                    </div>
                    <div className="uk-card-body">
                        <form>
                            <div className="uk-margin">
                                <div className="uk-form-label">Изображение</div>
                                <div>
                                    <input onChange={this.changeFooterLogoImage} type="file"/>
                                </div>
                            </div>
                            <fieldset className="uk-fieldset">
                                <div className="uk-form-label">Настройка alt</div>
                                <div className="uk-margin">
                                    <input onChange={(e) => {
                                        this.changeFooterLogoAlt(e)
                                    }} className="uk-input main-heading" type="text" placeholder={footerLogo.alt}/>
                                </div>
                            </fieldset>
                            <button onClick={(e) => {
                                this.deleteFooterLogo(e)
                            }} className='uk-button uk-button-danger uk-modal-close' disabled={footerLogo.img ? false : true}  type="button">Удалить логотип
                            </button>
                        </form>
                    </div>
                </div>


            </div>;


            footerLogoStr =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {infoHtml}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={this.saveFooterLogoChange}>Сохранить изменения
                        </button>

                    </p>
                </div>
            ;

        }
        else {
            footerLogoStr = 'Логотип отсутствует';
        }



        if (footerPhone.phone!== null || footerEmail.email!== null || footerAddress.address!== null
            || footerTime.time!== null || footerHoliday.holiday!== null) {

            let phoneStr = '';
            let emailStr = '';
            let addressStr = '';
            let timeStr = '';
            let holidayStr = '';

            if(footerPhone.phone!== null){
                phoneStr = <>
                    <fieldset className="uk-fieldset">
                        <div className="uk-form-label">Номер телефона</div>
                        <div className="uk-margin">
                            <input onChange={this.changeFooterPhone} className="uk-input main-heading" type="text" placeholder={footerPhone.phone}/>
                        </div>
                    </fieldset>
                    <button onClick={(e) => {
                        this.deleteFooterPhone(e)
                    }} className="uk-button uk-button-danger uk-modal-close" disabled={footerPhone.phone ? false : true} type="button">Удалить телефон
                    </button>
                </>
            }
            else{
                phoneStr = '';
            }

            if(footerEmail.email!== null){
                emailStr = <>
                    <fieldset className="uk-fieldset">
                        <div className="uk-form-label">Email</div>
                        <div className="uk-margin">
                            <input onChange={this.changeFooterEmail} className="uk-input main-heading" type="text" placeholder={footerEmail.email}/>
                        </div>
                    </fieldset>
                    <button onClick={(e) => {
                        this.deleteFooterEmail(e)
                    }} className="uk-button uk-button-danger uk-modal-close" disabled={footerEmail.email ? false : true} type="button">Удалить email
                    </button>
                </>
            }
            else{
                emailStr = '';
            }

            if(footerAddress.address!== null){
                addressStr = <>
                    <fieldset className="uk-fieldset">
                        <div className="uk-form-label">Адрес</div>
                        <div className="uk-margin">
                            <input onChange={this.changeFooterAddress} className="uk-input main-heading" type="text" placeholder={footerAddress.address}/>
                        </div>
                    </fieldset>
                    <button onClick={(e) => {
                        this.deleteFooterAddress(e)
                    }} className="uk-button uk-button-danger uk-modal-close" disabled={footerAddress.address ? false : true} type="button">Удалить aдрес
                    </button>
                </>
            }
            else{
                addressStr = '';
            }


            if(footerTime.time!== null){
                timeStr = <>
                    <fieldset className="uk-fieldset">
                        <div className="uk-form-label">Время работы</div>
                        <div className="uk-margin">
                            <input onChange={this.changeFooterTime} className="uk-input main-heading" type="text" placeholder={footerTime.time}/>
                        </div>
                    </fieldset>
                    <button onClick={(e) => {
                        this.deleteFooterTime(e)
                    }} className="uk-button uk-button-danger uk-modal-close" disabled={footerTime.time ? false : true} type="button">Удалить время работы
                    </button>

                </>
            }
            else{
                timeStr = '';
            }

            if(footerHoliday.holiday!== null){
                holidayStr = <>
                    <fieldset className="uk-fieldset">
                        <div className="uk-form-label">Выходные</div>
                        <div className="uk-margin">
                            <input onChange={this.changeFooterHoliday} className="uk-input main-heading" type="text" placeholder={footerHoliday.holiday}/>
                        </div>
                    </fieldset>
                    <button onClick={(e) => {
                        this.deleteFooterHoliday(e)
                    }} className="uk-button uk-button-danger uk-modal-close" disabled={footerHoliday.holiday ? false : true} type="button">Удалить время работы
                    </button>
                </>
            }
            else{
                holidayStr = '';
            }

            const infoHtml =
                <div>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title">Информация о контактах</h3>
                        <div className="uk-card-body">
                            <form>
                                {phoneStr}
                                {emailStr}
                                {addressStr}
                                {timeStr}
                                {holidayStr}
                            </form>
                        </div>
                    </div>


                </div>;




            footerInfoStr =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {infoHtml}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {
                            this.saveFooterInfoChange(e)
                        }}>Сохранить изменения
                        </button>

                    </p>
                </div>
            ;
        }
        else {
            footerInfoStr = 'У вас нет информации о контактах!';
        }

        if (footerServiceMenu) {
            const menuServiceHtml = footerServiceMenu.map((item, index) => {

                return <li key={index} data-header-menu={index}><a onClick={(e) => {
                    this.getInfoServiceMenuItem(e, item.index)
                }}>{item.name}</a></li>;


            });

            let menuServiceForm = '';
            let addButton = '';
            if(liServiceIsActive){

                let inputTextLinkStr = '';

                if(liServiceActive.link){
                    inputTextLinkStr =<>
                        <div className="uk-form-label">Ссылка</div>
                        <div className="uk-margin">
                            <input onChange={(e) => {
                                this.changeTextServiceLink(e, liServiceActive.index)
                            }} className="uk-textarea service-text-input" rows="5" placeholder={liServiceActive.link}></input>

                        </div>
                    </>

                       }
                else{
                    inputTextLinkStr ='';
                }

                menuServiceForm = <div>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title li-title">Пункт меню {liServiceActive.index +1}</h3>
                        <div className="uk-card-body">
                            <form className="li-form">
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Название</div>
                                    <div className="uk-margin">
                                        <input onChange={(e) => {
                                            this.changeTitleServiceLink(e, liServiceActive.index)
                                        }} className="uk-input service-heading-input" type="text" placeholder={liServiceActive.name} />
                                    </div>
                                    {inputTextLinkStr}

                                </fieldset>

                                <button onClick={(e) => {
                                    this.deleteMenuServiceItem(e, liServiceActive.index)
                                }} className="uk-button uk-button-danger del-li-service uk-modal-close" type="button">Удалить пункт
                                </button>
                                {addButton}
                            </form>
                        </div>
                    </div>
                </div>;
            }
            else{
                menuServiceForm = <div className="uk-dark uk-background-muted uk-paddinge" style={{height: '100%'}}>
                    <h3>Редактирование меню сайта</h3>
                    <p>Для редактирования пункта меню кликните на него и в открывшемся окне внесите небходимые правки</p>

                </div>;
            }

            footerMenuStr =
                <div className="main-slider-wrapper">
                    <div className="uk-child-width-1-2@m main-slider-wrapper uk-flex">
                        <div >
                            <div  className="uk-light uk-background-secondary uk-padding" style={{height: '100%'}}>
                                <h3>Меню сайта</h3>
                                <ul className="uk-nav menu-service-change">
                                    {menuServiceHtml}
                                </ul>
                            </div>
                        </div>
                        <div>
                            {menuServiceForm}
                        </div>
                    </div>

                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-default uk-button-small uk-modal-close" type="button" onClick={(e) => {
                            this.addFooterServiceMenu(e)
                        }}>Добавить основной пункт меню
                        </button>
                        <button className="uk-button uk-margin-left uk-button-primary uk-button-small uk-modal-close" type="button" onClick={(e) => {
                            this.saveFooterServiceChange(e)
                        }}>Сохранить изменения
                        </button>

                    </p>
                </div>
            ;
        }
        else {
            footerMenuStr  = 'В подвале сайта нет меню услуг';
        }




        if (footerMap.iframe!== null) {
            const infoMapHtml =
                <div>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title">Карта</h3>
                        <div className="uk-card-body">
                            <form>
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Карта</div>
                                    <div className="uk-margin">
                                        <input onChange={this.changeFooterMap} className="uk-input main-heading" type="text" placeholder={footerMap.iframe}/>
                                    </div>
                                </fieldset>
                                <button onClick={(e) => {
                                    this.deleteFooterMap(e)
                                }} className="uk-button uk-button-danger uk-modal-close" disabled={footerMap.iframe ? false : true} type="button">Удалить карту
                                </button>
                            </form>
                        </div>
                    </div>


                </div>;




            FooterMap =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {infoMapHtml}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={this.saveFooterMapChange}>Сохранить изменения
                        </button>

                    </p>
                </div>
            ;
        } else {
            FooterMap = 'У вас нет карты';
        }





        if (footerCompany.company !== null) {
            const infoHtml =
                <div>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title">Название Вашей компании</h3>
                        <div className="uk-card-body">
                            <form>
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Название Вашей компании</div>
                                    <div className="uk-margin">
                                        <input onChange={this.changeFooterCompany} className="uk-input main-heading" type="text" placeholder={footerCompany.company}/>
                                    </div>
                                </fieldset>

                            </form>
                        </div>
                    </div>


                </div>;




            FooterCompanyStr =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {infoHtml}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={this.saveHeaderCompanyChange}>Сохранить изменения
                        </button>

                    </p>
                </div>
            ;
        } else {
            FooterCompanyStr = 'У вас нет названия компании';
        }

        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Настройка шапки сайта</h2>

                    <ul uk-accordion="true" className="footer-dialog">
                        <li>
                            <a className="uk-accordion-title" onClick={this.getFooterLogoInfo} href="#">Логотип</a>
                            <div className="uk-accordion-content">
                                {footerLogoStr}
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title"  href="#">Меню</a>
                            <div className="uk-accordion-content">
                                <h2 className="uk-modal-title">Настройка меню производяться в шапке сайта.</h2>
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title" onClick={this.getFooterInfoInfo} href="#">Информация о контактах</a>
                            <div className="uk-accordion-content">
                                {footerInfoStr}
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title" onClick={this.getFooterMenuServiceInfo} href="#">Меню услуг</a>
                            <div className="uk-accordion-content">
                                {footerMenuStr}
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title" onClick={this.getFooterMapInfo} href="#">Настройка карты</a>
                            <div className="uk-accordion-content">
                                {FooterMap}
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title" onClick={this.getFooterCompanyInfo} href="#">Название компании</a>
                            <div className="uk-accordion-content">
                                {FooterCompanyStr}
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterModal);