import React from 'react';
import ThemeItem from "../theme-item";
import './theme-modal.scss';


const ThemeModal = ({themes, target, modal, selectColor}) => {

        const themesList = themes.map((theme) => {
            return <ThemeItem key={theme.name} themeName={theme.name} themeColor={theme.color} selectColor={selectColor}/>
        });

        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Выбор темы </h2>
                    <div className='theme-list'>
                        {themesList}
                    </div>
                    <button className="uk-button uk-button-default uk-margin-small-right uk-modal-close"  type="button">Выйти</button>
                </div>
            </div>
        )


};


export default ThemeModal;