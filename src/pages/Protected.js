// @flow

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import NotFound from '../components/NotFound';

const styles = (theme: Object) => ({});

const AUTHED = gql`
  {
    authed @client
  }
`;

type Props = {
  classes: Object,
  location: Object,
};

const Protected = (props: Props) => (
  <Query query={AUTHED}>
    {({ data: { authed } }) => {
      if (!authed) {
        return (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: props.location },
            }}
          />
        );
      }
      return (
        <Switch>
          <Route component={NotFound} />
        </Switch>
      );
    }}
  </Query>
);

export default withStyles(styles)(Protected);
