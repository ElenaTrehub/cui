import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import {Link} from "react-router-dom";

const Header = (props) => {
    const {aLink, rLink} = props.menu;
    const {user} = props;


    let menuLinc = aLink.map(item => {
        return (<li key={item.title}><a href={item.id}>{item.title}</a></li>);
    });

    if(!menuLinc){
        menuLinc = '';
    }

    let routerMenuLinc = rLink.map(item => {
        return (<li key={item.title}><Link to={item.link}>{item.title}</Link></li>);
    });

    if(!routerMenuLinc){
        routerMenuLinc = '';
    }

    let userLinc = user.map(item => {
        return (<Link key={item.title} to={item.link}>{item.title}</Link>);
    });

    if(!userLinc){
        userLinc = '';
    }
    return (
        <header className="main-header">
            <Container>
                <Row>
                    <Col lg="2" md="2" sm="6">
                        <div className="logo">
                            <Link to="/">UCI</Link>
                        </div>
                    </Col>
                    <Col lg="10" md="10" sm="6">
                        <div className="header-menu">
                            <ul className="header-menu__links">
                                {menuLinc}
                                {routerMenuLinc}

                            </ul>
                            <div className="header-menu__user">
                                {userLinc}

                            </div>

                        </div>

                    </Col>

                </Row>

            </Container>

        </header>
    )
};
export default Header;