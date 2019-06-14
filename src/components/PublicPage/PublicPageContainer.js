// @flow

import React, { useState } from 'react';
import { Container, Typography, Paper, Link } from '@material-ui/core';
import { Route, Switch, Link as RouterLink, Redirect } from 'react-router-dom';

import AvatarIcon from './AvatarIcon';
import FormRoute from './FormRoute';
import Snackbar from '../Snackbar';
import useStyles from './styles';
import { ROUTES } from './constants';

type Props = {
  match: Object,
  location: Object,
};

export default function PublicPageContainer({ match, location }: Props) {
  const classes = useStyles();
  const [error, setError] = useState({
    hasErrored: false,
    message: null,
  });

  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  function resetError() {
    setError({ hasErrored: false, message: null });
  }

  if (redirectToReferrer) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Redirect to={from} />;
  }

  return (
    <div className={classes.root}>
      <Container className={classes.main} component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <AvatarIcon hasErrored={error.hasErrored} />
          <FormRoute
            setErrorMessage={message => setError({ hasErrored: true, message })}
            onSuccess={() => setRedirectToReferrer(true)}
          />
        </Paper>
        <Typography
          className={classes.links}
          align="center"
          gutterBottom
          variant="body1"
        >
          <Switch>
            <Route
              path={ROUTES.SIGN_IN}
              render={() => (
                <Link component={RouterLink} to={ROUTES.SIGN_UP}>
                  I don't have an account yet.
                </Link>
              )}
            />
            <Route
              path={ROUTES.SIGN_UP}
              render={() => (
                <Link component={RouterLink} to={ROUTES.SIGN_IN}>
                  I want to sign in.
                </Link>
              )}
            />
          </Switch>
        </Typography>
      </Container>
      <Container className={classes.footer} component="footer">
        <Typography variant="caption" color="textSecondary" gutterBottom>
          &copy; 2019 <Link href="https://libermatic.com">libermatic</Link>.
          Powered by <Link href="https://www.traccar.org/">traccar</Link>.
        </Typography>
      </Container>
      <Snackbar {...error} resetError={resetError} />
    </div>
  );
}
