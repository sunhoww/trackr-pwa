// @flow

import * as React from 'react';
import { Query, Mutation } from 'react-apollo';

import ProfileView from './ProfileView';
import { useFirebase } from '../../services/firebase';
import { SESSION, SIGN_OUT } from '../../graphql/queries';

export default function ProfileContainer() {
  const firebase = useFirebase();
  return (
    <Query query={SESSION}>
      {({ data = {}, loading }) => {
        if (loading) {
          return null;
        }

        return (
          <Mutation mutation={SIGN_OUT} context={{ firebase }}>
            {(mutate, { loading }) => (
              <ProfileView {...data.me} loading={loading} signOut={mutate} />
            )}
          </Mutation>
        );
      }}
    </Query>
  );
}
