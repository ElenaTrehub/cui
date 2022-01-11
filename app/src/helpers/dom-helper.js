import {remove} from "uikit/src/js/util";

export default class DOMHelper {

    static parseStrToDOM(str) {
        const parser = new DOMParser();
        return parser.parseFromString(str, "text/html");
    }

    static wrapTextNodes(dom) {
        const body = dom;
        let textNodes = [];

        function recursy(element) {
            element.childNodes.forEach(node => {

                if(node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
                    textNodes.push(node);
                } else {
                    recursy(node);
                }
            })
        };

        recursy(body);
//console.log(textNodes);
        textNodes.forEach((node, i) => {
            const wrapper = document.createElement('text-editor');
            node.parentNode.replaceChild(wrapper, node);
            wrapper.appendChild(node);
            wrapper.setAttribute("nodeid", i);
        });

        return dom;
    }

    static addSectionPanel(dom){
        const body = dom;
        let sections = [];

        function addButtonToSection(element) {
            if(element.nodeName === "SECTION"){
                sections.push(element);
            }
            else{
                element.childNodes.forEach(node => {

                    if(node.nodeName === "SECTION" || node.nodeName === "HEADER" || node.nodeName === "FOOTER") {
                        sections.push(node);
                    }
                })
            }

        };

        addButtonToSection(body);
        let buttons = [];
        sections.forEach((node, i) => {
            node.style.position = 'relative';
            const deleteButtonWrapper = document.createElement('delete-section');
            deleteButtonWrapper.style.position = 'absolute';
            deleteButtonWrapper.style.opacity = '0';
            deleteButtonWrapper.style.top = '0';
            deleteButtonWrapper.style.right = '0';
            deleteButtonWrapper.style.padding = '10px';
            deleteButtonWrapper.style.zIndex = '1000';
            deleteButtonWrapper.style.backgroundColor = 'rgba(192, 192, 192, .9)';
            deleteButtonWrapper.setAttribute('deleteSectionId', i);
            deleteButtonWrapper.style.borderRadius = '0 0 0 4px';


            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button uk-button';
            deleteButton.style.backgroundColor = '#E52B50';
            deleteButton.style.color = 'white';
            deleteButton.innerHTML = 'Удалить блок';
            deleteButton.style.border = 'none';
            deleteButton.style.borderRadius = '4px';
            deleteButton.style.outline = 'none';
            deleteButton.style.padding = '6px';
            deleteButton.style.marginRight = '10px';
            deleteButton.style.fontSize = '12px';
            deleteButton.style.opacity = '.8';
            deleteButton.style.transition = 'all .3s';


            const changeButton = document.createElement('button');
            changeButton.className = 'change-button uk-button';
            changeButton.style.backgroundColor = '#256D7B';
            changeButton.style.color = 'white';
            changeButton.innerHTML = 'Редактировать блок';
            changeButton.style.border = 'none';
            changeButton.style.borderRadius = '4px';
            changeButton.style.outline = 'none';
            changeButton.style.padding = '6px';
            changeButton.style.fontSize = '12px';
            changeButton.style.opacity = '.8';
            changeButton.style.transition = 'all .3s';
            changeButton.setAttribute('type', 'button');


            const sectionListButton = document.createElement('button');
            sectionListButton.className = 'section-list-button uk-button';
            sectionListButton.style.backgroundColor = 'blue';
            sectionListButton.style.color = 'white';
            sectionListButton.innerHTML = 'Заменить';
            sectionListButton.style.border = 'none';
            sectionListButton.style.borderRadius = '4px';
            sectionListButton.style.outline = 'none';
            sectionListButton.style.padding = '6px';
            sectionListButton.style.fontSize = '12px';
            sectionListButton.style.opacity = '.8';
            sectionListButton.style.transition = 'all .3s';
            sectionListButton.style.marginLeft = '10px';
            sectionListButton.setAttribute('type', 'button');

            deleteButtonWrapper.appendChild(deleteButton);
            deleteButtonWrapper.appendChild(changeButton);
            deleteButtonWrapper.appendChild(sectionListButton);
            node.appendChild(deleteButtonWrapper);

            //const button = document.getElementById(`deleteSectionId_${i}`);
            //document.addEventListener('click', (e) => {
                //if(e.target && e.target.tagName === 'BUTTON' &&  e.target.id === `deleteSectionId_${i}`){
                    //e.preventDefault();
                    //console.log('click');
                //}

            //});

        });


        return dom;
    }
    static serializeDOMToString(dom) {
        const serializer = new XMLSerializer();
        return serializer.serializeToString(dom);
    }

    static unwrapTextNodes(dom) {
        dom.querySelectorAll("text-editor").forEach(element => {
            element.parentNode.replaceChild(element.firstChild, element);
        });
    }

    static wrapImages(dom){
        dom.querySelectorAll('img').forEach((img, i) => {
            img.setAttribute('editableimgid', i);
        });
        return dom;
    }

    static unwrapImages(dom){
        dom.querySelectorAll('[editableimgid]').forEach((img) => {
            img.removeAttribute('editableimgid');
        });
    }
}