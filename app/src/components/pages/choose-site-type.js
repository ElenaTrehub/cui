import React, {Component} from 'react';
import {Button, Container, Jumbotron} from "reactstrap";
import {Link} from "react-router-dom";

class ChooseSiteType extends Component{
    constructor(props) {
        super(props);
        this.state = {
            site: ''
        }
    }
    siteTypeChange = (e) => {
        e.persist();
        this.setState(({site}) => {
            return {
                site: e.target.value
            }

        });

    };
    render() {
        const idRubrics = +this.props.match.params.id;
        const {site} = this.state;
        let disabled;
        site !== '' ? disabled = false : disabled = true;

        return(

            <section className="main-section">
                <Container>
                    <Jumbotron>
                        <h3 className="display-3">Выбор формата сайта</h3>
                        <p className="lead">Вы можете выбрать один из указанных форматов сайта: Landing Page (одностраничный сайт) или многостраничный сайт.</p>
                        <hr className="my-2" />
                        <form className="uk-form-horizontal uk-margin-large">

                            <div className="uk-margin">
                                <div className="uk-form-label">Формат сайта</div>
                                <div className="uk-form-controls uk-form-controls-text">
                                    <label><input className="uk-radio" onClick={this.siteTypeChange}
                                                  type="radio"
                                                  name="radio1" value='landing'/> Landing Page (одностраничный сайт)</label><br/>
                                    <label><input className="uk-radio" onClick={this.siteTypeChange}
                                                  type="radio"
                                                  name="radio1" value='manyPage'/> Многостраничный сайт</label>
                                </div>
                            </div>

                            <p className="lead">
                                <Link to={`/${idRubrics}/${site}`}>
                                    <Button disabled={disabled} color="primary">Создать сайт</Button>
                                </Link>
                            </p>
                        </form>
                    </Jumbotron>
                </Container>
            </section>

        )
    }




}

export default ChooseSiteType;