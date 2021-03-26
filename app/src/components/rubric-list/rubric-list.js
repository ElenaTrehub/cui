import React, {Component} from 'react';
import {rubricsLoaded, rubricsRequested, rubricsError} from '../../actions';
import WithCreateService from "../hoc";
import {connect} from 'react-redux';
import Spinner from "../spinner";
import {Container, Row} from "reactstrap";
import RubricListItem from "../rubric-list-item";


class RubricList extends Component{

    componentDidMount(){
        this.props.rubricsRequested();
        const {CreatorService} = this.props;
        CreatorService.getRubrics()
            .then((res) => {this.props.rubricsLoaded(res)})

    }


    render(){
        const {rubricList, loading} = this.props;
        if(loading){
            return <Spinner/>
        }
        return (
            <div className ="rubric-list">
                <h1>Выбирите тематику сайта</h1>
                <Container>
                    <Row>

                            {rubricList.map(rubric => {
                                return <RubricListItem key={rubric.id} rubric={rubric}/>
                            })}


                    </Row>
                </Container>
            </div>
        )
    }
};

const mapStateToPops = (state) => {
    return {
        rubricList: state.rubrics,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps =  {
    rubricsLoaded,
    rubricsRequested,
    rubricsError


};

export default WithCreateService()( connect(mapStateToPops, mapDispatchToProps)(RubricList));
