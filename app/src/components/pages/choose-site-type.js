import React, {Component} from 'react';
import {Button, Container, Jumbotron} from "reactstrap";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";

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
        const idSubRubrics = +this.props.match.params.id;

        const {site} = this.state;
        let disabled;
        site !== '' ? disabled = false : disabled = true;

        return(

            <section className="main-section">
                <Container>
                    <Jumbotron>
                        <h3 className="display-3"><FormattedMessage id='choose_format_site'/></h3>
                        <p className="lead"><FormattedMessage id='choose_format_text'/></p>
                        <hr className="my-2" />
                        <form className="uk-form-horizontal uk-margin-large">

                            <div className="uk-margin">
                                <div className="uk-form-label"><FormattedMessage id='choose_format_p'/></div>
                                <div className="uk-form-controls uk-form-controls-text">
                                    <label><input className="uk-radio" onClick={this.siteTypeChange}
                                                  type="radio"
                                                  name="radio1" value='landing'/> <FormattedMessage id='choose_format_landing'/></label><br/>
                                    <label><input className="uk-radio" onClick={this.siteTypeChange}
                                                  type="radio"
                                                  name="radio1" value='manyPage'/> <FormattedMessage id='choose_format_many_page'/></label>
                                </div>
                            </div>

                            <p className="lead">
                                <Link to={`/${idSubRubrics}/${site}/${this.props.currentLang}`}>
                                    <Button disabled={disabled} color="primary"><FormattedMessage id='btn_create_site'/></Button>
                                </Link>
                            </p>
                        </form>
                    </Jumbotron>
                </Container>
            </section>

        )
    }




}
const mapStateToPops = (state) => {
    return {
        currentLang: state.currentLang
    }
};

const mapDispatchToProps =  {

};

export default connect(mapStateToPops, mapDispatchToProps)(ChooseSiteType);