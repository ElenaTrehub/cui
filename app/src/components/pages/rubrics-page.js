import React from 'react';
import Header from "../header";
import RubricList from "../rubric-list/rubric-list";

const RubricsPage = () => {
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
    return (
        <>
            <Header menu={menu} user={user}/>
            <RubricList/>
        </>
    )

};
export default RubricsPage;