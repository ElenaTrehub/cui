import React, {Component} from 'react';
import ThemeItem from "../theme-item";

export default class FontModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fonts: [],
            mainHeadingFont: 'RobotoRegular',
            mainHeadingSize: '16px',
            secondHeadingFont: 'RobotoRegular',
            secondHeadingSize: '14px',
            textFont: 'RobotoRegular',
            textSize: '12px',
            menuFont: 'RobotoRegular',
            menuSize: '12px',
        }
    }
    componentDidMount() {
        //console.log('mount');
        fetch('../api/getFontsType.php')
            .then(response=>response.json())
            .then(res => this.setState({fonts: res}))

        fetch('../api/getFontStyle.php')
            .then(response=>response.json())
            .then(res => console.log(res))
    }

    mainHeadingFontChange = (e) => {
        e.persist();
        this.setState({mainHeadingFont: e.target.value});

    };
    mainHeadingSizeChange = (e) => {
        e.persist();
        this.setState({mainHeadingSize: e.target.value});

    };

    secondHeadingFontChange = (e) => {
        e.persist();
        this.setState({secondHeadingFont: e.target.value});

    };
    secondHeadingSizeChange = (e) => {
        e.persist();
        this.setState({secondHeadingSize: e.target.value});

    };

    textFontChange = (e) => {
        e.persist();
        this.setState({textFont: e.target.value});

    };
    textSizeChange = (e) => {
        e.persist();
        this.setState({textSize: e.target.value});

    };

    menuFontChange = (e) => {
        e.persist();
        this.setState({menuFont: e.target.value});

    };
    menuSizeChange = (e) => {
        e.persist();
        this.setState({menuSize: e.target.value});

    };
    render() {
        const {target, modal} = this.props;
        const {fonts} = this.state;



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
                            <select className="uk-select" value={this.state.mainHeadingFont} onChange={this.mainHeadingFontChange}>
                                {fontsList}
                            </select>
                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</label>
                            <select className="uk-select" value={this.state.mainHeadingSize} onChange={this.mainHeadingSizeChange}>
                                <option>16 px</option>
                                <option>18 px</option>
                                <option>20 px</option>
                                <option>24 px</option>
                                <option>28 px</option>
                                <option>32 px</option>
                                <option>36 px</option>
                                <option>40 px</option>
                            </select>

                        <h6>Второстепенные заголовки</h6>

                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите тип шрифта</label>
                            <select className="uk-select" value={this.state.secondHeadingFont} onChange={this.secondHeadingFontChange}>
                                {fontsList}
                            </select>
                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</label>
                            <select className="uk-select" value={this.state.secondHeadingSize} onChange={this.secondHeadingSizeChange}>
                                <option>14 px</option>
                                <option>16 px</option>
                                <option>18 px</option>
                                <option>20 px</option>
                                <option>24 px</option>
                                <option>28 px</option>
                                <option>32 px</option>
                                <option>36 px</option>
                                <option>40 px</option>
                            </select>

                        <h6>Основной текст</h6>

                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите тип шрифта</label>
                            <select className="uk-select" value={this.state.textFont} onChange={this.textFontChange}>
                                {fontsList}
                            </select>
                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</label>
                            <select className="uk-select" value={this.state.textSize} onChange={this.textSizeChange}>
                                <option>12 px</option>
                                <option>14 px</option>
                                <option>16 px</option>
                                <option>18 px</option>
                                <option>20 px</option>
                                <option>24 px</option>
                            </select>

                        <h6>Ссылки меню</h6>

                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите тип шрифта</label>
                            <select className="uk-select" value={this.state.menuFont} onChange={this.menuFontChange}>
                                {fontsList}
                            </select>
                            <label className="uk-form-label" htmlFor="form-stacked-select">Выбирите размер шрифта</label>
                            <select className="uk-select" value={this.state.menuSize} onChange={this.menuSizeChange}>
                                <option>12 px</option>
                                <option>14 px</option>
                                <option>16 px</option>
                                <option>18 px</option>
                                <option>20 px</option>
                                <option>24 px</option>
                            </select>

                    <button className="uk-margin-small-top uk-button uk-button-primary uk-margin-small-right uk-modal-close"  type="button">Применить</button>
                    <button className="uk-margin-small-top uk-button uk-button-default uk-margin-small-right uk-modal-close"  type="button">Выйти</button>
                </div>
            </div>
        )
    }


}
