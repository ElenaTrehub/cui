import React, {Component} from 'react';
import {connect} from "react-redux";
import WithCreateService from "../hoc";
import DOMHelper from "../../helpers/dom-helper";
import {
    isChangePanelShow,
    virtualDomChanged
} from '../../actions';


class SectionChangeModal extends Component{

    constructor(props) {
        super(props);

        this.state = {
            sections: [],
            color: 'light'
        }


    }

    chooseSection = (e, id, name) => {

        const {CreatorService, section, currentSiteStyle, currentRubric, currentSiteType, libs} = this.props;
        const {color} = this.state;
        const iframe = document.querySelector('iframe');
        const page = iframe.contentDocument.body.getAttribute('data-page');

        CreatorService.getChooseSection(currentRubric, section, currentSiteStyle.name, color, id, currentSiteType)
            .then((res) => {
                let sectionNmae = '';
                if(section !== 'header' && section !== 'footer'){
                    sectionNmae = page + '-' + section;
                }
                else{
                    sectionNmae = section;
                }
                fetch("../../api/saveSectionStyleChange.php", {
                    method: 'POST',
                    body: JSON.stringify({section: sectionNmae, css: res.css})
                })
                    .then((result) => {
                        if(!result.ok){
                            throw Error(res.statusText)
                        }

                    })

                    return res;

            })

            .then((res) => {

                if(section === 'header' || section === 'footer'){
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
                        const currentDomSection = newDom.querySelector('.'+section);



                        const newSection = document.createElement('section');
                        newSection.innerHTML = res.html;



                        const deletePanel = currentDomSection.querySelector('delete-section').cloneNode(true);


                        while(currentDomSection.firstChild){
                            currentDomSection.firstChild.remove();
                        }



                        const divs = newSection.querySelectorAll('section > div');
                        divs.forEach((item) => {
                            currentDomSection.appendChild(item);
                        })
                        currentDomSection.appendChild(deletePanel);



                        const virtualDomObj = {
                            name: name,
                            html: newDom
                        }
                        changedVirtualDom.push(virtualDomObj);
                    })
                    const currentIframeSection = iframe.contentDocument.querySelector('.'+section);

                    const newSectionIframeWrapper = document.createElement('section');
                    newSectionIframeWrapper.innerHTML = res.html;
                    const deleteIframePanel = iframe.contentDocument.querySelector('delete-section').cloneNode(true);
                    while(currentIframeSection.firstChild){
                        currentIframeSection.firstChild.remove();
                    }
                    const divsIframe = newSectionIframeWrapper.querySelectorAll('section > div');
                    divsIframe.forEach((item) => {
                        currentIframeSection.appendChild(item);
                    })
                    currentIframeSection.appendChild(deleteIframePanel);


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

                    const currentDomSection = newDom.querySelector('.'+section);
                    const currentIframeSection = iframe.contentDocument.querySelector('.'+section);

                    const newSection = document.createElement('section');
                    newSection.innerHTML = res.html;

                    const newSectionIframeWrapper = document.createElement('section');
                    newSectionIframeWrapper.innerHTML = res.html;

                    const deletePanel = currentDomSection.querySelector('delete-section').cloneNode(true);
                    const deleteIframePanel = iframe.contentDocument.querySelector('delete-section').cloneNode(true);

                    while(currentDomSection.firstChild){
                        currentDomSection.firstChild.remove();
                    }
                    while(currentIframeSection.firstChild){
                        currentIframeSection.firstChild.remove();
                    }

                    const divs = newSection.querySelectorAll('section > div');
                    divs.forEach((item) => {
                        currentDomSection.appendChild(item);
                    })
                    currentDomSection.appendChild(deletePanel);

                    const divsIframe = newSectionIframeWrapper.querySelectorAll('section > div');
                    divsIframe.forEach((item) => {
                        currentIframeSection.appendChild(item);
                    })
                    currentIframeSection.appendChild(deleteIframePanel);

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
                let sectionName = '';
                if(section !== 'header' && section !== 'footer'){
                    sectionName = page + '-' + section;
                }
                else{
                    sectionName = section;
                }

                if(res.js){

                    fetch("../../api/saveSectionJsChange.php", {
                        method: 'POST',
                        body: JSON.stringify({section: sectionName, js: '{/*libs-start*/'+res.libs+'/*libs-end*/'+res.js+'}'})
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
                        sections: []
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

            .then(() => {
                const iframe = document.querySelector('iframe');
                //console.log(iframe);

                this.props.enableDeleteSectionButton(iframe);
            });
            //.then(() => this.props.saveSiteChange(e))
            //.then(() => this.props.isChangePanelShow())
            //.then(() => iframe.load("../userDir/empty.html"))
            //.then(() => iframe.load("../userDir/index.html"))
            //.then(() => this.props.enableEditing(iframe))






    }
    closeAccord = () => {

        const accordBlock = document.querySelector('.change-section-dialog');
        const links = accordBlock.querySelectorAll('.uk-accordion-title');
        const accords = accordBlock.querySelectorAll('li');

        accords.forEach((accord, i) => {
            if(accord.classList.contains('uk-open')){
                links[i].click();
            }


        });
    };
    darkThemeChange = (e) => {
        this.setState(() => {
            return {
                color: 'dark'
            }
        })
    }

    lightThemeChange = (e) => {
        this.setState(() => {
            return {
                color: 'light'
            }
        })
    }

    getSections = (e) => {
        if(e.target.parentNode.classList.contains('uk-open')){
            const {CreatorService, section, currentSiteStyle, currentRubric} = this.props;


            CreatorService.getSectionsByName(currentRubric, section, currentSiteStyle.name)
                .then(res => {
                    let sectionArray = [];
                    res.forEach((item) => {
                        let secItem = {};

                        let toUpperSection = section.charAt(0).toUpperCase() + section.slice(1);

                        let id = 'id'+ toUpperSection;
                        secItem.index = item[id];
                        secItem.folder = section + 's';
                        secItem.preview = item.preview;

                        sectionArray.push(secItem);
                    })

                    return sectionArray;
                })
                .then((res) => {
                    this.setState(({sections}) => {
                        return {
                            sections: res
                        }
                    })
                })




        }
    }


    render() {
        const {section, target, modal} = this.props;
        const {sections, color} = this.state;
        let sectionsStr = '';



        let colorContent = '';
        if(color.length > 0){

            colorContent =
                <form className="uk-margin-large">
                    <h4  className="uk-modal-title">Выбор цветовой гаммы секции</h4>
                    <label><input onChange={this.lightThemeChange} className="uk-radio" type="radio" name="radio2"
                                  defaultChecked={true}/>Светлая</label>
                    <label><input onChange={this.darkThemeChange} className="uk-radio" type="radio" name="radio2"/>Темная</label>


                </form>



        }
        if(sections.length > 0){

            let sectionHtml = sections.map((item, index) => {
                let imageSrc = '../../images/blocks/'+ item.folder +'/' + item.preview;
                return <li className="uk-margin-bottom uk-background-primary uk-padding-small"
                           key={index}><p>{index+1}</p><img src={imageSrc}
                        alt=""/>
                    <button onClick={(e) => {
                        this.chooseSection(e, item.index, section)
                    }} className="uk-button uk-button-primary uk-margin-top uk-modal-close" type="button">Выбрать
                    </button>
                </li>;
            });

            sectionsStr = <div className="main-slider-wrapper">
                        <div  className="uk-light" style={{height: '100%'}}>
                            <ul className="uk-nav">

                                {sectionHtml}
                            </ul>
                        </div>
            </div>
        }
        else{
            sectionsStr = 'Варианты для выбора по данной секции отсутствуют!';
        }
        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Варианты секции</h2>
                    <ul uk-accordion="true" className="change-section-dialog">
                        <li>
                            <a className="uk-accordion-title" onClick={(e) => {this.getSections(e)}} href="#">Выбирите вариант</a>
                            <div className="uk-accordion-content">
                                {colorContent}
                                {sectionsStr}
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

            )


    }
}
const mapStateToProps = (state) => {
    return {
        virtualDom: state.virtualDom,
        currentSiteType: state.currentSiteType,
        currentSiteStyle: state.currentSiteStyle,
        currentTheme: state.currentTheme,
        currentRubric: state.currentRubric,
        changePanelShow: state.changePanelShow,
        //libs: state.libs
    }
};
const mapDispatchToProps = {
    isChangePanelShow,
    virtualDomChanged,
    //libsSet
};

export default WithCreateService()(connect(mapStateToProps, mapDispatchToProps)(SectionChangeModal));