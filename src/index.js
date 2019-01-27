// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import Index from './pages/index';
import * as serviceWorker from './serviceWorker';
import withApollo from './withApollo';
import withRouter from './withRouter';
import withMaterial from './withMaterial';

const App = withApollo(withRouter(withMaterial(Index)));

// $FlowIgnore
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
