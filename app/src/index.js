import React from 'react';
import ReactDOM from 'react-dom';
import '../settings/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import store from "./store";
import ErrorBoundry from "./components/error-boundry";
import CreatorServiceContext from "./components/creator-service-context";
import CreatorService from "./services/creatorService";
import {BrowserRouter as Router} from 'react-router-dom';
import App from "./components/app/app";

const creatorService = new CreatorService();

ReactDOM.render(
  <Provider store = {store}>
    <ErrorBoundry>
        <CreatorServiceContext.Provider value={creatorService}>
            <Router>
                <App/>
            </Router>
        </CreatorServiceContext.Provider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);


