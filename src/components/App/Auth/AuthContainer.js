// @flow

import * as React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import Loading from '../../Loading';
import { AUTHED } from '../../../graphql/queries';

type Props = {
  children: React.Node,
  location: Object,
};

function AuthContainer({ children, location }: Props) {
  return (
    <Query query={AUTHED}>
      {({ data = {}, loading, client }) => {
        if (loading || !data.authCompleted) {
          return <Loading fullscreen />;
        }
        if (!data.isAuthed) {
          return (
            <Redirect to={{ pathname: '/auth', state: { from: location } }} />
          );
        }
        return children;
      }}
    </Query>
  );
}

export default withRouter(AuthContainer);
