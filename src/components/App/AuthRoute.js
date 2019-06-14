// @flow

import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { useAuthentication } from './AuthenticationContext';

type Props = {
  condition: Function,
  redirectTo?: String,
  location: Object,
};

function AuthRoute({ condition, redirectTo, location, ...props }: Props) {
  const { user, isSigningIn } = useAuthentication();
  if (!isSigningIn && !condition(user)) {
    return (
      <Redirect
        to={{ pathname: redirectTo || '/auth', state: { from: location } }}
      />
    );
  }
  return <Route {...props} />;
}

export default withRouter(AuthRoute);
