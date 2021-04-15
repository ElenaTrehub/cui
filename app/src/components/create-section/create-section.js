import React, {Component} from 'react';
import WithCreateService from "../hoc";
import {
    iframeLoaded,
    iframeRequested,
    iframeError,
    imageLoading,
    imageLoaded,
    virtualDomLoaded,
    iframeIsChange,
    deleteFavoriteIframe,
    chooseCurrentTheme,
    chooseCurrentFontStyle
} from '../../actions';
import Spinner from "../spinner";
import {connect} from "react-redux";
//import axios from 'axios';
import "../../helpers/iframeLoader.js";
import EditorText from '../editor-text';
//import EditorMeta from "../editor-meta";
import EditorImages from "../editor-images";
import UIkit from "uikit";
import PostponeModal from "../postpone-modal";
import HtmlObjectTransform from "../../helpers/htmlObjectTransform";
import DOMHelper from '../../helpers/dom-helper';
import ChooseModal from "../choose-modal";

import "uikit/dist/css/uikit.min.css";
import ThemeModal from "../theme-modal/theme-modal";
import FontModal from "../font-modal/font-modal"
import SliderModal from "../slider-modal/slider-modal";

class CreateSection extends Component{



    componentDidMount() {
        this.props.iframeRequested();
        const {CreatorService} = this.props;
        const idRubrics = +this.props.match.params.id;

        const iframe = document.querySelector('iframe');




        CreatorService.getIframeByRubricId(idRubrics)
           .then(res => {

                return res;
            })
            .then(res => {
                const answer = HtmlObjectTransform.buildCssFile(res.css);
                return res;
            })
            //.then(res => console.log(res.html))
            //.then(res => JSON.parse(res.html))
            .then(res => {
                const answer = HtmlObjectTransform.buildJsFile(res.script);
                return res;
            })
            .then((res) => {
                const answer = HtmlObjectTransform.buildThemeFile(this.props.currentTheme.name);
                return res;
            })
            .then((res) => {
                const answer = HtmlObjectTransform.buildFontFile('fontStyle');
                return res;
            })
            .then(
                (res) => {
                    return HtmlObjectTransform.getTextHtml(res.html, iframe);

                }
            )


            .then((html) => {this.props.iframeLoaded(html);
                            return html})

            .then(res => DOMHelper.wrapTextNodes(res))
            .then(res => DOMHelper.wrapImages(res))
            .then(res => DOMHelper.addSectionPanel(res))
            .then(dom => {
                this.props.virtualDomLoaded(dom);

                return dom;
            })
            .then(res => DOMHelper.serializeDOMToString(res))
            .then(html => {
                const head = `<head>
                    <meta charSet="UTF-8">
                        <title>Title</title>
                        <!-- Latest compiled and minified CSS -->
                        <link rel="stylesheet" href="../assets/bootstrap.min.css">
                            <link rel="stylesheet" href="../assets/animate.css">
                            <link rel="stylesheet" href="style.css">
                            <link rel="stylesheet" href="theme.css">
                            <link rel="stylesheet" href="fontStyle.css">
                </head>`;
                const js = `
                    <script src="main.js"></script>
                `;
                return head + html + js;
            })
            .then(html => fetch("../api/saveTempPage.php", {
                method: 'POST',
                body: JSON.stringify({html})
            }))
            .then((res) => {
                if(!res.ok){
                    throw Error(res.statusText)
                }
                //return res.json();
            })
            //.then((html) => axios.post("../api/saveTempPage.php", {html}))
            .then(() => iframe.load("../userDir/tkhvekhqkuvqoerb.html"))
            .then(() => this.enableEditing(iframe))
            .then(() => this.enableDeleteSectionButton(iframe))
            .then(() => this.injectStyles(iframe))


    }

    enableEditing(iframe) {
        iframe.contentDocument.querySelectorAll("text-editor").forEach(element => {
            const id = element.getAttribute("nodeid");
            const virtualElement = this.props.virtualDom.querySelector(`[nodeid="${id}"]`);

            new EditorText(element, virtualElement);
        });

        iframe.contentDocument.querySelectorAll("[editableimgid]").forEach(element => {
            const id = element.getAttribute("editableimgid");
            const virtualElement = this.props.virtualDom.querySelector(`[editableimgid="${id}"]`);

            new EditorImages(element, virtualElement, this.props.imageLoading, this.props.imageLoaded, this.showNotifications);
        });
    }

    enableDeleteSectionButton(iframe) {
        iframe.contentDocument.querySelectorAll("delete-section").forEach(element => {
            const id = element.getAttribute("deleteSectionId");
            const virtualElement = this.props.virtualDom.querySelector(`[deleteSectionId="${id}"]`);
            element.addEventListener('mouseover', (e)=> {
                element.style.opacity = '1';
                element.style.cursor = 'pointer';
            });
            element.addEventListener('click', (e)=> {
                UIkit.modal.confirm("Вы действительно хотите далить блок из структуры сайта? " +
                    "Все несохраненные данные будут потеряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})
                    .then(() => {
                        element.parentNode.remove();
                        virtualElement.parentNode.remove();

                    })


            });
        });


    }
    injectStyles(iframe) {
        const style = iframe.contentDocument.createElement("style");
        style.innerHTML = `
            text-editor:hover {
                outline: 3px solid orange;
                outline-offset: 8px;
            }
            text-editor:focus {
                outline: 3px solid red;
                outline-offset: 8px;
            }
            [editableimgid]:hover{
                outline: 3px solid orange;
                outline-offset: 8px;
            }
        `;
        iframe.contentDocument.head.appendChild(style);
    }

    deleteIframe = (e, name) => {
        e.preventDefault();
        try{
            UIkit.modal.confirm("Вы действительно хотите удалить данный шаблон? " +
                "Все данные будут поткряны!", {labels: {ok: "Удалить", cancel: 'Отмена'}})
                .then(() => {
                    this.props.deleteFavoriteIframe(name);

                })
                .then(() => {
                    UIkit.modal.alert("Шаблон успешно удален!", {labels: {ok: "Ok"}})
                })
        }
        catch(e){
            UIkit.modal.alert("Не удалось удалить данный шаблон! Повторите попытку.", {labels: {ok: "Ok"}});
        }


    };

    openFavoriteIframe = (e, obj) => {
        e.preventDefault();
        const prom = new Promise((resolve)=>{
            //HtmlObjectTransform.buildCssFile(obj.css);
            resolve();
        });
        const iframe = document.querySelector('iframe');
        prom.then(() => HtmlObjectTransform.buildCssFile(obj.css))
            .then(() => HtmlObjectTransform.buildJsFile(obj.script))
            .then(() => HtmlObjectTransform.buildThemeFile(obj.theme))
            .then(() => HtmlObjectTransform.changeFontStyleFileByObject(obj.font))
            .then(
                () => {
                    //console.log(obj.html);
                    const html = HtmlObjectTransform.getTextHtml(obj.html, iframe);
                    this.props.iframeLoaded(html);
                    this.props.chooseCurrentTheme(obj.theme);

                    return html;
                }
            )
            .then(res => DOMHelper.wrapTextNodes(res))
            .then(res => DOMHelper.wrapImages(res))
            .then(res => DOMHelper.addSectionPanel(res))
            .then(dom => {

                this.props.virtualDomLoaded(dom);
                return dom;
            })

            .then(res => DOMHelper.serializeDOMToString(res))

            .then(html => {

                const head = `<head>
                    <meta charSet="UTF-8">
                        <title>Title</title>
                        <!-- Latest compiled and minified CSS -->
                        <link rel="stylesheet" href="../assets/bootstrap.min.css">
                            <link rel="stylesheet" href="../assets/animate.css">
                            <link rel="stylesheet" href="style.css">
                            <link rel="stylesheet" href="theme.css">
                            <link rel="stylesheet" href="fontStyle.css">
                </head>`;
                const js = `
                    <script src="main.js"></script>
                `;
                return head + html + js;
            })
            .then(html => fetch("../api/saveTempPage.php", {
                method: 'POST',
                body: JSON.stringify({html})
            }))
            .then((res) => {
                if(!res.ok){
                    throw Error(res.statusText)
                }

            })
            .then(() => {const html = ''; iframe.load(html)})
            .then(() => iframe.load("../userDir/tkhvekhqkuvqoerb.html"))
            .then(() => this.enableEditing(iframe))
            .then(() => this.enableDeleteSectionButton(iframe))
            .then(() => this.injectStyles(iframe))



    };

    showNotifications(message, status){
        UIkit.notification({message, status});
    }
    selectColor = (e, colorName) => {
        e.preventDefault();

        const prom = new Promise((resolve)=>{
            //HtmlObjectTransform.buildCssFile(obj.css);
            resolve();
        });
        prom
            .then(() =>HtmlObjectTransform.buildThemeFile(colorName))

            .then(() => this.props.chooseCurrentTheme(colorName))
            .then(() => {
                const iframe = document.querySelector('iframe');
                iframe.contentWindow.document.head.querySelector('link[href="theme.css"]').remove();

                const link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', 'theme.css');

                iframe.contentWindow.document.head.append(link);
            });


    };

    chooseFontStyle = (e, obj) => {
        e.preventDefault();
        //console.log(obj);

        const prom = new Promise((resolve)=>{
            resolve();
        });
        prom
            .then(() => HtmlObjectTransform.changeFontStyleFileByObject(obj))

            .then(() => this.props.chooseCurrentFontStyle(obj))
            .then(() => {
                const iframe = document.querySelector('iframe');
                iframe.contentWindow.document.head.querySelector('link[href="fontStyle.css"]').remove();

                const link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', 'fontStyle.css');

                iframe.contentWindow.document.head.append(link);
            });

    };

    render() {
        const {loading, favoriteIframes, themes} = this.props;

        let isSpinner;
        if(loading){
            isSpinner =  <Spinner/>;
        }

        const modal = true;
        const modal1 = true;
        const modal_slider = true;
        const placeholder = "Введите название отложенного варианта";
        return (
            <>
                {isSpinner}
                <div className="iframe-wrapper">
                    <iframe src="" frameBorder="0"></iframe>
                </div>
                <PostponeModal  modal={modal} target={'postpone'} placeholder={placeholder} title='Добавьте шаблон в отложенные'/>
                <ChooseModal modal={modal1} target={'choose-modal'} itemsList={favoriteIframes} title='Список отложенных шаблонов'
                             openFavoriteIframe = {this.openFavoriteIframe} deleteIframe = {this.deleteIframe}/>
                <ThemeModal themes={themes} modal={modal} selectColor={this.selectColor} target={'theme-modal'}/>
                <FontModal modal={modal} target={'font-modal'} chooseFontStyle={this.chooseFontStyle}/>
                <SliderModal modal={modal_slider} target={'slider-modal'}/>
                </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        iframe: state.iframe,
        loading: state.loading,
        virtualDom: state.virtualDom,
        favoriteIframes: state.favoriteIframes,
        currentTheme: state.currentTheme,
        themes: state.themes
    }
};
const mapDispatchToProps = {
    iframeLoaded,
    iframeRequested,
    iframeError,
    imageLoading,
    imageLoaded,
    virtualDomLoaded,
    iframeIsChange,
    deleteFavoriteIframe,
    chooseCurrentTheme,
    chooseCurrentFontStyle
};
export default WithCreateService()(connect(mapStateToProps, mapDispatchToProps)(CreateSection));