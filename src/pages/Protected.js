// @flow

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';

import NotFound from '../components/NotFound';
import { SESSION } from '../graphql/queries';

const styles = (theme: Object) => ({});

type Props = {
  classes: Object,
  location: Object,
};

const Protected = ({ location }: Props) => (
  <Query query={SESSION}>
    {({ data }) => {
      if (!data || !data.me) {
        return (
          <Redirect to={{ pathname: '/auth', state: { from: location } }} />
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
