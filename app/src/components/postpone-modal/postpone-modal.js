import React, {Component} from 'react';
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.js";
import DOMHelper from "../../helpers/dom-helper";
import HtmlObjectTransform from "../../helpers/htmlObjectTransform";
import {connect} from "react-redux";
import {favoriteIframeAdd} from '../../actions';
import UIkit from "uikit";


class PostponeModal extends Component{

    constructor(props) {
        super(props);

        this.state = {
            isName: false,
            isToPostpone: false,
            isDisabled: false,
            isRepeatName: false,
            postponeIframe: {
                name: '',
                obj: {
                    html: {},
                    css: '',
                    theme: '',
                    script: '',
                    font: {}

                }
            }
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.toInitialState = this.toInitialState.bind(this);
        this.addIframeToPostpone= this.addIframeToPostpone.bind(this);
    }
    toInitialState(){
        this.setState(({isDisabled, isName, name, postponeIframe}) => {

            return {
                isName: false,
                isToPostpone: false,
                isDisabled: false,
                isRepeatName: false,
                postponeIframe: {
                    name: '',
                    obj: {
                        html: {},
                        css: '',
                        theme: '',
                        script: '',
                        font: {}

                    }
                }

            }
        });
    }

    onValueChange(e){
        e.persist();
        this.setState(({isName, isToPostpone}) => {
            return {
                isToPostpone: false
            }
        });
        if(e.target.value !== ''){

            this.setState(({isDisabled, isName, name, postponeIframe}) => {

                return {
                    isDisabled: false,
                    isName: true,
                    isRepeatName: false,
                    postponeIframe: {
                        name: e.target.value
                    }

                }
            });
        }
    }

    async addIframeToPostpone(){
        const {postponeIframe} = this.state;
        if(this.state.postponeIframe.name === ''){
            this.setState(({isName, isToPostpone}) => {
                return {
                    isName: false,
                    isToPostpone: true,
                    isRepeatName: false,
                }
            })
        }
        else if(this.props.favoriteIframes.some(function(iframe){
            return iframe.name === postponeIframe.name;
        })){
            this.setState(({isName, isToPostpone}) => {
                return {
                    isRepeatName: true
                }
            })
        }
        else if(this.props.favoriteIframes.length >= 3){
            this.setState(() => {
                return {
                    isName: false,
                    isToPostpone: true,
                    isRepeatName: false,
                }
            })
        }
        else{
            this.setState(({isName, isToPostpone}) => {
                return {
                    isName: true,
                    isToPostpone: true,
                    isRepeatName: false
                }
            });
            const newDom = this.props.virtualDom.cloneNode(this.props.virtualDom);
            DOMHelper.unwrapTextNodes(newDom);
            DOMHelper.unwrapImages(newDom);
            let iframeFromHTML =  HtmlObjectTransform.getObjectIframeFromHtml(newDom);

            let style = '';
            let script = '';
            let theme = '';

            style = await fetch('../../api/getCSSContent.php')
                .then((res) => {
                    if(!res.ok){
                        throw Error(res.statusText)
                    }
                    //sole.log(res.json());
                    return res.json();
                });

            script = await fetch('../../api/getScriptContent.php')
                .then((res) => {
                    if(!res.ok){
                        throw Error(res.statusText)
                    }
                    return res.json();
                });



            this.setState(({postponeIframe}) => {
                const newPostponeIframe = {
                    ...postponeIframe,
                    obj: {
                        html: iframeFromHTML,
                        css: style,
                        theme: this.props.currentTheme.name,
                        script: script,
                        font: this.props.currentFontStyle
                    }
                };
                return {
                    postponeIframe: newPostponeIframe
                }
            });

            this.props.favoriteIframeAdd(this.state.postponeIframe);

            this.setState(({postponeIframe}) => {
                const newPostponeIframe = {
                    ...postponeIframe,
                    name: '',
                    isToPostpone: false

                };
                return {
                    postponeIframe: newPostponeIframe
                }
            });
        }




    };


    render() {
        const {modal, placeholder, title, target, action} = this.props;
        const {isToPostpone, isName, postponeIframe, isDisabled, isRepeatName} = this.state;

        let alert = '';
        let count = '';
        let disabled = isDisabled;

        if(isToPostpone && !isName) {
            disabled = true;
            alert = <div uk-alert="true" className = 'uk-alert-danger'>
                        <p>Укажите название отложенного варианта!</p>
                    </div>;
        }

        if(this.props.favoriteIframes.length >= 3){
            disabled = true;
            count =  <div uk-alert="true" className = 'uk-alert-danger'>
                <p>Невозможно отложить больше 3 шаблонов. Удалите один из отложенных шаблонов чтоб сохранить этот!</p>
            </div>;
        }
        if(isRepeatName){
            disabled = true;
            alert = <div uk-alert="true" className = 'uk-alert-danger'>
                <p>Такое название уже существует!</p>
            </div>;
        }
        if(isToPostpone && isName && !isRepeatName) {

                disabled = true;
                alert = <div uk-alert="true" className = 'uk-alert-success'>
                    <p>Ваш шаблон успешно добавлен!!</p>
                </div>;


        }



        return(

            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">{title}</h2>

                    <form>
                        <div className="uk-margin">
                            <input className="uk-input" type="text" value={this.state.postponeIframe.name} placeholder={placeholder}  onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </form>
                    {alert}
                    {count}
                    <p className="uk-text-right">
                        <button className="uk-button uk-button-default uk-margin-small-right uk-modal-close" onClick={this.toInitialState} type="button">Выйти</button>
                        <button
                            className="uk-button  uk-button-primary"
                            disabled={disabled} type="button" onClick={this.addIframeToPostpone}>Добавить</button>
                    </p>

                </div>
            </div>
        )
    }





};

const mapStateToProps = (state) => {
    return {
        virtualDom: state.virtualDom,
        favoriteIframes: state.favoriteIframes,
        currentTheme: state.currentTheme,
        currentFontStyle: state.currentFontStyle
    }
};
const mapDispatchToProps = {
    favoriteIframeAdd
};

export default connect(mapStateToProps, mapDispatchToProps)(PostponeModal);