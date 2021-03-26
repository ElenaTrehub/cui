import React, {Component} from 'react';
import { Button } from 'reactstrap';
import {connect} from 'react-redux';
import {favoriteIframeAdd} from "../../actions";


class Panel extends Component{


    render(){



        return (
            <>
                <div className="panel">
                    <Button color="success" >Сохранить изменения </Button>
                    <Button color="primary" >Сгенерировать новый </Button>
                    <button className="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #postpone" >Отложить шаблон</button>
                    <button className="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #choose-modal" >Список отложенных шаблонов</button>
                    <button className="uk-button uk-button-primary uk-margin-small-right" uk-toggle="target: #modal-save" >Опубликовать</button>
                </div>

            </>
        )

    }

};
const mapStateToProps = (state) => {
    return {
        virtualDom: state.virtualDom
    }
};
const mapDispatchToProps = {
    favoriteIframeAdd
};
export default connect(mapStateToProps, mapDispatchToProps)(Panel);