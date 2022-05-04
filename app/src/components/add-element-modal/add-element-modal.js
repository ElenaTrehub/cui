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
        const {CreatorService, currentSiteStyle, currentRubric, currentSiteType, currentTheme, libs} = this.props;

        const iframe = document.querySelector('iframe');
        const page = iframe.contentDocument.body.getAttribute('data-page');
        CreatorService.getAddSection(currentRubric, nameCreateSection, currentSiteStyle.name, currentSiteType, currentTheme.name)
            .then((res) => {

                let section = '';
                if(nameCreateSection !== 'header' && nameCreateSection !== 'footer'){
                    section = page + '-' + nameCreateSection;
                }
                else{
                    section = nameCreateSection;
                }

                fetch("../../api/addSectionStyle.php", {
                    method: 'POST',
                    body: JSON.stringify({section: section, css: res.css})
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
                        if(nameCreateSection === 'footer'){
                            newSection.classList.add('section');
                        }
                        newSection.setAttribute('id', nameCreateSection);

                        divs.forEach((item) => {
                            newSection.appendChild(item);
                        })


                        const sectionWidthPanel = DOMHelper.addSectionPanel(newSection);


                        if(nameCreateSection === 'header'){
                            const theFirstChild = newDom.firstChild;
                            //const theFirstChildIframe = iframe.contentDocument.body.firstChild;
                            newDom.insertBefore(sectionWidthPanel, theFirstChild);
                            //iframe.contentDocument.body.insertBefore(sectionIframeWidthPanel, theFirstChildIframe);
                        }
                        else{

                            newDom.appendChild(sectionWidthPanel);
                            //iframe.contentDocument.body.appendChild(sectionIframeWidthPanel);
                        }

                        const virtualDomObj = {
                            name: name,
                            html: newDom
                        }
                        changedVirtualDom.push(virtualDomObj);
                    })
                    const newSectionIframeWrapper = document.createElement('section');
                    newSectionIframeWrapper.innerHTML = res.html;

                    const divsIframe = newSectionIframeWrapper.querySelectorAll('section > div');

                    const newIframeSection = document.createElement('section');
                    newIframeSection.classList.add(nameCreateSection);
                    if(nameCreateSection === 'footer'){
                        newIframeSection.classList.add('section');
                    }

                    newIframeSection.setAttribute('id', nameCreateSection);

                    divsIframe.forEach((item) => {
                        newIframeSection.appendChild(item);
                    })
                    const sectionIframeWidthPanel = DOMHelper.addSectionPanel(newIframeSection);


                    if(nameCreateSection === 'header'){
                        //const theFirstChild = newDom.firstChild;
                        const theFirstChildIframe = iframe.contentDocument.body.firstChild;
                        //newDom.insertBefore(sectionWidthPanel, theFirstChild);
                        iframe.contentDocument.body.insertBefore(sectionIframeWidthPanel, theFirstChildIframe);
                    }
                    else{

                        //newDom.appendChild(sectionWidthPanel);
                        iframe.contentDocument.body.appendChild(sectionIframeWidthPanel);
                    }
                    this.props.virtualDomChanged(changedVirtualDom);
                }
                else{
                    let newVirtualDom = [];


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

                    const newSectionIframeWrapper = document.createElement('section');
                    newSectionIframeWrapper.innerHTML = res.html;

                    const divs = newSectionWrapper.querySelectorAll('section > div');
                    const divsIframe = newSectionIframeWrapper.querySelectorAll('section > div');

                    const newSection = document.createElement('section');
                    newSection.classList.add(nameCreateSection);
                    newSection.classList.add('section');
                    newSection.setAttribute('id', nameCreateSection);

                    divs.forEach((item) => {
                        newSection.appendChild(item);
                    })

                    const newIframeSection = document.createElement('section');
                    newIframeSection.classList.add(nameCreateSection);
                    newIframeSection.classList.add('section');
                    newIframeSection.setAttribute('id', nameCreateSection);

                    divsIframe.forEach((item) => {
                        newIframeSection.appendChild(item);
                    })
                    const sectionWidthPanel = DOMHelper.addSectionPanel(newSection);
                    const sectionIframeWidthPanel = DOMHelper.addSectionPanel(newIframeSection);


                    const footer = newDom.querySelector('.footer');
                    if(footer){
                        newDom.insertBefore(sectionWidthPanel, footer);
                    }
                    else{
                        newDom.appendChild(sectionWidthPanel);
                    }

                    const footerIframe = iframe.contentDocument.querySelector('.footer');
                    if(footerIframe){
                        iframe.contentDocument.body.insertBefore(sectionIframeWidthPanel, footerIframe);
                    }
                    else{
                        iframe.contentDocument.appendChild(sectionIframeWidthPanel);
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

                // let needLibs = [];
                // console.log(libs);
                // res.set.libs.forEach((item) => {
                //     if(libs.indexOf(item) === -1){
                //         needLibs.push(item);
                //     }
                // });
                // let jsStr = '';
                // if(needLibs.length > 0){
                //     jsStr = res.libs + ' ' + res.js;
                // }
                // else{
                //     jsStr = res.js;
                // }


                if(res.js){
                    let section = '';
                    if(nameCreateSection !== 'header' && nameCreateSection !== 'footer'){
                        section = page + '-' + nameCreateSection;
                    }
                    else{
                        section = nameCreateSection;
                    }


                    fetch("../../api/addSectionJs.php", {
                        method: 'POST',
                        body: JSON.stringify({section: section, js: '{/*libs-start*/'+res.libs+'/*libs-end*/'+res.js + '}'})
                    })
                        .then((result) => {
                            if(!result.ok){
                                throw Error(res.statusText)
                            }
                            // else{
                            //     this.props.libsSet(needLibs);
                            // }

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
            .then(() => {
                if(iframe.contentWindow.document.head.querySelector('link[href="style.css"]')){
                    iframe.contentWindow.document.head.querySelector('link[href="style.css"]').remove();
                }
                if(iframe.contentWindow.document.head.querySelector('link[href="example.css"]')){
                    iframe.contentWindow.document.head.querySelector('link[href="example.css"]').remove();
                }

                const link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', 'example.css');

                iframe.contentWindow.document.head.append(link);

                if(iframe.contentWindow.document.head.querySelector('script[src="main.js"]')!==null){
                    iframe.contentWindow.document.head.querySelector('script[src="main.js"]').remove();
                }
                if(iframe.contentWindow.document.head.querySelector('script[src="example.js"]')!==null){
                    iframe.contentWindow.document.head.querySelector('script[src="example.js"]').remove();
                }

                const script = document.createElement('script');
                script.setAttribute('src', 'example.js');


                iframe.contentWindow.document.body.append(script);
            })
            //.then(() => iframe.contentWindow.location.reload(true))
            //.then(() => this.props.saveSiteChange())
            //.then(() => this.props.isChangePanelShow())
            //.then(() => iframe.load("../userDir/empty.html"))
            //.then(() => iframe.load("../userDir/index.html"))
             .then(() => {
                 const iframe = document.querySelector('iframe');
                 //console.log(iframe);

                 this.props.enableDeleteSectionButton(iframe)
             });


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
        //libs: state.libs
    }
};
const mapDispatchToProps = {
    virtualDomLoaded,
    virtualDomChanged,
    isChangePanelShow,
    //slibsSet
};

export default WithCreateService()(connect(mapStateToProps, mapDispatchToProps)(AddElementModal));