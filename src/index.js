// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import './services/firebase';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { withApollo } from './services/apollo';
import { withRouter } from './config/router';
import { withMaterial } from './config/material';
import { compose } from 'ramda';

const Root = compose(
  withApollo,
  withRouter,
  withMaterial
)(App);

// $FlowIgnore
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
