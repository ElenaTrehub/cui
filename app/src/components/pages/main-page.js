import React from 'react';
import Header from "../header";
import MainSection from "../main-section";

const MainPage = () => {
    const menu = {
        aLink: [
            {title: "Как создать сайт", id: "#howcreate"},
            {title: "Почему мы", id: "#why"}
        ],
        rLink: [
            {title: "Техподдержка", link: "/support"}

        ]
    };
    const user =
        [
            {title: "Войти", link: "/auth"},
            {title: "Регистрация", link: "/register"}
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