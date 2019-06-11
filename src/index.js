// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { withApollo } from './services/apollo';
import withRouter from './withRouter';
import withMaterial from './withMaterial';
import './services/firebase';

const Root = withApollo(withRouter(withMaterial(App)));

// $FlowIgnore
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
