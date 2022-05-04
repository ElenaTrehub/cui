import React from 'react';
import {Link} from "react-router-dom";
import {Col} from "reactstrap";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";


const RubricListItem = ({rubric}) => {

    return (
            <>

                <Col lg="3" md="4" sm="6">
                    <div className="rubric">
                        <Link to={`/chooseSubRubric/${rubric.id}`}>
                            <img  className="rubric-bg" src={rubric.image} />
                            <div className="rubric-title"><p>{rubric.title}</p></div>
                        </Link>
                    </div>
                </Col>

            </>

    )
};

export default RubricListItem;