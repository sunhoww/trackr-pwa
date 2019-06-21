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
import { ROUTES } from '../../constants';

function useSession(client: Object) {
  const { isSigningIn, user } = useAuthentication();
  const [hasSession, setHasSession] = useState(false);
  const [isRequestingSession, setIsRequestingSession] = useState(false);

  useEffect(
    () => {
      let active = true;
      let session;
      async function getSession() {
        if (active) {
          setIsRequestingSession(true);
        }
        if (active && user) {
          session = await createSession(client);
        }
        if (active) {
          setIsRequestingSession(false);
          setHasSession(!!session);
        }
      }
      const resetHandler = client.onResetStore(() =>
        client.writeData({ data: defaults })
      );
      getSession();
      return function() {
        active = false;
        resetHandler();
      };
    },
    [client, user]
  );

  const isLoading = isSigningIn || isRequestingSession;
  const hasAuth = !!user;

  return { isLoading, hasAuth, hasSession };
}

type Props = {
  client: Object,
};

function AppContainer({ client }: Props) {
  const { isLoading, hasAuth, hasSession } = useSession(client);

  if (isLoading) {
    return <Loading fullscreen />;
  }

  if (!hasAuth) {
    return <PublicPage />;
  }

  if (!hasSession) {
    return null;
  }

  return (
    <Switch>
      <AuthRoute
        path={ROUTES.DASHBOARD}
        component={Dashboard}
        condition={user => !!user}
      />
      <Route render={() => <Redirect to={ROUTES.DASHBOARD} />} />
    </Switch>
  );
}

export default withApollo(AppContainer);
