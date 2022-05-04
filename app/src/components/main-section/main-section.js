import React from 'react';
import { Container, Jumbotron, Button} from 'reactstrap';
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

const MainSection = () => {

    //const bgStyle = {backgroundImage: `url(${bg})`};
    const bgStyle = {backgroundImage: `url("images/photo1.jpg")`};
    return (
        <section className="main-section" style={bgStyle}>
            <Container>
                <Jumbotron>
                    <h1 className="display-3"><FormattedMessage id='main_title'/></h1>
                    <p className="lead"><FormattedMessage id='main_text'/></p>
                    <hr className="my-2" />
                    <p><FormattedMessage id='main_description'/></p>
                    <p className="lead">
                        <Link to="/rubrics"><Button color="primary"><FormattedMessage id='btn_create'/></Button></Link>
                    </p>
                </Jumbotron>
            </Container>
        </section>
    )
};
export default MainSection;