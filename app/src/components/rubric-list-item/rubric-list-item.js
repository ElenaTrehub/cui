import React from 'react';
import {Link} from "react-router-dom";
import {Col} from "reactstrap";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";


const RubricListItem = ({rubric}) => {
    const img = require(`${rubric.image}`);
    img.default = rubric.image;//<Link to={`/rubric/${rubric.id}`}>
    const id = rubric.id;
    const modal = true;
    return (
            <>
                <Col lg="3" md="4" sm="6">
                    <div className="rubric">
                        <Link to={`/chooseSiteType/${rubric.id}`}>
                            <div  className="rubric-bg" style={{backgroundImage: `url(${img.default})`}}></div>
                            <div className="rubric-title"><p>{rubric.title}</p></div>
                        </Link>
                    </div>
                </Col>

            </>

    )
};

export default RubricListItem;