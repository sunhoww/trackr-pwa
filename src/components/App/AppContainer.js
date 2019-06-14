// @flow

import React, { useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import { Route, Switch, Redirect } from 'react-router-dom';

import PublicPage from '../PublicPage';
import Dashboard from '../Dashboard';
import Loading from '../Loading';
import { useAuthentication } from './AuthenticationContext';
import AuthRoute from './AuthRoute';
import { defaults } from '../../graphql';
import { createSession } from '../../graphql/auth';

type Props = {
  client: Object,
};

function AppContainer({ client }: Props) {
  const [hasSession, setHasSession] = useState(false);
  const { isSigningIn, user } = useAuthentication();
  useEffect(
    () => {
      async function create() {
        if (!isSigningIn && user) {
          await createSession(client);
          setHasSession(true);
        }
      }
      function remove() {
        if (!isSigningIn && !user) {
          client.resetStore();
        }
      }

      client.onResetStore(() => client.writeData({ data: defaults }));

      create();
      return remove;
    },
    [isSigningIn, user, client]
  );

  if (isSigningIn) {
    return <Loading fullscreen />;
  }

  if (!user) {
    return <PublicPage />;
  }

  if (!hasSession) {
    return <Loading fullscreen />;
  }

  return (
    <Switch>
      <AuthRoute
        path="/user"
        component={Dashboard}
        condition={user => !!user}
      />
      <Route render={() => <Redirect to="/user" />} />
    </Switch>
  );
}

export default withApollo(AppContainer);
