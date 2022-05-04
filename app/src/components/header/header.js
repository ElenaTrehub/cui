import React, {Component} from 'react';
import { Container, Row, Col} from 'reactstrap';
import {Link} from "react-router-dom";
import {LOCALES} from "../../i18n/locales";
import {changeCurrentLang} from '../../actions';
import {connect} from "react-redux";
import {render} from "react-dom";


class Header extends Component{
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         defValue: ''
    //     }
    // }
    //
    //  componentDidMount() {
    //     const val = this.props.languages.filter(item => item.code===this.props.currentLang)[0]['name'];
    //      this.setState(({
    //          defValue: val
    //      }))
    //  }

    onLangChange = (e) => {
        this.props.changeCurrentLang(e.target.value);
    }


    render(){

        const {user} = this.props;

        const {aLink, rLink} = this.props.menu;
        let menuLinc = aLink.map((item, index) => {
            return (<li key={index}><a href={item.id}>{item.title}</a></li>);
        });

        if(!menuLinc){
            menuLinc = '';
        }

        let routerMenuLinc = rLink.map((item, index) => {
            return (<li key={index}><Link to={item.link}>{item.title}</Link></li>);
        });

        if(!routerMenuLinc){
            routerMenuLinc = '';
        }

        let userLinc = user.map((item, index) => {
            return (<Link key={index} to={item.link}>{item.title}</Link>);
        });

        if(!userLinc){
            userLinc = '';

        }

        const langSelect = this.props.languages.map(({name, code}) => {

            return <option key={code} value={code}>{name}</option>
        });


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
                                <div className="header-menu__lang">
                                    <select defaultValue={this.props.currentLang} onChange={this.onLangChange}>
                                        {langSelect}
                                    </select>
                                </div>

                            </div>

                        </Col>

                    </Row>

                </Container>

            </header>
        )
        }


};
const mapStateToPops = (state) => {
    return {
        languages: state.languages,
        currentLang: state.currentLang
    }
};

const mapDispatchToProps =  {
    changeCurrentLang
};
export default connect(mapStateToPops, mapDispatchToProps)(Header);