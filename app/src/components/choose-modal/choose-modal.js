import React from 'react';


const ChooseModal = ({target, modal, title, openFavoriteIframe, itemsList = [], deleteIframe}) => {
    //console.log(itemsList);
    let list;
    if(itemsList.length > 0){
        list = itemsList.map(item => {
            return (
                <li key={item.name}>
                    <span className="uk-link-muted uk-modal-close"  >{item.name}</span>
                    <button className="uk-button-small uk-button-primary uk-align-right uk-margin-remove-vertical uk-margin-small-left uk-modal-close" onClick={(e) => openFavoriteIframe(e, item.obj)} type="button">Загрузить</button>
                    <button className="uk-button-small uk-button-danger uk-align-right uk-margin-remove-vertical uk-margin-small-left uk-modal-close" onClick={(e) => deleteIframe(e, item.name)} type="button">Удалить</button>
                </li>
            )
        });
    }
    else{
        list = <div uk-alert="true" className = 'uk-alert-danger'>
                <a className="uk-alert-close" uk-close="true"></a>
                <p>У Вас нет отложенных шаблонов!</p>
            </div>;
    }


    return (
        <div id={target} uk-modal={modal.toString()} container="false">
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">{title}</h2>
                <ul className="uk-list uk-list-divider">
                    {list}
                </ul>
                <p className="uk-text-right">
                    <button className="uk-button uk-button-default uk-margin-small-right uk-modal-close" type="button">Отменить</button>

                </p>
            </div>
        </div>
    )
};
export default ChooseModal;