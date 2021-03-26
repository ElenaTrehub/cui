import React from 'react';
import './theme-item.scss';
const ThemeItem = ({themeName, themeColor, selectColor}) => {
    return (
        <button className="uk-modal-close" type="button" onClick={(e) => selectColor(e, themeName)} className='theme-item' style={{backgroundColor: themeColor}}>
            <p>{themeName}</p>
        </button>
    )

};
export default ThemeItem;