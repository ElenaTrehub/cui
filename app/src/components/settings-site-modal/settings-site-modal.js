import React, {Component} from "react";
import {connect} from "react-redux";
import WithCreateService from "../hoc";
import Helper from "../../helpers/helper";
import HtmlObjectTransform from "../../helpers/htmlObjectTransform";
import {chooseCurrentFontStyle, chooseCurrentSiteStyle, chooseCurrentTheme} from "../../actions";


class SettingsSiteModal extends Component{

    constructor(props) {
        super(props);
        this.state = {

            fonts: [],
            currentFontStyles: {
                    bigType: '',
                    bigSize: '',
                    h1Type: '',
                    h1Size: '',
                    h2Type: '',
                    h2Size: '',
                    h3Type: '',
                    h3Size: '',
                    h4Type: '',
                    h4Size: '',
                    textType: '',
                    textSize: '',
                    linkType: '',
                    linkSize: '',
                },
            themes: [],
            currentTheme: {},
            siteStyles: [],
            currentSiteStyle: {}

        }


    }

    getFontsInfo = (e) => {

        if(e.target.parentNode.classList.contains('uk-open')){
            const {CreatorService} = this.props;

            CreatorService.getAllFonts()
                .then(res => {

                    let result = res.reduce((arr, current, index) => {
                        if(index === 1){
                            arr = [];
                            arr.push(current);
                        }
                        if(!arr.some(obj => obj.nameFont === current.nameFont)){
                            arr.push(current);
                        }
                        return arr;
                    })

                    let fontArray = [];
                    result.forEach((item) => {
                        let fontObj = {};

                        fontObj.name = item.nameFont;
                        fontObj.link = item.link;

                        fontArray.push(fontObj);
                    })

                    return fontArray;
                })
                .then((res) => {this.setState(({fonts, currentFontStyles})=>{

                    const {bigType, bigSize, h1Type, h1Size, h2Type,  h2Size, h3Type,  h3Size, h4Type, h4Size, textType, textSize, linkType, linkSize} = this.props.currentFontStyle;

                    let newFonts = res;
                    let newCurrentFontStyles = {
                        bigType: bigType,
                        bigSize: bigSize,
                        h1Type: h1Type,
                        h1Size: h1Size,
                        h2Type: h2Type,
                        h2Size: h2Size,
                        h3Type: h3Type,
                        h3Size: h3Size,
                        h4Type: h4Type,
                        h4Size: h4Size,
                        textType: textType,
                        textSize: textSize,
                        linkType: linkType,
                        linkSize: linkSize,

                    }



                    return {
                        fonts: newFonts,
                        currentFontStyles: newCurrentFontStyles
                    }
                })})
        }





    }

    mainHeadingTypeFontChange= (e) => {

        e.persist();
        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                h2Type: e.target.value
            };
            return {
                currentFontStyles: newStyle
            }

        });

    };

    mainHeadingSizeMinus = (e) => {

        e.preventDefault();

        const newFontSize = Helper.minusSizeFont(this.state.currentFontStyles.h2Size);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                h2Size: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });

    };

    mainHeadingSizePlus = (e) => {

        e.preventDefault();

        const newFontSize = Helper.plusSizeFont(this.state.currentFontStyles.h2Size);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                h2Size: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });

    };

    firstHeadingTypeFontChange = (e) => {
        e.persist();
        this.setState(({currentFontStyles}) => {
        const newStyle = {
            ...currentFontStyles,
            h1Type: e.target.value
        };
        return {
            currentFontStyles: newStyle
        }

        });

    };

    firstHeadingSizeMinus = (e) => {
        e.preventDefault();

        const newFontSize = Helper.minusSizeFont(this.state.currentFontStyles.h1Size);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                h1Size: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });
    }

    firstHeadingSizePlus = (e) => {
        e.preventDefault();

        const newFontSize = Helper.plusSizeFont(this.state.currentFontStyles.h1Size);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                h1Size: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });
    }

    secondHeadingTypeFontChange = (e) => {
        e.persist();
        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                h3Type: e.target.value
            };
            return {
                currentFontStyles: newStyle
            }

        });

    };

    secondHeadingSizeMinus = (e)=>{
        e.preventDefault();

        const newFontSize = Helper.minusSizeFont(this.state.currentFontStyles.h3Size);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                h3Size: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });
    }

    secondHeadingSizePlus = (e)=>{
        e.preventDefault();

        const newFontSize = Helper.plusSizeFont(this.state.currentFontStyles.h3Size);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                h3Size: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });
    }

    thirdHeadingTypeFontChange = (e) => {
        e.persist();
        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                h4Type: e.target.value
            };
            return {
                currentFontStyles: newStyle
            }

        });

    };

    thirdHeadingSizeMinus = (e)=> {
        e.preventDefault();

        const newFontSize = Helper.minusSizeFont(this.state.currentFontStyles.h4Size);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                h4Size: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });
    };

    thirdHeadingSizePlus = (e)=> {
        e.preventDefault();

        const newFontSize = Helper.plusSizeFont(this.state.currentFontStyles.h4Size);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                h4Size: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });
    };

    textTypeFontChange = (e) => {
        e.persist();
        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                textType: e.target.value
            };
            return {
                currentFontStyles: newStyle
            }

        });

    };

    textSizeMinus = (e)=> {
        e.preventDefault();

        const newFontSize = Helper.minusSizeFont(this.state.currentFontStyles.textSize);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                textSize: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });
    };

    textSizePlus = (e)=> {
        e.preventDefault();

        const newFontSize = Helper.plusSizeFont(this.state.currentFontStyles.textSize);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                textSize: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });
    };

    menuTypeFontChange = (e) => {
        e.persist();
        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                linkType: e.target.value
            };
            return {
                currentFontStyles: newStyle
            }

        });

    };

    menuSizeMinus = (e)=> {
        e.preventDefault();

        const newFontSize = Helper.minusSizeFont(this.state.currentFontStyles.linkSize);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                linkSize: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });
    };

    menuSizePlus = (e)=> {
        e.preventDefault();

        const newFontSize = Helper.plusSizeFont(this.state.currentFontStyles.linkSize);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                linkSize: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });
    };

    bigTypeFontChange = (e) => {
        e.persist();
        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                bigType: e.target.value
            };
            return {
                currentFontStyles: newStyle
            }

        });

    };

    bigSizeMinus = (e)=> {
        e.preventDefault();

        const newFontSize = Helper.minusSizeFont(this.state.currentFontStyles.bigSize);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                bigSize: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });
    };

    bigSizePlus = (e)=> {
        e.preventDefault();

        const newFontSize = Helper.plusSizeFont(this.state.currentFontStyles.bigSize);

        this.setState(({currentFontStyles}) => {
            const newStyle = {
                ...currentFontStyles,
                bigSize: newFontSize
            };
            return {
                currentFontStyles: newStyle
            }

        });
    };
    chooseFontStyle = (e) => {
        e.preventDefault();

        let fontObj = {};
        fontObj.obj = this.state.currentFontStyles;
        fontObj.fonts = this.state.fonts;


        const prom = new Promise((resolve)=>{
            resolve(fontObj);
        });
        prom
            .then((fontObj) => {HtmlObjectTransform.changeFontStyleFileByObject(fontObj.obj)

                return fontObj;

            })

            .then((fontObj) => {this.props.chooseCurrentFontStyle(fontObj.obj); return fontObj;})
            .then((fontObj) => {


                let fontNames = [];
                if(fontNames.indexOf(fontObj.obj.bigType) === -1){
                    fontNames.push(fontObj.obj.bigType);
                }

                if(fontNames.indexOf(fontObj.obj.h1Type) === -1){
                    fontNames.push(fontObj.obj.h1Type);
                }

                if(fontNames.indexOf(fontObj.obj.h2Type) === -1){
                    fontNames.push(fontObj.obj.h2Type);
                }

                if(fontNames.indexOf(fontObj.obj.h3Type) === -1){
                    fontNames.push(fontObj.obj.h3Type);
                }

                if(fontNames.indexOf(fontObj.obj.h4Type) === -1){
                    fontNames.push(fontObj.obj.h4Type);
                }

                if(fontNames.indexOf(fontObj.obj.textType) === -1){
                    fontNames.push(fontObj.obj.textType);
                }
                if(fontNames.indexOf(fontObj.obj.linkType) === -1){
                    fontNames.push(fontObj.obj.linkType);
                }

                let links = [];
                fontNames.forEach((item) => {
                    let currentFont = fontObj.fonts.filter(font => font.name === item);
                    links.push(currentFont);
                })

                return links;

            })
            .then((links) => {
                const iframe = document.querySelector('iframe');
                iframe.contentWindow.document.head.querySelector('link[href="fontStyle.css"]').remove();

                let oldLinks = iframe.contentWindow.document.head.querySelectorAll(
                    'link[href]:not([href="fontStyle.css"], [href="style.css"], [href="theme.css"], [href="../assets/bootstrap.min.css"], [href="../assets/animate.css"])')

                oldLinks.forEach((item) => {
                    item.remove();
                })

                links.forEach((item) => {

                    const link = document.createElement('link');

                    link.innerHTML = item[0].link;

                    iframe.contentWindow.document.head.append(link);


                })


                const link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', 'fontStyle.css');
                this.closeAccord();
                iframe.contentWindow.document.head.append(link);

            });

    };
    closeAccord = () => {

        const accordBlock = document.querySelector('.setting-dialog');
        const links = accordBlock.querySelectorAll('.uk-accordion-title');
        const accords = accordBlock.querySelectorAll('li');

        accords.forEach((accord, i) => {
            if(accord.classList.contains('uk-open')){

                links[i].click();
            }


        });

    };

    getThemesInfo = (e) => {
        e.preventDefault();

        if(e.target.parentNode.classList.contains('uk-open')){
            this.setState(({currentTheme, themes}) => {
                let {name, en, ru} = this.props.currentTheme;
                let themesList = this.props.themes;

                let currentThemeObj = {
                    name: name,
                    ru: ru,
                    en: en
                };


                return {
                    currentTheme: currentThemeObj,
                    themes: themesList
                }

            })
        }

    }

    themeChange = (e) => {

        let newTheme = this.props.themes.filter(item => item.name === e.target.value)[0];

        console.log(newTheme);
        this.setState(({currentTheme}) => {

            return {
                currentTheme: newTheme
            }

        });

    }
    chooseTheme = (e) => {
        const prom = new Promise((resolve)=>{
            //HtmlObjectTransform.buildCssFile(obj.css);
            resolve();
        });
        prom
            .then(()=> {


                let currentTheme = {
                    name: this.state.currentTheme.name,
                    ru: this.state.currentTheme.ru,
                    en: this.state.currentTheme.en
                };

                this.props.chooseCurrentTheme(currentTheme.name);

            })
            .then(() => {

                const {changeSiteStyle} = this.props;

                this.closeAccord();
                changeSiteStyle(e);

            })



    };

    getSiteStyleInfo = (e) => {
        e.preventDefault();
        if(e.target.parentNode.classList.contains('uk-open')){
            this.setState(({currentSiteStyle}) => {
                let {name, en, ru} = this.props.currentSiteStyle;
                let stylesList = this.props.siteStyles;

                let currentSiteStyleObj = {
                    name: name,
                    ru: ru,
                    en: en
                };


                return {
                    currentSiteStyle: currentSiteStyleObj,
                    siteStyles: stylesList
                }

            })
        }



    }

    siteStyleChange = (e) => {

        let newSiteStyle = this.props.siteStyles.filter(item => item.name === e.target.value)[0];


        this.setState(({currentSiteStyle}) => {

            return {
                currentSiteStyle: newSiteStyle
            }

        });

    }

    chooseSiteStyle = (e) => {
        const prom = new Promise((resolve)=>{
            //HtmlObjectTransform.buildCssFile(obj.css);
            resolve();
        });
        prom
            .then(()=> {
                let currentSiteStyleObj = {
                    name: this.state.currentSiteStyle.name,
                    ru: this.state.currentSiteStyle.ru,
                    en: this.state.currentSiteStyle.en
                };

                this.props.chooseCurrentSiteStyle(currentSiteStyleObj);
            })
            .then(() => {
                const {changeSiteStyle, currentSiteStyle} = this.props;

                this.closeAccord();
                changeSiteStyle(e);
            })



    };

    render() {
        const {target, modal} = this.props;
        const {fonts, currentFontStyles, siteStyles, currentSiteStyle, themes, currentTheme} = this.state;


        let fontStr = '';
        let themeStr = '';
        let siteStyleStr = '';


        if(fonts.length > 0){

            const fontsList  = fonts.map((font) => {
                return <option style={{fontFamily: font.name}} key={font.name}>{font.name}</option>
            });

            const fontContent =

                    <form>
                        <fieldset className="uk-fieldset">

                            <h4  className="uk-modal-title">Настройка шрифтов</h4>

                            <div className="uk-margin">
                                <h4>Основные заголовки</h4>
                                <select className="uk-select" value={this.state.currentFontStyles.h2Type} onChange={this.mainHeadingTypeFontChange}>
                                    {fontsList}
                                </select>

                                <p className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</p>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.mainHeadingSizeMinus}>-</button>
                                <label className="uk-form-label uk-margin-right uk-margin-left" >{Helper.getSizeFont(currentFontStyles.h2Size).currentFont +'px'}</label>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.mainHeadingSizePlus}>+</button>
                            </div>

                            <div className="uk-margin">
                                <h4>Заголовки первого уровня</h4>
                                <select className="uk-select" value={currentFontStyles.h1Type} onChange={this.firstHeadingTypeFontChange}>
                                    {fontsList}
                                </select>

                                <p className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</p>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.firstHeadingSizeMinus}>-</button>
                                <label className="uk-form-label uk-margin-right uk-margin-left" >{Helper.getSizeFont(currentFontStyles.h1Size).currentFont +'px'}</label>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.firstHeadingSizePlus}>+</button>
                            </div>

                            <div className="uk-margin">
                                <h4>Заголовки второго уровня</h4>
                                <select className="uk-select" value={currentFontStyles.h3Type} onChange={this.secondHeadingTypeFontChange}>
                                    {fontsList}
                                </select>

                                <p className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</p>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.secondHeadingSizeMinus}>-</button>
                                <label className="uk-form-label uk-margin-right uk-margin-left" >{Helper.getSizeFont(currentFontStyles.h3Size).currentFont +'px'}</label>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.secondHeadingSizePlus}>+</button>
                            </div>

                            <div className="uk-margin">
                                <h4>Заголовки третьего уровня</h4>
                                <select className="uk-select" value={currentFontStyles.h4Type} onChange={this.thirdHeadingTypeFontChange}>
                                    {fontsList}
                                </select>

                                <p className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</p>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.thirdHeadingSizeMinus}>-</button>
                                <label className="uk-form-label uk-margin-right uk-margin-left" >{Helper.getSizeFont(currentFontStyles.h4Size).currentFont +'px'}</label>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.thirdHeadingSizePlus}>+</button>
                            </div>

                            <div className="uk-margin">
                                <h4>Основной текст</h4>
                                <select className="uk-select" value={currentFontStyles.textType} onChange={this.textTypeFontChange}>
                                    {fontsList}
                                </select>

                                <p className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</p>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.textSizeMinus}>-</button>
                                <label className="uk-form-label uk-margin-right uk-margin-left" >{Helper.getSizeFont(currentFontStyles.textSize).currentFont +'px'}</label>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.textSizePlus}>+</button>
                            </div>

                            <div className="uk-margin">
                                <h4>Меню</h4>
                                <select className="uk-select" value={currentFontStyles.linkType} onChange={this.menuTypeFontChange}>
                                    {fontsList}
                                </select>

                                <p className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</p>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.menuSizeMinus}>-</button>
                                <label className="uk-form-label uk-margin-right uk-margin-left" >{Helper.getSizeFont(currentFontStyles.linkSize).currentFont +'px'}</label>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.menuSizePlus}>+</button>
                            </div>

                            <div className="uk-margin">
                                <h4>Большие надписи</h4>
                                <select className="uk-select" value={currentFontStyles.bigType} onChange={this.bigTypeFontChange}>
                                    {fontsList}
                                </select>

                                <p className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</p>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.bigSizeMinus}>-</button>
                                <label className="uk-form-label uk-margin-right uk-margin-left" >{Helper.getSizeFont(currentFontStyles.bigSize).currentFont +'px'}</label>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={this.bigSizePlus}>+</button>
                            </div>





                        </fieldset>
                    </form>

            fontStr =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {fontContent}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={this.chooseFontStyle}>Сохранить изменения
                        </button>

                    </p>
                </div>
            ;


        }

        if(themes.length > 0){
            const themeList  = themes.map((style) => {
                return <option  key={style.name}>{style.name}</option>
            });


            const themeContent =
                <form className="uk-margin-large">



                    <h4  className="uk-modal-title">Выбор темы сайта</h4>
                    <select className="uk-select" value={currentTheme.name} onChange={this.themeChange }>
                        {themeList}
                    </select>


                </form>

            themeStr =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {themeContent}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={this.chooseTheme}>Сохранить изменения
                        </button>

                    </p>
                </div>

        };


        if(siteStyles.length > 0){

            const siteStyleList  = siteStyles.map((style) => {
                return <option  key={style.name}>{style.name}</option>
            });


            const siteStyleContent =
                <form className="uk-margin-large">



                    <h4  className="uk-modal-title">Выбор стиля сайта</h4>
                    <select className="uk-select" value={currentSiteStyle.name} onChange={this.siteStyleChange }>
                        {siteStyleList}
                    </select>


            </form>

            siteStyleStr =
                <div className="uk-child-width-1-1@m main-slider-wrapper" uk-grid="true">
                    {siteStyleContent}
                    <p className="uk-text-right">
                        <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={this.chooseSiteStyle}>Сохранить изменения
                        </button>

                    </p>
                </div>

        };
        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Общие настройки сайта</h2>
                    <ul uk-accordion="true" className="setting-dialog">
                        <li>
                            <a className="uk-accordion-title" onClick={this.getFontsInfo} href="#">Настройка шрифтов</a>
                            <div className="uk-accordion-content">
                                {fontStr}
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title" onClick={this.getThemesInfo} href="#">Выбор темы сайта</a>
                            <div className="uk-accordion-content">
                                {themeStr}
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title" onClick={this.getSiteStyleInfo} href="#">Выбор стиля сайта</a>
                            <div className="uk-accordion-content">
                                {siteStyleStr}
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


};
const mapStateToProps = (state) => {
    return {
        currentFontStyle: state.currentFontStyle,
        siteStyles: state.siteStyles,
        currentSiteStyle: state.currentSiteStyle,
        themes: state.themes,
        currentTheme: state.currentTheme
    }
}
const mapDispatchToProps = {
    chooseCurrentFontStyle,
    chooseCurrentSiteStyle,
    chooseCurrentTheme
}
export default WithCreateService()(connect(mapStateToProps, mapDispatchToProps)(SettingsSiteModal));