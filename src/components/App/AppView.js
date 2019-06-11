// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Auth from './Auth';
import SignInPage from '../SignInPage';
import Dashboard from '../Dashboard';

export default function AppView() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Switch>
        <Route path="/auth" component={SignInPage} />
        <Route
          render={props => (
            <Auth>
              <Dashboard {...props} />
            </Auth>
          )}
        />
      </Switch>
    </React.Fragment>
  );
}
