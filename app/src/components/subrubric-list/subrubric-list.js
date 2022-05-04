import React, {Component} from 'react';
import Spinner from "../spinner";
import {Col, Container, Row} from "reactstrap";
import {Link} from "react-router-dom";
import CreatorService from "../../services";
import WithCreateService from "../hoc";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";


class SubRubricList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            subrubricsList: [],
            loading: false,
            error: false
        }

    }

    componentDidMount(){
        this.onRequest();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.currentLang !== this.props.currentLang){
            this.onRequest();
        }
    }

    onRequest = () => {


        const {CreatorService} = this.props;
        this.onSubRubricLoading();
        CreatorService.getSubRubrics(this.props.idRubric, this.props.currentLang)
            .then(res => { this.onSubRubricLoaded(res);})
            .catch(this.onError)
    }

    onSubRubricLoading = () => {
        this.setState({
            loading: true
        })
    }

    onSubRubricLoaded = (subRubrics) => {

        this.setState(() => ({
            subrubricsList: [...subRubrics],
            loading: false,
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems = (arr) =>  {

        const items =  arr.map((item) => {

            return (
                <Col key={item.idSubrubric} lg="3" md="4" sm="6">
                    <div className="subrubric">
                        <Link to={`/chooseSiteType/${item.idSubrubric}`}>
                            <div className="sub-title"><p>{item.title}</p></div>
                        </Link>
                    </div>
                </Col>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        //return (
            //<ul className="char__grid">
                //{items}
            //</ul>
       // )
        return items;
    }
    render(){
        const {subrubricsList, loading, error} = this.state;

        const items = this.renderItems(subrubricsList);

        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        const text = subrubricsList.length < 1 ? <h5><FormattedMessage id='not_subrubrics'/></h5> : null;
        return (



            <div className ="subrubric-list">
                <h1><FormattedMessage id='choose_subrubric'/></h1>
                <Container>
                    <Row>
                        {errorMessage}
                        {spinner}
                        {content}
                        {text}
                    </Row>
                </Container>
            </div>
        )
    }
};
const mapStateToPops = (state) => {
    return {
        currentLang: state.currentLang
    }
};

const mapDispatchToProps =  {

};



export default WithCreateService()( connect(mapStateToPops, mapDispatchToProps)(SubRubricList));;
