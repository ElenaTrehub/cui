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
            element.childNodes.forEach(node => {

                if(node.nodeName === "SECTION") {
                    sections.push(node);
                }
            })
        };

        addButtonToSection(body);
        let buttons = [];
        sections.forEach((node, i) => {
            node.style.position = 'relative';
            const deleteButtonWrapper = document.createElement('delete-section');
            deleteButtonWrapper.style.position = 'absolute';
            deleteButtonWrapper.style.opacity = '.8';
            deleteButtonWrapper.style.top = '0';
            deleteButtonWrapper.style.right = '0';
            deleteButtonWrapper.style.padding = '10px';
            deleteButtonWrapper.style.zIndex = '1000';
            deleteButtonWrapper.style.backgroundColor = 'red';
            deleteButtonWrapper.style.color = 'white';
            deleteButtonWrapper.innerHTML = 'Удалить блок';
            deleteButtonWrapper.setAttribute('deleteSectionId', i);
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