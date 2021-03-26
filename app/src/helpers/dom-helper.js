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