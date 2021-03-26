import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {MainPage, RubricsPage, SupportPage, CreatePage} from '../pages';
import Register from "../register";
import Login from "../login";

const App = () => {
    return (
        <div className="app">
            <Switch>
                <Route path = '/' exact component={MainPage}/>
                <Route path='/auth' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/rubrics' component={RubricsPage}/>
                <Route path='/support' component={SupportPage}/>
                <Route path='/rubric/:id' render={props => <CreatePage {...props}/>}/>
            </Switch>
        </div>

    )
};
export default App;