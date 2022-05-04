import React from 'react';
import Header from "../header";
import MainSection from "../main-section";
import {FormattedMessage} from "react-intl";


const MainPage = () => {
    const menu = {
        aLink: [
            {title: <FormattedMessage id='link_how_create_site'/>, id: "#howcreate"},
            {title: <FormattedMessage id='link_why_us'/>, id: "#why"}
        ],
        rLink: [
            {title: <FormattedMessage id='link_support'/>, link: "/support"}

        ]
    };
    const user =
        [
            {title: <FormattedMessage id='link_logIn'/>, link: "/auth"},
            {title: <FormattedMessage id='link_registration'/>, link: "/register"}
        ]
    ;
    return (
        <>
            <Header menu={menu} user={user}/>
            <MainSection/>
        </>
    )

};
export default MainPage;