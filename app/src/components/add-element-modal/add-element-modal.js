import React, {Component} from 'react';
import {connect} from "react-redux";
import DOMHelper from '../../helpers/dom-helper';
import {
    virtualDomLoaded, virtualDomChanged, isChangePanelShow
} from "../../actions";
import UIkit from "uikit";
import WithCreateService from "../hoc";

class AddElementModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
            notExistSections: [],
            nameCreateSection: '',
            notExistPage: []
        };




    }

    closeAccord = () => {

        const accordBlock = document.querySelector('.add-section-dialog');
        const links = accordBlock.querySelectorAll('.uk-accordion-title');
        const accords = accordBlock.querySelectorAll('li');

        accords.forEach((accord, i) => {
            if(accord.classList.contains('uk-open')){
                links[i].click();
            }


        });
    };

    addNewSection = () => {
        const {nameCreateSection} = this.state;
        const {CreatorService, currentSiteStyle, currentRubric, currentSiteType, currentTheme} = this.props;

        const iframe = document.querySelector('iframe');

        CreatorService.getAddSection(currentRubric, nameCreateSection, currentSiteStyle.name, currentSiteType, currentTheme.name)
            .then((res) => {
console.log(res);
                fetch("../../api/addSectionStyle.php", {
                    method: 'POST',
                    body: JSON.stringify({css: res.css})
                })
                    .then((result) => {
                        if(!result.ok){
                            throw Error(res.statusText)
                        }

                    })

                return res;

            })

            .then((res) => {

                if(nameCreateSection === 'header' || nameCreateSection === 'footer'){
                    let newVirtualDom = [];
                    const page = iframe.contentDocument.body.getAttribute('data-page');

                    let newDom = '';
                    let names = [];
                    this.props.virtualDom.forEach(item => {
                        //if(item.name === page){
                        newDom = item.html.cloneNode(true);
                        names.push(item.name);
                        // }
                        newVirtualDom.push(newDom);
                    });
                    let changedVirtualDom = [];
                    newVirtualDom.forEach((newDom, index) => {
                        const name  = names[index];

                        const newSectionWrapper = document.createElement('section');
                        newSectionWrapper.innerHTML = res.html;

                        const divs = newSectionWrapper.querySelectorAll('section > div');

                        const newSection = document.createElement('section');
                        newSection.classList.add(nameCreateSection);
                        newSection.classList.add('section');
                        newSection.setAttribute('id', nameCreateSection);

                        divs.forEach((item) => {
                            newSection.appendChild(item);
                        })
                        const sectionWidthPanel = DOMHelper.addSectionPanel(newSection);
                        if(section === 'header'){
                            const theFirstChild = newDom.firstChild;
                            newDom.insertBefore(sectionWidthPanel, theFirstChild);
                        }
                        else{
                            newDom.appendChild(sectionWidthPanel);
                        }

                        const virtualDomObj = {
                            name: name,
                            html: newDom
                        }
                        changedVirtualDom.push(virtualDomObj);
                    })


                    this.props.virtualDomChanged(changedVirtualDom);
                }
                else{
                    let newVirtualDom = [];
                    const page = iframe.contentDocument.body.getAttribute('data-page');

                    let newDom = '';
                    let name = '';
                    this.props.virtualDom.forEach(item => {
                        if(item.name === page){
                            newDom = item.html.cloneNode(true);
                            name = item.name;
                        }
                        newVirtualDom.push(item);
                    });

                    const newSectionWrapper = document.createElement('section');
                    newSectionWrapper.innerHTML = res.html;

                    const divs = newSectionWrapper.querySelectorAll('section > div');

                    const newSection = document.createElement('section');
                    newSection.classList.add(nameCreateSection);
                    newSection.classList.add('section');
                    newSection.setAttribute('id', nameCreateSection);

                    divs.forEach((item) => {
                        newSection.appendChild(item);
                    })
                    const sectionWidthPanel = DOMHelper.addSectionPanel(newSection);

                    const footer = newDom.querySelector('.footer');
                    if(footer){
                        newDom.insertBefore(sectionWidthPanel, footer);
                    }
                    else{
                        newDom.appendChild(sectionWidthPanel);
                    }



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




                return res;
            })
            .then((res) => {
                if(res.js){
                    fetch("../../api/addSectionJs.php", {
                        method: 'POST',
                        body: JSON.stringify({js: res.js})
                    })
                        .then((result) => {
                            if(!result.ok){
                                throw Error(res.statusText)
                            }

                        })
                }
                return res;

            })
            .then(() => this.closeAccord())
            .then(() => {
                this.setState(() => {
                    return {
                        nameCreateSection: ''
                    }
                })
            })
            .then(() => this.props.saveSiteChange())
            .then(() => this.props.isChangePanelShow())
            .then(() => iframe.load("../userDir/empty.html"))
            .then(() => iframe.load("../userDir/index.html"))
            .then(() => this.props.enableEditing(iframe))


    }
    chooseCreateSection = (e) => {

        this.setState(() => {
            return {
                nameCreateSection: e.target.options[e.target.selectedIndex].dataset.name.toLowerCase()
            }
        })
    }

    getPageInfo = () => {

    }
    getSectionInfo = (e) => {

        if(e.target.parentNode.classList.contains('uk-open')){
            const {CreatorService} = this.props;
            CreatorService.getAllSectionNames()
                .then(res => {

                    const iframe = document.querySelector('iframe');

                    const sectionsIframe = iframe.contentDocument.querySelectorAll('section');
                    let sectionsArray = [];


                    sectionsIframe.forEach((section) => {
                        sectionsArray.push(section.getAttribute('id'));
                    });


                    const freeSection = Object.keys(res).filter((item) => {
                        return sectionsArray.indexOf(item) < 0
                    });

                    let freeSectionArray = [];
                    freeSection.forEach((item) => {
                        freeSectionArray.push(res[item]);
                    })


                    this.setState(() => {
                        return {
                            notExistSections: freeSectionArray
                        }
                    })

                })
        }

    }
    render() {
        const {target, modal} = this.props;
        const {notExistSections, notExistPage} = this.state;


        let addSectionStr = '';
        let addPageStr = '';

        if(this.props.currentSiteType === 'landing'){
            addPageStr = 'Вы выбрали одностраничный сайт! Вы не можете добавить страницу!';
        }

        if(notExistSections.length > 0){

            const sectionList  = notExistSections.map((section) => {
                return <option data-name={section.en} key={section.en}>{section.ru}</option>
            });

            const sectionContent =
                <form className="uk-margin-large">

                    <h4  className="uk-modal-title">Выбор секции</h4>
                    <select className="uk-select"  onChange={this.chooseCreateSection }>
                        <option>Выберите секцию</option>
                        {sectionList}
                    </select>


                </form>

            addSectionStr =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {sectionContent}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={this.addNewSection}>Добавить секцию
                        </button>

                    </p>
                </div>

        }
        else{
            addSectionStr = 'Все варианты секций используются на странице сайта';
        }


        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog add-section-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Настройка шапки сайта</h2>

                    <ul uk-accordion="true" className="menu-dialog">
                        <li>
                            <a className="uk-accordion-title" onClick={this.getSectionInfo} href="#">Добавить секцию</a>
                            <div className="uk-accordion-content">
                                {addSectionStr}
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title" onClick={this.getPageInfo} href="#">Добавить страницу</a>
                            <div className="uk-accordion-content">
                                {addPageStr}
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
        currentSiteStyle: state.currentSiteStyle,
        currentTheme: state.currentTheme,
        currentRubric: state.currentRubric,
    }
};
const mapDispatchToProps = {
    virtualDomLoaded,
    virtualDomChanged,
    isChangePanelShow
};

export default WithCreateService()(connect(mapStateToProps, mapDispatchToProps)(AddElementModal));