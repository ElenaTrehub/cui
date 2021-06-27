import React, {Component} from 'react';
import Header from "../header";
import Panel from "../panel";
import CreateSection from "../create-section/create-section";
import { Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import WithCreateService from "../hoc";
import ThemeModal from "../theme-modal/theme-modal";
import ChooseModal from "../choose-modal";
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
        if(this.props.changePanelShow){
            textChangePanel = 'Выключить редактирование'
        }
        else{
            textChangePanel = 'Включить редактирование'
        }
        return (

            <>
                <Header menu={menu} user={user}/>
                <Panel/>
                <Row>
                    <Col xs="2">
                        <Nav vertical>
                            <NavItem>
                                <button className="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #theme-modal" >Выбор темы шаблона</button>
                            </NavItem>

                            <NavItem>
                                <button className="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #font-modal" >Настройка шрифтов</button>
                            </NavItem>
                            <NavItem>
                                <button onClick={this.props.isChangePanelShow} className="uk-button uk-button-default uk-margin-small-right" type="button">{textChangePanel}</button>
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
        changePanelShow: state.changePanelShow
    }
}
const mapDispatchToProps = {
    isChangePanelShow

};
export default WithCreateService()(connect(mapStateToProps, mapDispatchToProps)(CreatePage));