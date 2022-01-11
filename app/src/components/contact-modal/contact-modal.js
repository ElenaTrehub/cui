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

class ContactModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contactTitle: null,
            contactText: null,
            isNameInput: false,
            isSecondNameInput: false,
            isPhoneInput: false,
            isAddressInput: false,
            isEmailInput: false,
            isMessageInput: false,
            address: null,
            phone: null,
            email: null,
            time: null,
            holiday: null,
            projectName: 'Название Вашего проекта',
            adminEmail: "admin-email.com"

        }

    }
    saveContactChange = (e) => {
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

        const mainTitleHtml = newDom.querySelector('.contact-title');
        const mainTextHtml = newDom.querySelector('.contact-content__text');
        const addressHtml = newDom.querySelector('.contact-address');
        const phoneHtml = newDom.querySelector('.contact-phone');
        const emailHtml = newDom.querySelector('.contact-email');
        const timeHtml = newDom.querySelector('.contact-time');
        const holidayHtml = newDom.querySelector('.contact-holiday');
        const nameInputHtml = newDom.querySelector('.input-name');
        const phoneInputHtml = newDom.querySelector('.input-phone');
        const addressInputHtml = newDom.querySelector('.input-address');
        const emailInputHtml = newDom.querySelector('.input-email');
        const messageInputHtml = newDom.querySelector('.input-message');
        const secondNameInputHtml = newDom.querySelector('.input-second-name');
        const inputWrapper = newDom.querySelector('.input-wrapper');
        const form = newDom.querySelector('form');


        const iframeMainTitleHtml = iframe.contentDocument.querySelector('.contact-title');
        const iframeMainTextHtml = iframe.contentDocument.querySelector('.contact-content__text');
        const iframeAddressHtml = iframe.contentDocument.querySelector('.contact-address');
        const iframePhoneHtml = iframe.contentDocument.querySelector('.contact-phone');
        const iframeEmailHtml = iframe.contentDocument.querySelector('.contact-email');
        const iframeTimeHtml = iframe.contentDocument.querySelector('.contact-time');
        const iframeHolidayHtml = iframe.contentDocument.querySelector('.contact-holiday');
        const iframeNameInputHtml = iframe.contentDocument.querySelector('.input-name');
        const iframePhoneInputHtml = iframe.contentDocument.querySelector('.input-phone');
        const iframeAddressInputHtml = iframe.contentDocument.querySelector('.input-address');
        const iframeEmailInputHtml = iframe.contentDocument.querySelector('.input-email');
        const iframeMessageInputHtml = iframe.contentDocument.querySelector('.input-message');
        const iframeSecondNameInputHtml = iframe.contentDocument.querySelector('.input-second-name');
        const iframeInputWrapper = iframe.contentDocument.querySelector('.input-wrapper');
        const iframeForm = iframe.contentDocument.querySelector('form');





        const {contactTitle, contactText, isNameInput,
            isPhoneInput, isAddressInput, isEmailInput, isMessageInput, isSecondNameInput,
            address, phone, email, time, holiday,
            projectName, adminEmail} = this.state;

        if(mainTitleHtml){
            if(contactTitle){
                mainTitleHtml.innerHTML = contactTitle;
                iframeMainTitleHtml.innerText= contactTitle;

            }
            else{
                mainTitleHtml.remove();
                iframeMainTitleHtml.remove();
            }

        }
        if(mainTextHtml){
            if(contactText){
                mainTextHtml.innerHTML = contactText;
                iframeMainTextHtml.innerText= contactText;

            }
            else{
                mainTextHtml.remove();
                iframeMainTextHtml.remove();
            }
        }

        if(addressHtml){
            if(address){
                addressHtml.innerText = address;
                iframeAddressHtml.innerText= address;

            }
            else{
                addressHtml.parentNode.parentNode.remove();
                iframeAddressHtml.parentNode.parentNode.remove();
            }
        }

        if(phoneHtml){
            if(phone){
                phoneHtml.innerText = phone;
                iframePhoneHtml.innerText= phone;

            }
            else{
                phoneHtml.parentNode.parentNode.remove();
                iframePhoneHtml.parentNode.parentNode.remove();
            }
        }

        if(emailHtml){
            if(email){
                emailHtml.innerText = email;
                iframeEmailHtml.innerText= email;

            }
            else{
                emailHtml.parentNode.parentNode.remove();
                iframeEmailHtml.parentNode.parentNode.remove();
            }
        }
        if(timeHtml){
            if(time){
                timeHtml.innerText = time;
                iframeTimeHtml.innerText= time;

            }
            else{
                timeHtml.parentNode.parentNode.remove();
                iframeTimeHtml.parentNode.parentNode.remove();
            }
        }

        if(holidayHtml){
            if(holiday){
                holidayHtml.innerHTML = holiday;
                iframeHolidayHtml.innerText= holiday;

            }
            else{
                holidayHtml.parentNode.parentNode.remove();
                iframeHolidayHtml.parentNode.parentNode.remove();
            }
        }

        if(!isPhoneInput && !isAddressInput && !isEmailInput && !isMessageInput && !isSecondNameInput){
            if(form){
                form.remove();
                iframeForm.remove();
            }
        }
        else{

            if(isNameInput){
                if(nameInputHtml === null){
                    let input = document.createElement('input');
                    input.classList.add('input');
                    input.classList.add('input-name');
                    input.setAttribute('type', 'text');
                    input.setAttribute('name', 'name');
                    input.setAttribute('placeholder', 'Name');
                    input.setAttribute('required', 'true');

                    const domInput = input.cloneNode();
                    inputWrapper.insertBefore(input, messageInputHtml);
                    iframeInputWrapper.insertBefore(domInput, iframeMessageInputHtml);
                }
            }
            else{
                if(nameInputHtml){
                    iframeNameInputHtml.remove();
                    nameInputHtml.remove();
                }
            }


            if(isPhoneInput){
                if(phoneInputHtml === null){
                    let input = document.createElement('input');
                    input.classList.add('input');
                    input.classList.add('input-phone');
                    input.setAttribute('type', 'text');
                    input.setAttribute('name', 'phone');
                    input.setAttribute('placeholder', 'Phone');
                    input.setAttribute('required', 'true');



                    const domInput = input.cloneNode();
                    inputWrapper.insertBefore(input, messageInputHtml);
                    iframeInputWrapper.insertBefore(domInput, iframeMessageInputHtml);
                }
            }
            else{
                if(phoneInputHtml){
                    iframePhoneInputHtml.remove();
                    phoneInputHtml.remove();
                }
            }

            if(isAddressInput){
                if(addressInputHtml === null){
                    let input = document.createElement('input');
                    input.classList.add('input');
                    input.classList.add('input-address');
                    input.setAttribute('type', 'text');
                    input.setAttribute('name', 'address');
                    input.setAttribute('placeholder', 'Address');
                    input.setAttribute('required', 'true');

                    const domInput = input.cloneNode();
                    inputWrapper.insertBefore(input, messageInputHtml);
                    iframeInputWrapper.insertBefore(domInput, iframeMessageInputHtml);
                }
            }
            else{
                if(addressInputHtml !== null){
                    iframeAddressInputHtml.remove();
                    addressInputHtml.remove();
                }
            }

            if(isEmailInput){
                if(emailInputHtml === null){
                    let input = document.createElement('input');
                    input.classList.add('input');
                    input.classList.add('input-email');
                    input.setAttribute('type', 'text');
                    input.setAttribute('name', 'email');
                    input.setAttribute('placeholder', 'E-mail');
                    input.setAttribute('required', 'true');

                    const domInput = input.cloneNode();
                    inputWrapper.insertBefore(input, messageInputHtml);
                    iframeInputWrapper.insertBefore(domInput, iframeMessageInputHtml);
                }
            }
            else{
                if(phoneInputHtml){
                    iframeEmailInputHtml.remove();
                    emailInputHtml.remove();
                }
            }

            if(isMessageInput){
                if(messageInputHtml === null){
                    let input = document.createElement('textarea');
                    input.classList.add('textarea');
                    input.classList.add('input-message');
                    input.setAttribute('rows', 'text');
                    input.setAttribute('name', 'message');
                    input.setAttribute('placeholder', 'Задайте ваш вопрос здесь');
                    input.setAttribute('required', 'true');

                    const domInput = input.cloneNode();
                    inputWrapper.insertBefore(input, messageInputHtml);
                    iframeInputWrapper.insertBefore(domInput, iframeMessageInputHtml);
                }
            }
            else{
                if(messageInputHtml){
                    iframeMessageInputHtml.remove();
                    messageInputHtml.remove();
                }
            }

            if(isSecondNameInput){
                if(secondNameInputHtml === null){
                    let input = document.createElement('input');
                    input.classList.add('input');
                    input.classList.add('input-second-name');
                    input.setAttribute('type', 'text');
                    input.setAttribute('name', 'second-name');
                    input.setAttribute('placeholder', 'Second Name');
                    input.setAttribute('required', 'true');

                    const domInput = input.cloneNode();
                    inputWrapper.insertBefore(input, messageInputHtml);
                    iframeInputWrapper.insertBefore(domInput, iframeMessageInputHtml);
                }
            }
            else{
                if(secondNameInputHtml){
                    iframeSecondNameInputHtml.remove();
                    secondNameInputHtml.remove();
                }
            }
        }

        let inputName = document.createElement('input');
        inputName.setAttribute('type', 'hidden');
        inputName.setAttribute('name', 'project_name');
        inputName.setAttribute('value', projectName);
        console.log(inputName);
        const domInputName = inputName.cloneNode();

        inputWrapper.appendChild(inputName);
        iframeInputWrapper.appendChild(domInputName);

        let inputAdmin = document.createElement('input');
        inputAdmin.setAttribute('type', 'hidden');
        inputAdmin.setAttribute('name', 'project_name');
        inputAdmin.setAttribute('value', adminEmail);

        const domInputAdmin = inputAdmin.cloneNode();

        inputWrapper.appendChild(inputAdmin);
        iframeInputWrapper.appendChild(domInputAdmin);

        let inputSubj = document.createElement('input');
        inputSubj.setAttribute('type', 'hidden');
        inputSubj.setAttribute('name', 'form_subject');
        inputSubj.setAttribute('value', 'Заявка с сайта ' + projectName);

        const domInputSubj = inputSubj.cloneNode();

        inputWrapper.appendChild(inputSubj);
        iframeInputWrapper.appendChild(domInputSubj);


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
    changeAdminEmail = (e) => {
        this.setState(({adminEmail}) => {
            return {
                adminEmail: e.target.value
            }
        });
    }
    changeProjectName = (e) => {
        this.setState(({projectName}) => {
            return {
                projectName: e.target.value
            }
        });
    }
    secondNameChange = () => {
        this.setState(({isSecondNameInput}) => {
            let newItem = !isSecondNameInput;
            return {
                isSecondNameInput: newItem
            }
        });
    }
    messageChange = () => {
        this.setState(({isMessageInput}) => {
            let newItem = !isMessageInput;
            return {
                isMessageInput: newItem
            }
        });
    }
    emailChange = () => {
        this.setState(({isEmailInput}) => {
            let newItem = !isEmailInput;
            return {
                isEmailInput: newItem
            }
        });
    }
    addressChange = () => {
        this.setState(({isAddressInput}) => {
            let newItem = !isAddressInput;
            return {
                isAddressInput: newItem
            }
        });
    }
    phoneChange = () => {

        this.setState(({isPhoneInput}) => {
            let newItem = !isPhoneInput;
            return {
                isPhoneInput: newItem
            }
        });
    }
    nameChange = () => {

        this.setState(({isNameInput}) => {

            let newItem = !isNameInput;
            return {
                isNameInput: newItem
            }
        });
    }
    deleteHolidayText = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить выходные lyb ? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({holiday}) => {
                    return {
                        holiday: null
                    }
                })
            })
            .then(() => {UIkit.modal("#contact-modal").show();})
    }
    changeHolidayText = (e) => {
        this.setState(({holiday}) => {
            return {
                holiday: e.target.value
            }
        });
    }

    deleteTimeText = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить время работы ? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({time}) => {
                    return {
                        time: null
                    }
                })
            })
            .then(() => {UIkit.modal("#contact-modal").show();})
    }

    changeTimeText = (e) => {
        this.setState(({time}) => {
            return {
                time: e.target.value
            }
        });
    }

    deleteEmailText = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить email ? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({email}) => {
                    return {
                        email: null
                    }
                })
            })
            .then(() => {UIkit.modal("#contact-modal").show();})
    }

    changeEmailText = (e) => {
        this.setState(({email}) => {
            return {
                email: e.target.value
            }
        });
    }

    deletePhoneText = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить телефон ? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({phone}) => {
                    return {
                        phone: null
                    }
                })
            })
            .then(() => {UIkit.modal("#contact-modal").show();})
    }

    changePhoneText = (e) => {
        this.setState(({phone}) => {
            return {
                phone: e.target.value
            }
        });
    }
    deleteAddressText = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить адрес? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({address}) => {
                    return {
                        address: null
                    }
                })
            })
            .then(() => {UIkit.modal("#contact-modal").show();})
    }


    changeAddressText = (e) => {
        this.setState(({address}) => {
            return {
                address: e.target.value
            }
        });
    }

    deleteContactText = (e) => {

        UIkit.modal.confirm("Вы действительно хотите удалить общий текст? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({contactText}) => {
                    return {
                        contactText: null
                    }
                })
            })
            .then(() => {UIkit.modal("#contact-modal").show();})
    }

    changeContactText = (e) => {
        this.setState(({contactText}) => {
            return {
                contactText: e.target.value
            }
        });
    }
    closeAccord = () => {

        const accordBlock = document.querySelector('.contact-dialog');
        const links = accordBlock.querySelectorAll('.uk-accordion-title');
        const accords = accordBlock.querySelectorAll('li');

        accords.forEach((accord, i) => {
            if(accord.classList.contains('uk-open')){
                links[i].click();
            }


        });
    };

    deleteContactTitle = (e) => {
        UIkit.modal.confirm("Вы действительно хотите удалить общий заголовок? " +
            "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})

            .then(() => {
                this.setState(({contactTitle}) => {
                    return {
                        contactTitle: null
                    }
                })
            })
            .then(() => {UIkit.modal("#contact-modal").show();})
    }
    changeContactHeaderText = (e) => {
        this.setState(({contactTitle}) => {
            return {
                contactTitle: e.target.value
            }
        });
    }
    getContactInfo = () => {
        const newDom = document.querySelector('iframe');

        let contactTitle = null;
        let contactText = null;
        let address = null;
        let phone = null;
        let email = null;
        let time = null;
        let holiday = null;
        let isNameInput = false;
        let isPhoneInput = false;
        let isAddressInput = false;
        let isEmailInput = false;
        let isMessageInput = false;
        let isSecondNameInput = false;

        const mainTitleHtml = newDom.contentDocument.querySelector('.contact-title');
        if(mainTitleHtml){
            contactTitle = mainTitleHtml.innerHTML;
        }

        const mainTextHtml = newDom.contentDocument.querySelector('.contact-content__text');
        if(mainTextHtml){
            contactText = mainTextHtml.innerHTML;
        }

        const addressHtml = newDom.contentDocument.querySelector('.contact-address');
        if(addressHtml){
            address = addressHtml.innerHTML;
        }

        const phoneHtml = newDom.contentDocument.querySelector('.contact-phone');
        if(phoneHtml){
            phone = phoneHtml.innerHTML;
        }

        const emailHtml = newDom.contentDocument.querySelector('.contact-email');
        if(emailHtml){
            email = emailHtml.innerHTML;
        }

        const timeHtml = newDom.contentDocument.querySelector('.contact-time');
        if(timeHtml){
            time = timeHtml.innerHTML;
        }

        const holidayHtml = newDom.contentDocument.querySelector('.contact-holiday');
        if(holidayHtml){
            holiday = holidayHtml.innerHTML;
        }

        const nameInputHtml = newDom.contentDocument.querySelector('.input-name');
        if(nameInputHtml){
            isNameInput = true;
        }

        const phoneInputHtml = newDom.contentDocument.querySelector('.input-phone');
        if(phoneInputHtml){
            isPhoneInput = true;
        }

        const addressInputHtml = newDom.contentDocument.querySelector('.input-address');
        if(addressInputHtml){
            isAddressInput = true;
        }

        const emailInputHtml = newDom.contentDocument.querySelector('.input-email');
        if(emailInputHtml){
            isEmailInput = true;
        }

        const messageInputHtml = newDom.contentDocument.querySelector('.input-message');
        if(messageInputHtml){
            isMessageInput = true;
        }

        const secondNameInputHtml = newDom.contentDocument.querySelector('.input-second-name');
        if(secondNameInputHtml){
            isSecondNameInput = true;
        }

        this.setState(() =>{
            return{
                contactTitle: contactTitle,
                contactText: contactText,
                isNameInput: isNameInput,
                isPhoneInput: isPhoneInput,
                isAddressInput: isAddressInput,
                isEmailInput: isEmailInput,
                isMessageInput: isMessageInput,
                isSecondNameInput: isSecondNameInput,
                address: address,
                phone: phone,
                email: email,
                time: time,
                holiday: holiday

            }
        })
    }


    render() {
        const {contactTitle,
            contactText,

            address,
            phone,
            email,
            time,
            holiday,
            isNameInput,
            isPhoneInput,
            isAddressInput,
            isEmailInput,
            isMessageInput,
            isSecondNameInput,
            projectName,
            adminEmail
            } = this.state;
        const {target, modal} = this.props;


        let contact = '';

        if(contactTitle){


            let contactTitleInput = '';
            let contactTextInput = '';
            let addressInput = '';
            let phoneInput = '';
            let emailInput = '';
            let timeInput = '';
            let holidayInput = '';
            let formSettings = '';


            if(contactTitle !==null){
                contactTitleInput = <div>
                    <div className="uk-form-label">Общий заголовок</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeContactHeaderText(e)}} className="uk-input main-heading" type="text" placeholder={contactTitle} value={contactTitle}/>
                    </div>
                    {/*<button onClick={(e) => {this.deleteContactTitle(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить общий заголовок</button>*/}


                </div>;

            }
            else{
                contactTitleInput = '';
            }

            if(contactText !==null){
                contactTextInput = <div>
                    <div className="uk-form-label">Общий текст</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeContactText(e)}} className="uk-input main-heading" type="text" placeholder={contactText} value={contactText}/>
                    </div>
                    <button onClick={(e) => {this.deleteContactText(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить общий текст</button>
                </div>;

            }
            else{
                contactTextInput = '';
            }

            if(address !==null){
                addressInput = <div>
                    <div className="uk-form-label">Адрес</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeAddressText(e)}} className="uk-input main-heading" type="text" placeholder={address} value={address}/>
                    </div>
                    <button onClick={(e) => {this.deleteAddressText(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить адрес</button>
                </div>;

            }
            else{
                addressInput = '';
            }

            if(phone !==null){
                phoneInput = <div>
                    <div className="uk-form-label">Телефон</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changePhoneText(e)}} className="uk-input main-heading" type="text" placeholder={phone} value={phone}/>
                    </div>
                    <button onClick={(e) => {this.deletePhoneText(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить телефон</button>
                </div>;

            }
            else{
                phoneInput = '';
            }

            if(email !==null){
                emailInput = <div>
                    <div className="uk-form-label">Email</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeEmailText(e)}} className="uk-input main-heading" type="text" placeholder={email} value={email}/>
                    </div>
                    <button onClick={(e) => {this.deleteEmailText(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить телефон</button>
                </div>;

            }
            else{
                emailInput = '';
            }

            if(time !==null){
                timeInput = <div>
                    <div className="uk-form-label">Время работы</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeTimeText(e)}} className="uk-input main-heading" type="text" placeholder={time} value={time}/>
                    </div>
                    <button onClick={(e) => {this.deleteTimeText(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить время работы</button>
                </div>;

            }
            else{
                timeInput = '';
            }
            if(holiday !==null){
                holidayInput = <div>
                    <div className="uk-form-label">Выходные</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeHolidayText(e)}} className="uk-input main-heading" type="text" placeholder={holiday} value={holiday}/>
                    </div>
                    <button onClick={(e) => {this.deleteHolidayText(e)}} className="uk-button uk-button-danger uk-modal-close" type="button">Удалить выходные</button>
                </div>;

            }
            else{
                holidayInput = '';
            }

            let nameIsCheckStr = '';
            let phoneIsCheckStr = '';
            let addressIsCheckStr = '';
            let emailIsCheckStr = '';
            let messageIsCheckStr = '';
            let secondNameInputStr = '';

            nameIsCheckStr = <label><input className="uk-checkbox"
                                                type="checkbox"
                                               defaultChecked={isNameInput}   onChange={(e) => {this.nameChange()}}/>Поле для ввода имени</label>;


            secondNameInputStr = <label><input className="uk-checkbox"
                                           type="checkbox"
                                           defaultChecked={isSecondNameInput}   onChange={(e) => {this.secondNameChange()}}/>Поле для ввода фамилии</label>;


            phoneIsCheckStr = <label><input className="uk-checkbox"
                                                type="checkbox"
                                                defaultChecked={isPhoneInput}  onChange={(e) => {this.phoneChange()}}/>Поле для ввода телефона</label>;




            addressIsCheckStr = <label><input className="uk-checkbox"
                                                type="checkbox"
                                                  defaultChecked={isAddressInput}  onChange={(e) => {this.addressChange()}}/>Поле для ввода адреса</label>;




            emailIsCheckStr = <label><input className="uk-checkbox"
                                                  type="checkbox"
                                                defaultChecked={isEmailInput}  onChange={(e) => {this.emailChange()}}/>Поле для ввода email</label>;





            messageIsCheckStr = <label><input className="uk-checkbox"
                                                type="checkbox"
                                                  defaultChecked={isMessageInput}  onChange={(e) => {this.messageChange()}}/>Поле для ввода сообщения</label>;



            formSettings =<div>
                <div className="uk-form-label">Настройки формы</div>
                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    {nameIsCheckStr}
                    {phoneIsCheckStr}
                    {addressIsCheckStr}
                    {emailIsCheckStr}
                    {messageIsCheckStr}
                    {secondNameInputStr}
                </div>
            </div>;


            contact =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {contactTitleInput}
                    {contactTextInput}
                    {addressInput}
                    {phoneInput}
                    {emailInput}
                    {timeInput}
                    {holidayInput}
                    {formSettings}
                    <h3>Заполните данные для отправки формы</h3>
                    <div className="uk-form-label">Название Вашего проекта</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeProjectName(e)}} className="uk-input main-heading" type="text" placeholder={projectName} value={projectName}/>
                    </div>
                    <div className="uk-form-label">Email, куды будут приходить сообщения</div>
                    <div className="uk-margin">
                        <input onChange={(e) => {this.changeAdminEmail(e)}} className="uk-input main-heading" type="text" placeholder={adminEmail} value={adminEmail}/>
                    </div>
                    <p className="uk-text-right">

                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {this.saveContactChange(e)}}>Сохранить изменения</button>
                    </p>
                </div>
            ;
        }
        else{
            contact = 'На сайте нет секции Контакты';
        }
        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Настройка секции отзывов</h2>

                    <ul uk-accordion="true" className="contact-dialog">
                        <li>
                            <a className="uk-accordion-title" onClick={this.getContactInfo} href="#">Контакты</a>
                            <div className="uk-accordion-content">
                                {contact}
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
export default connect(mapStateToProps, mapDispatchToProps)(ContactModal);