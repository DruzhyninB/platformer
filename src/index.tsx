import * as React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import Game from './Game';

import store from './store';
import history from './browserHistory';
import {routes} from './config/routes';

import './index.scss';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Game routes={routes}  />
        </Router>
    </Provider>
    , document.getElementById( 'root' ) );
