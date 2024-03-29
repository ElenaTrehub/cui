import React from 'react';
import Header from "../header";
import RubricList from "../rubric-list/rubric-list";
import {FormattedMessage} from "react-intl";

const RubricsPage = () => {
    const menu = {
        aLink: [

        ],
        rLink: [
            {title: <FormattedMessage id='link_rubrics'/>, link: "/rubrics"},
            {title: <FormattedMessage id='person_area'/>, link: "/rubrics"}

        ]
    };
    const user =
        [
            {title: <FormattedMessage id='sign_out'/>, link: "/"}
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