import React from 'react';
import Header from "../header";
import RubricList from "../rubric-list/rubric-list";
import SubRubricList from "../subrubric-list/subrubric-list";
import {FormattedMessage} from "react-intl";

const ChooseSubrubricPage = (props) => {
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
            <SubRubricList idRubric={+props.match.params.id}/>
        </>
    )

};
export default ChooseSubrubricPage;