// @flow

import React, { useState } from 'react';
import { Route, Link as RouterLink, Redirect } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Avatar,
  Link,
  Snackbar,
  SnackbarContent,
  IconButton,
} from '@material-ui/core';
import {
  ErrorOutline as ErrorOutlineIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Error as ErrorIcon,
  Close as CloseIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

import SignIn from '../SignIn';
import Register from '../Register';
import useStyles from './styles';

type Props = {
  match: Object,
  location: Object,
};

export default function SignInPage({ match, location }: Props) {
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
          <Avatar
            className={clsx({
              [classes.avatar]: true,
              [classes.errorAvatar]: error.hasErrored,
            })}
          >
            {error.hasErrored ? (
              <ErrorOutlineIcon fontSize="large" />
            ) : (
              <React.Fragment>
                <Route
                  exact
                  path={match.path}
                  render={() => <PersonIcon fontSize="large" />}
                />
                <Route
                  path={`${match.path}/register`}
                  render={() => <AddIcon fontSize="large" />}
                />
              </React.Fragment>
            )}
          </Avatar>
          <Route
            exact
            path={match.path}
            render={props => (
              <SignIn
                {...props}
                setErrorMessage={message =>
                  setError({ hasErrored: true, message })
                }
                onSuccess={() => setRedirectToReferrer(true)}
              />
            )}
          />
          <Route
            path={`${match.path}/register`}
            render={props => (
              <Register
                {...props}
                setErrorMessage={message =>
                  setError({ hasErrored: true, message })
                }
                onSuccess={() => setRedirectToReferrer(true)}
              />
            )}
          />
        </Paper>
        <Typography
          className={classes.links}
          align="center"
          gutterBottom
          variant="body1"
        >
          <Route
            exact
            path={match.path}
            render={() => (
              <Link component={RouterLink} to={`${match.path}/register`}>
                I don't have an account yet.
              </Link>
            )}
          />
          <Route
            path={`${match.path}/register`}
            render={() => (
              <Link component={RouterLink} to={match.path}>
                I want to sign in.
              </Link>
            )}
          />
        </Typography>
      </Container>
      <Container className={classes.footer} component="footer">
        <Typography variant="caption" color="textSecondary" gutterBottom>
          &copy; 2019 <Link href="https://libermatic.com">libermatic</Link>.
          Powered by <Link href="https://www.traccar.org/">traccar</Link>.
        </Typography>
      </Container>
      <Snackbar open={error.hasErrored} onClose={resetError}>
        <SnackbarContent
          className={classes.errorSnackbar}
          message={
            <span className={classes.errorMessage}>
              <ErrorIcon className={classes.errorIcon} />
              {error.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={resetError}
            >
              <CloseIcon className={classes.errorAction} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </div>
  );
}
