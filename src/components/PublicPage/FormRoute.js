// @flow

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SignIn from '../SignIn';
import Register from '../Register';
import { ROUTES } from './constants';

type Props = {
  setErrorMessage: Function,
};

export default function FormRoute(props: Props) {
  return (
    <Switch>
      <Route
        path={ROUTES.SIGN_IN}
        render={routeProps => <SignIn {...routeProps} {...props} />}
      />
      <Route
        path={ROUTES.SIGN_UP}
        render={routeProps => <Register {...routeProps} {...props} />}
      />
      <Route render={() => <Redirect to={ROUTES.SIGN_IN} />} />
    </Switch>
  );
}
