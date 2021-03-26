import React from 'react';
import Header from "../header";
import Panel from "../panel";
import CreateSection from "../create-section/create-section";
import { Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import ThemeModal from "../theme-modal/theme-modal";
import ChooseModal from "../choose-modal";

const CreatePage = (props) => {
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
                            <NavLink href="#">Another Link</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink disabled href="#">Disabled Link</NavLink>
                        </NavItem>
                    </Nav>
                </Col>

                <Col xs="10">
                    <CreateSection {...props}/>
                </Col>
            </Row>

        </>
    )
};
export default CreatePage;