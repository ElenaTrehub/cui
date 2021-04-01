import React, {Component} from 'react';
import ThemeItem from "../theme-item";

export default class FontModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fonts: [],
            fontStyles: {
                mainHeadingFont: '',
                mainHeadingSize: '',
                secondHeadingFont: '',
                secondHeadingSize: '',
                textFont: '',
                textSize: '',
                menuFont: '',
                menuSize: '',
            }
        }
    }
    componentDidMount() {
        //console.log('mount');
        fetch('../api/getFontsType.php')
            .then(response=>response.json())
            .then(res => this.setState({fonts: res}))

        fetch('../api/getFontStyle.php')
            .then(response=>response.json())
            //.then(res => console.log(res))
            .then(res => this.setState(({fontStyles})=>{
                const newStyles = {
                    mainHeadingFont: res.mainHeadingFont,
                    mainHeadingSize: res.mainHeadingSize,
                    secondHeadingFont : res.secondHeadingFont,
                    secondHeadingSize: res.secondHeadingSize,
                    textFont: res.textFont,
                    textSize: res.textSize,
                    menuFont: res.menuFont,
                    menuSize: res.menuSize
                };
                return {
                    fontStyles: newStyles
                }
            }))
    }

    mainHeadingFontChange = (e) => {
        e.persist();
        this.setState(({fontStyles}) => {
            const newStyle = {
                ...fontStyles,
                mainHeadingFont: e.target.value
            };
            return {
                fontStyles: newStyle
            }

        });

    };
    mainHeadingSizeChange = (e) => {
        e.persist();
        this.setState(({fontStyles}) => {
            const newStyle = {
                ...fontStyles,
                mainHeadingSize: e.target.value
            };
            return {
                fontStyles: newStyle
            };

        });

    };

    secondHeadingFontChange = (e) => {
        e.persist();
        this.setState(({fontStyles}) => {
            const newStyle = {
                ...fontStyles,
                secondHeadingFont: e.target.value
            };
            return {
                fontStyles: newStyle
            }

        });

    };
    secondHeadingSizeChange = (e) => {
        e.persist();
        this.setState(({fontStyles}) => {
            const newStyle = {
                ...fontStyles,
                secondHeadingSize: e.target.value
            };
            return {
                fontStyles: newStyle
            }

        });

    };

    textFontChange = (e) => {
        e.persist();
        this.setState(({fontStyles}) => {
            const newStyle = {
                ...fontStyles,
                textFont: e.target.value
            };
            return {
                fontStyles: newStyle
            }

        });


    };
    textSizeChange = (e) => {
        e.persist();
        this.setState(({fontStyles}) => {
            const newStyle = {
                ...fontStyles,
                textSize: e.target.value
            };
            return {
                fontStyles: newStyle
            }

        });

    };

    menuFontChange = (e) => {
        e.persist();
        this.setState(({fontStyles}) => {
            const newStyle = {
                ...fontStyles,
                menuFont: e.target.value
            };
            return {
                fontStyles: newStyle
            }

        });

    };
    menuSizeChange = (e) => {
        e.persist();
        this.setState(({fontStyles}) => {
            const newStyle = {
                ...fontStyles,
                menuSize: e.target.value
            };
            return {
                fontStyles: newStyle
            }

        });

    };




    render() {
        const {target, modal, chooseFontStyle} = this.props;
        const {fonts, fontStyles} = this.state;


//console.log(this.state);
        const fontsList  = fonts.map((font) => {
            const fontName = font.split('.')[0];
            return <option style={{fontFamily: fontName}} key={fontName}>{fontName}</option>
        });
        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Настройка шрифтов</h2>

                        <h6>Основные заголовки</h6>

                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите тип шрифта</label>
                            <select className="uk-select" value={this.state.fontStyles.mainHeadingFont} onChange={this.mainHeadingFontChange}>
                                {fontsList}
                            </select>
                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</label>
                            <select className="uk-select" value={this.state.fontStyles.mainHeadingSize} onChange={this.mainHeadingSizeChange}>
                                <option>16px</option>
                                <option>18px</option>
                                <option>20px</option>
                                <option>24px</option>
                                <option>28px</option>
                                <option>32px</option>
                                <option>36px</option>
                                <option>40px</option>
                            </select>

                        <h6>Второстепенные заголовки</h6>

                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите тип шрифта</label>
                            <select className="uk-select" value={this.state.fontStyles.secondHeadingFont} onChange={this.secondHeadingFontChange}>
                                {fontsList}
                            </select>
                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</label>
                            <select className="uk-select" value={this.state.fontStyles.secondHeadingSize} onChange={this.secondHeadingSizeChange}>
                                <option>14px</option>
                                <option>16px</option>
                                <option>18px</option>
                                <option>20px</option>
                                <option>24px</option>
                                <option>28px</option>
                                <option>32px</option>
                                <option>36px</option>
                                <option>40px</option>
                            </select>

                        <h6>Основной текст</h6>

                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите тип шрифта</label>
                            <select className="uk-select" value={this.state.fontStyles.textFont} onChange={this.textFontChange}>
                                {fontsList}
                            </select>
                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</label>
                            <select className="uk-select" value={this.state.fontStyles.textSize} onChange={this.textSizeChange}>
                                <option>12px</option>
                                <option>14px</option>
                                <option>16px</option>
                                <option>18px</option>
                                <option>20px</option>
                                <option>24px</option>
                            </select>

                        <h6>Ссылки меню</h6>

                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите тип шрифта</label>
                            <select className="uk-select" value={this.state.fontStyles.menuFont} onChange={this.menuFontChange}>
                                {fontsList}
                            </select>
                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</label>
                            <select className="uk-select" value={this.state.fontStyles.menuSize} onChange={this.menuSizeChange}>
                                <option>12px</option>
                                <option>14px</option>
                                <option>16px</option>
                                <option>18px</option>
                                <option>20px</option>
                                <option>24px</option>
                            </select>

                    <button className="uk-margin-small-top uk-button uk-button-primary uk-margin-small-right uk-modal-close"  type="button" onClick={(e)=>{chooseFontStyle(e, fontStyles)}}>Применить</button>
                    <button className="uk-margin-small-top uk-button uk-button-default uk-margin-small-right uk-modal-close"  type="button">Выйти</button>
                </div>
            </div>
        )
    }


}
