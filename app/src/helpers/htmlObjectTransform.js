export default class HtmlObjectTransform{
    static getTextHtml(obj, parentBlock){
        //console.log(obj);
        const block = document.createElement(obj.tagName);

        if(obj.className){
            if(obj.className.includes(' ')){
                const strArray = obj.className.split(' ');
                strArray.forEach(elem => {
                    block.classList.add(elem);
                })
            }
            else{
                block.classList.add(obj.className);
            }

        }

        if(obj.alt){
            block.setAttribute('alt', obj.alt);
        }
        if(obj.src){
            block.setAttribute('src', obj.src);
        }
        if(obj.link){
            block.innerHTML = obj.link;
        }
        if(obj.content){
            block.innerHTML = obj.content;
        }
        if(obj.href){
            block.setAttribute('href', obj.href);
        }
        if(obj.type){
            block.setAttribute('type', obj.type);
        }
        if(obj.name){
            block.setAttribute('name', obj.name);
        }
        if(obj.placeholder){
            block.setAttribute('placeholder', obj.placeholder);
        }
        if(obj.required){
            block.setAttribute('required', obj.required);
        }
        if(obj.id){
            block.setAttribute('id', obj.id);
        }
        if(obj.width){
            block.setAttribute('width', obj.width);
        }
        if(obj.height){
            block.setAttribute('height', obj.height);
        }
        if(obj.frameborder){
            block.setAttribute('frameborder', obj.frameborder);
        }
        if(obj.style){
            block.setAttribute('style', obj.style);
        }
        if(obj["aria-hidden"]){
            block.setAttribute('aria-hidden', obj["aria-hidden"]);
        }
        if(obj.tabindex){
            block.setAttribute('tabindex', obj.tabindex);
        }

        parentBlock.appendChild(block);
        if(obj.children){
            obj.children.forEach(elem => {
                this.getTextHtml(elem, block);
            })
        }

        return block;

    }
    static buildCssFile(style){
        fetch("../api/createCssPage.php", {
            method: 'POST',
            body: JSON.stringify({css: style})
        }).then((res) => {
            if(!res.ok){
                throw Error(res.statusText)
            }

        });

    }

    static buildThemeFile(fileName){

        fetch("../api/createThemePage.php", {
            method: 'POST',
            body: JSON.stringify({name: fileName})
        }).then((res) => {
            if(!res.ok){
                throw Error(res.statusText)
            }

        });
    }

    static buildJsFile(script){
        fetch("../api/createJsFile.php", {
            method: 'POST',
            body: JSON.stringify({js: script})
        }).then((res) => {
            if(!res.ok){
                throw Error(res.statusText)
            }

        });

    }

    static getObjectIframeFromHtml(iframe){
        function getAttributesName(elem){
            let objElem = {};
            //console.log(elem.nodeName);
            if(elem.nodeName !== "#text" && elem.nodeName !=="I" && elem.nodeName !== "BR" && elem.nodeName !== undefined){
                //console.log(objElem.nodeName);
                objElem.tagName = elem.tagName;

            }

            if(elem.classList && elem.classList.length > 0){
                if(elem.classList.length > 1){
                    let styles = '';
                    let stylesStr = "";
                    elem.classList.forEach(className => {
                        stylesStr = stylesStr + className + ' ';

                    });
                    styles = stylesStr.trim();
                    objElem.className = styles;
                }
                else{
                    objElem.className = elem.classList[0];
                }
            }


            if(elem.nodeType == 1 && elem.hasAttribute("alt") == 'true'){
                objElem.alt = elem.getAttribute('alt');
            }
            if(elem.nodeType == 1 && elem.hasAttribute('src')){
                objElem.src = elem.getAttribute('src');
            }
            if(elem.nodeType == 1 && elem.hasAttribute('href')){
                objElem.href = elem.getAttribute('href');
            }

            if(elem.tagName === 'A' && elem.innerHTML.length > 0){
                objElem.link = elem.innerHTML;
            }
            if(((elem.tagName === 'P' || elem.tagName === 'H1' ||
                elem.tagName === 'H2' || elem.tagName === 'H3' || elem.tagName === 'H4'
                || elem.tagName === 'H5' || elem.tagName === 'H6' || elem.tagName === 'SPAN' || elem.tagName === 'BUTTON')
                && elem.innerHTML.length > 0) || (elem.tagName === 'DIV' && elem.childNodes[0].nodeName === "#text")){
                objElem.content = elem.innerHTML;
            }
            if(elem.nodeType == 1 && elem.hasAttribute('name')){
                objElem.name = elem.getAttribute('name');
            }
            if(elem.nodeType == 1 && elem.hasAttribute('type')){
                objElem.type = elem.getAttribute('type');
            }
            if(elem.nodeType == 1 && elem.hasAttribute('placeholder')){
                objElem.placeholder = elem.getAttribute('placeholder');
            }
            if(elem.nodeType == 1 && elem.hasAttribute('required')){
                objElem.required = elem.getAttribute('required');
            }
            if(elem.nodeType == 1 && elem.hasAttribute('id')){
                objElem.id = elem.getAttribute('id');
            }
            if(elem.nodeType == 1 && elem.hasAttribute('width')){
                objElem.width = elem.getAttribute('width');
            }
            if(elem.nodeType == 1 && elem.hasAttribute('height')){
                objElem.height = elem.getAttribute('height');
            }
            if(elem.nodeType == 1 && elem.hasAttribute('frameborder')){
                objElem.frameborder = elem.getAttribute('frameborder');
            }
            if(elem.nodeType == 1 && elem.hasAttribute('aria-hidden')){
                objElem['aria-hidden'] = elem.getAttribute('aria-hidden');
            }
            if(elem.nodeType == 1 && elem.hasAttribute('style')){
                objElem.style = elem.getAttribute('style');
            }
            if(elem.nodeType == 1 && elem.hasAttribute('tabindex')){
                objElem.tabindex = elem.getAttribute('tabindex');
            }
            return objElem;
        }
        function recurcy(dom, parentNoda = null){
            let obj = getAttributesName(dom);

            //console.log(obj);
            if(parentNoda !== null){
                if(!parentNoda.children){
                    parentNoda.children = [];
                }

                if(Object.keys(obj).length > 0){
                    parentNoda.children.push(obj);
                }

            }


            if(dom.childNodes.length > 0){
                dom.childNodes.forEach(node => {
                    if(node.nodeName !=="I" && node.nodeName !== "BR" && node.nodeName !== undefined){
                        //console.log(objElem.nodeName);
                        recurcy(node, obj);

                    }

                });
            }


           return obj;
           // console.log(obj);
        }

       return recurcy(iframe);

    }


}
