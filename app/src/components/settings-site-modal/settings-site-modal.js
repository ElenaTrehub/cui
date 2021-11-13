import React, {Component} from "react";
import {connect} from "react-redux";


class CustomizationModal extends Component{

    constructor(props) {
        super(props);
    }
    render() {
        const {target, modal} = this.props;
        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Общие настройки сайта</h2>
                    <ul uk-accordion="true" className="menu-dialog">
                        <li>
                            <a className="uk-accordion-title" href="#">Landing Page</a>
                            <div className="uk-accordion-content">
                                <button className="uk-button  uk-button-primary uk-modal-close" type="button" onClick={(e) => {
                                    this.saveHeaderLogoChange(e)
                                }}>Определить как Landing Page
                                </button>
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title" href="#">Многостраничный сайт</a>
                            <div className="uk-accordion-content">
                                {headerMenuStr}
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

    }
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(CustomizationModal)