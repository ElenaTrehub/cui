import React from 'react';
import {Link} from "react-router-dom";
import {Col} from "reactstrap";

const RubricListItem = ({rubric}) => {
    const img = require(`${rubric.image}`);
    img.default = rubric.image;
    return (

            <Col lg="3" md="4" sm="6">
                <div className="rubric">
                    <Link to={`/rubric/${rubric.id}`}>
                        <div className="rubric-bg" style={{backgroundImage: `url(${img.default})`}}></div>
                        <div className="rubric-title"><p>{rubric.title}</p></div>
                    </Link>
                </div>
            </Col>

    )
};

export default RubricListItem;