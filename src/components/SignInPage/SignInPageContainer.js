// @flow

import React, { useState } from 'react';
import { Route, Switch, Link as RouterLink, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';

import SignIn from '../SignIn';
import useStyles from './styles';

type Props = {
  match: Object,
};

export default function SignInPage({ match }: Props) {
  const classes = useStyles();
  const [error, setError] = useState({
    hasErrored: false,
    message: null,
  });

  function resetError() {
    setError({ hasErrored: false, message: null });
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
              />
            )}
          />
          <Route
            path={`${match.path}/register`}
            render={() => <h1>Register</h1>}
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
