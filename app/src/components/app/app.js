import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {MainPage, RubricsPage, SupportPage, CreatePage, ChooseSiteType, ChooseSubrubricPage} from '../pages';
import Register from "../register";
import Login from "../login";
import {IntlProvider} from "react-intl";
import {LOCALES} from "../../i18n/locales";
import {messages} from "../../i18n/messages";
import {connect} from 'react-redux';
import {rubricsError, rubricsLoaded, rubricsRequested} from "../../actions";


class App extends Component{




    render() {

        const locale = LOCALES[this.props.currentLang];
        const defLocal = LOCALES[this.props.defaultLang];

        return (
            <IntlProvider locale={locale} messages={messages[locale]} defaultLocale={defLocal}>
                <div className="app">
                    <Switch>
                        <Route path = '/' exact component={MainPage}/>
                        <Route path='/auth'  component={Login}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/rubrics' component={RubricsPage}/>
                        <Route path='/support' component={SupportPage}/>
                        <Route path='/chooseSiteType/:id' exact render={props => <ChooseSiteType {...props}/>}/>
                        <Route path='/chooseSubRubric/:id' exact render={props => <ChooseSubrubricPage {...props}/>}/>
                        <Route path='/:id/:site/:lang' render={props => <CreatePage {...props}/>}/>
                    </Switch>
                </div>
            </IntlProvider>

        )
    }


};
const mapStateToPops = (state) => {
    return {
        defaultLang: state.defaultLang,
        currentLang: state.currentLang
    }
};

const mapDispatchToProps =  {

};

export default connect(mapStateToPops, mapDispatchToProps)(App);
