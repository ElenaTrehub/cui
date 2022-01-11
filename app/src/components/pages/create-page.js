import React, {Component} from 'react';
import Header from "../header";
import Panel from "../panel";
import CreateSection from "../create-section/create-section";
import { Container, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import WithCreateService from "../hoc";

import {connect} from "react-redux";
import {
    isChangePanelShow
} from '../../actions';


class CreatePage extends Component{

    render() {
        const menu = {
            aLink: [

            ],
            rLink: [
                {title: "Рубрики", link: "/rubrics"},
                {title: "Личный кабинет", link: "/rubrics"}

            ]
        };
        const user =
            [
                {title: "Выйти", link: "/"}
            ]
        ;
        const modal = true;

        let textChangePanel = '';
        let textAddSection = '';

        // if(this.props.currentSiteType === 'landing'){
        //     textAddSection = 'Добавить секцию';
        // }
        // if(this.props.currentSiteType === 'manyPage'){
        //     textAddSection = 'Добавить страницу';
        // }

        if(this.props.changePanelShow){
            textChangePanel = 'Выключить редактирование';
        }
        else{
            textChangePanel = 'Включить редактирование';
        }
        return (

            <>
                <Header menu={menu} user={user}/>
                <Panel/>

                <Row>
                    <Col xs="2">
                                <Nav vertical>
                                    <NavItem>
                                        <button className="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #setting-site-modal">Общие настройки сайта</button>
                                    </NavItem>

                                    <NavItem>
                                        <button onClick={this.props.isChangePanelShow} className="uk-button uk-button-default uk-margin-small-right" type="button">{textChangePanel}</button>
                                    </NavItem>
                                    <NavItem>
                                        <button className="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #add-element-modal">Добавить элемент</button>
                                    </NavItem>
                                    {/*<NavItem>
                                    <button className="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #slider-modal" >Настройка слайдера</button>
                                </NavItem>*/}
                                    {/*<NavItem>
                                    <button className="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #menu-modal" >Настройка меню</button>
                                </NavItem>*/}
                                    <NavItem>
                                        <NavLink disabled href="#">Disabled Link</NavLink>
                                    </NavItem>
                                </Nav>
                            </Col>

                    <Col xs="10">
                        <CreateSection {...this.props}/>
                    </Col>
                </Row>



            </>
        )

    }


};
const mapStateToProps = (state) => {
    return {
        changePanelShow: state.changePanelShow,
        currentSiteType: state.currentSiteType
    }
}
const mapDispatchToProps = {
    isChangePanelShow

};
export default WithCreateService()(connect(mapStateToProps, mapDispatchToProps)(CreatePage));