import React, {Component} from 'react';
import {rubricsLoaded, rubricsRequested, rubricsError} from '../../actions';
import WithCreateService from "../hoc";
import {connect} from 'react-redux';
import Spinner from "../spinner";
import {Container, Row} from "reactstrap";
import RubricListItem from "../rubric-list-item";
import Error from "../error";
import {FormattedMessage} from "react-intl";


class RubricList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            rubricList: [],
            loading: false,
            error: false
        }
    }

    componentDidMount(){
        this.rubricOnLoad();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.currentLang !== this.props.currentLang){
            this.rubricOnLoad();
        }
    }

    rubricOnLoad = () => {
        this.rubricsLoading();
        const {CreatorService} = this.props;
        CreatorService.getRubrics(this.props.currentLang)
            .then((res) => {
                this.rubricsLoaded(res);
            })
            .catch(this.onError)
    }
    rubricsLoading = () => {
        this.setState({
            loading: true
        })
    }

    rubricsLoaded = (rubricList) => {
        this.setState({
            loading: false,
            rubricList: rubricList
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render(){
        const {rubricList, loading, error} = this.state;

        const rubricListStr = rubricList.map(rubric => {
                return <RubricListItem key={rubric.id} rubric={rubric}/>
            });

        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? rubricListStr : null;

        return (
            <div className ="rubric-list">
                <h1><FormattedMessage id='choose_rubric'/></h1>
                <Container>
                    <Row>
                        {errorMessage}
                        {spinner}
                        {content}
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

export default WithCreateService()( connect(mapStateToPops, mapDispatchToProps)(RubricList));
