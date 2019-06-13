// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';

import Firebase, { FirebaseProvider } from './services/firebase';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import client from './services/apollo';
import theme, { MaterialProvider } from './config/material';

ReactDOM.render(
  <FirebaseProvider value={new Firebase()}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MaterialProvider theme={theme}>
          <App />
        </MaterialProvider>
      </BrowserRouter>
    </ApolloProvider>
  </FirebaseProvider>,
  // $FlowIgnore
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
