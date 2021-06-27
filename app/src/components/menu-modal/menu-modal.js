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

class MenuModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
            headerLogo: {
                img: '',
                alt: ''
            },
            headerMenu: [],
            headerPhone: {
                phone: ''
            },
            headerEmail: {
                email: ''
            }
        };
        this.getHeaderMenuInfo = this.getHeaderMenuInfo.bind(this);
        this.getItemsHeader = this.getItemsHeader.bind(this);
        this.getHeaderLogoInfo = this.getHeaderLogoInfo.bind(this);
        this.getHeaderPhoneInfo = this.getHeaderPhoneInfo.bind(this);
        this.getHeaderEmailInfo = this.getHeaderEmailInfo.bind(this);
        this.changeTitleLink = this.changeTitleLink.bind(this);
        this.changeTextLink = this.changeTextLink.bind(this);
        this.deleteMenuItem = this.deleteMenuItem.bind(this);
        this.saveMenuChange = this.saveMenuChange.bind(this);
        this.addMenuItem = this.addMenuItem.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.deletePhone = this.deletePhone.bind(this);
        this.saveHeaderPhoneChange = this.saveHeaderPhoneChange.bind(this);
        this.changeLogoImage = this.changeLogoImage.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
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
    saveHeaderPhoneChange(e){
        const newDom = this.props.virtualDom.cloneNode(this.props.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        DOMHelper.unwrapImages(newDom);

        const phone = newDom.querySelector('.info-phone');



        const iframe = document.querySelector('iframe');
        const phoneIframe = iframe.contentDocument.querySelector('.info-phone');

        if(this.state.headerPhone.phone === ''){

            if(phone){
                phone.innerHTML = '';
                phone.style.display = 'none';
                phone.setAttribute('disabled', '1');
            }

            if(phoneIframe){
                phoneIframe.innerHTML = '';
                phoneIframe.style.display = 'none';
                phoneIframe.setAttribute('disabled', '1');
            }

        }
        else{

            phone.innerHTML = this.state.headerPhone.phone;
            phoneIframe.innerHTML = this.state.headerPhone.phone ;

            phone.removeAttribute('style');
            phone.removeAttribute('disabled');

            phoneIframe.removeAttribute('style');
            phoneIframe.removeAttribute('disabled');
        }


        this.closeAccord();

        this.props.virtualDomLoaded(newDom);
    }
    saveHeaderEmailChange(e){
        const newDom = this.props.virtualDom.cloneNode(this.props.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        DOMHelper.unwrapImages(newDom);

        const email = newDom.querySelector('.info-email');



        const iframe = document.querySelector('iframe');
        const emailIframe = iframe.contentDocument.querySelector('.info-email');

        if(this.state.headerEmail.email === ''){

            if(email){
                email.innerHTML = '';
                email.style.display = 'none';
                email.setAttribute('disabled', '1');
            }

            if(emailIframe){
                emailIframe.innerHTML = '';
                emailIframe.style.display = 'none';
                emailIframe.setAttribute('disabled', '1');
            }

        }
        else{

            email.innerHTML = this.state.headerEmail.email;
            emailIframe.innerHTML = this.state.headerEmail.email ;

            email.removeAttribute('style');
            email.removeAttribute('disabled');

            emailIframe.removeAttribute('style');
            emailIframe.removeAttribute('disabled');
        }


        this.closeAccord();

        this.props.virtualDomLoaded(newDom);
    }

    deletePhone = (e) => {
        e.preventDefault();
        UIkit.modal.alert("Вы действительно хотите удалить данные о телефоне?", {labels: {ok: "Ok", cancel: 'Отмена'}})
            .then(() => {

                this.setState(({headerPhone}) => {
                    const newPhone = headerPhone;
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
        UIkit.modal.alert("Вы действительно хотите удалить данные о email?", {labels: {ok: "Ok", cancel: 'Отмена'}})
            .then(() => {

                this.setState(({headerEmail}) => {
                    const newEmail = headerEmail;
                    newEmail.email = '';
                    return {
                        headerPhone: newEmail
                    }
                })
            })
            .then(() => {UIkit.modal("#menu-modal").show();})

    };
    changePhone = (e) => {
        this.setState(({headerPhone}) =>{
            const newPhone = headerPhone;
            newPhone.phone = e.target.value;
            return{
                headerPhone: newPhone
            }
        })

    };
    changeEmail = (e) => {
        this.setState(({headerEmail}) =>{
            const newEmail = headerEmail;
            newEmail.email = e.target.value;
            return{
                headerEmail: newEmail
            }
        })

    };
    addMenuItem = (e) => {
        e.preventDefault();

        const index = this.state.headerMenu.length;
        const newMenuItem = {
            index: index,
            name: 'Новый пункт меню',
            link: '#'
        };

        this.setState(({headerMenu}) =>{
            const newMenuItems = [...headerMenu, newMenuItem];
            return{
                headerMenu: newMenuItems


            }
        })

    };
    saveMenuChange = (e) => {
        const newDom = this.props.virtualDom.cloneNode(this.props.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        DOMHelper.unwrapImages(newDom);
        //let iframeFromHTML =  HtmlObjectTransform.getObjectIframeFromHtml(newDom);
        const menuItems = newDom.querySelectorAll('.menu li');
        const menu = newDom.querySelector('.menu');

        const iframe = document.querySelector('iframe');
        const iframeMenuItems = iframe.contentDocument.querySelectorAll('.menu li');
        const iframeMenu = iframe.contentDocument.querySelector('.menu');

        if(this.state.headerMenu.length === 0){
            //const menuIframe = iframe.contentDocument.querySelector('.menu');
            //console.log(menu);
            menu.remove();
            iframeMenu.remove();
        }
        else{
            if(this.state.headerMenu.length < menuItems.length){

                menuItems.forEach((item, i) => {
                    if(i >= this.state.headerMenu.length){
                        item.remove();
                    }

                });

                iframeMenuItems.forEach((item, i) => {
                    if(i >= this.state.headerMenu.length){
                        item.remove();
                    }

                });

            }

            if(this.state.headerMenu.length > menuItems.length){


                this.state.headerMenu.forEach((slideItem, i) => {
                    if(i >= menuItems.length){
                        const newItem = menuItems[0].cloneNode(true);
                        menu.querySelector('ul').appendChild(newItem);
                    }

                });

                this.state.headerMenu.forEach((slideItem, i) => {
                    if(i >= iframeMenuItems.length){
                        const newItem = iframeMenuItems[0].cloneNode(true);
                        iframeMenu.querySelector('ul').appendChild(newItem);
                    }

                });


            }
            const itemsMenuAfter = newDom.querySelectorAll('.menu li');

            const iframeMenuAfter = iframe.contentDocument.querySelectorAll('.menu li');
            iframeMenuAfter.forEach((item, i) => {

                item.querySelector('a').setAttribute('href', this.state.headerMenu[i].link);
                item.querySelector('a').innerHTML = this.state.headerMenu[i].name;

            });
            itemsMenuAfter.forEach((item, i) => {

                item.querySelector('a').setAttribute('href', this.state.headerMenu[i].link);
                item.querySelector('a').innerHTML = this.state.headerMenu[i].name;

            });
        }

        this.closeAccord();

        this.props.virtualDomLoaded(newDom);
    };
    deleteMenuItem = (e, index) => {
        //console.log('delete');
        e.preventDefault();
        if(this.state.headerMenu.length < 2){
            UIkit.modal.alert("Это последний пункт меню! Вы действительно хотите его удалить?", {labels: {ok: "Ok", cancel: 'Отмена'}})
                .then(() => {

                    this.setState(({headerMenu}) => {
                        return {
                            headerMenu: []
                        }
                    })
                })
                .then(() => {UIkit.modal("#menu-modal").show();})
        }
        else{
            UIkit.modal.confirm("Вы действительно хотите удалить данный пункт? " +
                "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

                .then(() => {
                    this.setState(({headerMenu}) => {

                        const newHeaderMenu = [
                            ...headerMenu.slice(0, index),
                            ...headerMenu.slice(index+1)
                        ];
                        //console.log(newSlides);
                        newHeaderMenu.forEach((item, j) => {
                            item.index = j;
                        });
                        return {
                            headerMenu: newHeaderMenu
                        }
                    })
                })
                .then(() => {UIkit.modal("#menu-modal").show();})

        }
    };
    changeTextLink = (e, index) => {

        this.setState(({headerMenu}) => {
            const newHeaderMenuItem = {
                ...headerMenu[index],
                link: e.target.value
            };

            return {
                headerMenu: [
                    ...headerMenu.slice(0, index),
                    newHeaderMenuItem,
                    ...headerMenu.slice(index+1)
                ]
            }
        })
    };
    deleteLogo(e){
        e.preventDefault();
        if(this.state.headerMenu.length < 2){
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

    }
    saveHeaderLogoChange(e){
        const newDom = this.props.virtualDom.cloneNode(this.props.virtualDom);
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
                logo.setAttribute('src', this.state.headerLogo.img);
                logo.setAttribute('alt', this.state.headerLogo.alt);

            }
            else{
                const newLogoBlock = newDom.querySelector('.logo');
                newLogoBlock.removeAttribute('style');
                newLogoBlock.removeAttribute('disabled');

                const newLogo = document.createElement('img');
                newLogo.setAttribute('src', this.state.headerLogo.img);
                newLogo.setAttribute('alt', this.state.headerLogo.alt);
                newLogoBlock.appendChild(newLogo);


            }


            if(iframeLogoBlock && iframeLogo){
                iframeLogo.setAttribute('src', this.state.headerLogo.img);
                iframeLogo.setAttribute('alt', this.state.headerLogo.alt);

            }
            else{
                const newIframeLogoBlock = iframe.contentDocument.querySelectorAll('.logo')[0];
                newIframeLogoBlock.removeAttribute('style');
                newIframeLogoBlock.removeAttribute('disabled');

                const newIframeLogo = document.createElement('img');
                newIframeLogo.setAttribute('src', this.state.headerLogo.img);
                newIframeLogo.setAttribute('alt', this.state.headerLogo.alt);
                newIframeLogoBlock.appendChild(newIframeLogo);





            }

        }


        this.closeAccord();

        this.props.virtualDomLoaded(newDom);



    }
    changeLogoImage(e){

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

                        const newLogo = headerLogo;
                        newLogo.img = `../userDir/images/${res}`;

                        return {
                            headerLogo: newLogo
                        }
                    })
                })
                .catch(() => this.showNotifications('Ошибка сохранения', 'danger'))






        }
    }
    changeLogoAlt(e){
        this.setState(({headerLogo}) => {
            const newHeaderLogo = headerLogo;
            newHeaderLogo.alt = e.target.value;
            return {
                headerLogo: newHeaderLogo
            }
        })
    }


    changeTitleLink = (e, index) => {

        this.setState(({headerMenu}) => {
            const newHeaderMenuItem = {
                ...headerMenu[index],
                name: e.target.value
            };

            return {
                headerMenu: [
                    ...headerMenu.slice(0, index),
                    newHeaderMenuItem,
                    ...headerMenu.slice(index+1)
                ]
            }
        })
    };

    getHeaderMenuInfo(){
        const menuItems = this.getItemsHeader('.menu li');

        const headerMenuItems = [];
        menuItems.forEach((menuItem, i) => {
            const item = {};
            item.index = i;
            item.name = menuItem.querySelector('a').innerHTML;
            item.link = menuItem.querySelector('a').getAttribute('href');

            headerMenuItems.push(item);
        });


        this.setState(({headerMenu}) =>{
            return{
                headerMenu: headerMenuItems
            }
        })
    }

    getItemsHeader(str){
        const newDom = this.props.virtualDom.cloneNode(this.props.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        DOMHelper.unwrapImages(newDom);
        //let iframeFromHTML =  HtmlObjectTransform.getObjectIframeFromHtml(newDom);
        const items = newDom.querySelectorAll(str);
        return items;
    }
    getHeaderLogoInfo(){
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



    getHeaderPhoneInfo(){
        const phone = this.getItemsHeader('.info-phone')[0];
        if(phone){


            this.setState(({headerPhone}) =>{
                const newPhone = headerPhone;
                newPhone.phone = phone.innerHTML;
                return{
                    headerPhone: newPhone
                }
            })
        }


    }

    getHeaderEmailInfo(){
        const email = this.getItemsHeader('.info-email')[0];
        this.setState(({headerEmail}) =>{
            const newEmail = headerEmail;
            newEmail.email = email.innerHTML;
            return{
                headerEmail: newEmail
            }
        })

    }


    render() {
        const {target, modal} = this.props;
        const {headerMenu, headerPhone, headerEmail, headerLogo} = this.state;


        const classButtonDelete = 'uk-button uk-button-danger uk-modal-close';
        const classButtonDisabled = {
            display: 'none'
        };


        let headerMenuStr = '';
        let headerPhoneStr = '';
        let headerEmailStr = '';
        let headerLogoStr = '';
        if (headerMenu) {
            const menuHtml = headerMenu.map((item, index) => {
                return <div key={index} data-header-menu={index}>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title">Пункт меню {index + 1}</h3>
                        <div className="uk-card-body">
                            <form>
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Название</div>
                                    <div className="uk-margin">
                                        <input onChange={(e) => {
                                            this.changeTitleLink(e, index)
                                        }} className="uk-input main-heading" type="text" placeholder={item.name}/>
                                    </div>
                                    <div className="uk-form-label">Ссылка</div>
                                    <div className="uk-margin">
                                        <input onChange={(e) => {
                                            this.changeTextLink(e, index)
                                        }} className="uk-textarea main-text" rows="5" placeholder={item.link}></input>
                                    </div>
                                </fieldset>
                                <button onClick={(e) => {
                                    this.deleteMenuItem(e, index)
                                }} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить пункт
                                    меню
                                </button>
                            </form>
                        </div>
                    </div>
                </div>;

            });


            headerMenuStr =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {menuHtml}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {
                            this.saveMenuChange(e)
                        }}>Сохранить изменения
                        </button>
                        <button className="uk-button uk-margin-left uk-button-default" type="button" onClick={(e) => {
                            this.addMenuItem(e)
                        }}>Добавить новый пункт
                        </button>
                    </p>
                </div>
            ;
        } else {
            headerMenuStr = 'В шапке сайта нет меню';
        }

        if (headerPhone) {
            const infoHtml =
                <div>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title">Номер телефона</h3>
                        <div className="uk-card-body">
                            <form>
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Номер телефона</div>
                                    <div className="uk-margin">
                                        <input onChange={(e) => {
                                            this.changePhone(e)
                                        }} className="uk-input main-heading" type="text" placeholder={headerPhone.phone}/>
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
        } else {
            headerPhoneStr = 'У вас не указан телефон';
        }

        if (headerEmail) {
            const infoHtml =
                <div>
                    <div className="uk-card uk-card-default">
                        <h3 className="uk-card-title">Email</h3>
                        <div className="uk-card-body">
                            <form>
                                <fieldset className="uk-fieldset">
                                    <div className="uk-form-label">Email</div>
                                    <div className="uk-margin">
                                        <input onChange={(e) => {
                                            this.changeEmail(e)
                                        }} className="uk-input main-heading" type="text" placeholder={headerEmail.email}/>
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
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {
                            this.saveHeaderEmailChange(e)
                        }}>Сохранить изменения
                        </button>

                    </p>
                </div>
            ;
        } else {
            headerEmailStr = 'У вас не указан email';
        }

        if (headerLogo) {
            const infoHtml = <div>

                    <div className="uk-card uk-card-default">
                        <div className="uk-card-media-top uk-padding uk-padding-remove-bottom">
                            <img className="uk-width-1-3 uk-align-center" src={headerLogo.img ? headerLogo.img : '../images/default.jpg'} alt=""/>
                        </div>
                        <div className="uk-card-body">
                            <form>
                                <div className="uk-margin">
                                    <div className="uk-form-label">Изображение</div>
                                    <div>
                                        <input onChange={(e) => {this.changeLogoImage(e)}} type="file"/>
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
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {
                            this.saveHeaderLogoChange(e)
                        }}>Сохранить изменения
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
                    <h2 className="uk-modal-title">Настройка слайдера</h2>

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
        virtualDom: state.virtualDom
    }
};
const mapDispatchToProps = {
    virtualDomLoaded
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuModal);