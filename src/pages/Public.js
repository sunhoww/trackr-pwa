// @flow

import React from 'react';
import { Route, Switch, Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';

import SignIn from '../components/SignIn';
import Register from '../components/Register';
import NotFound from '../components/NotFound';

const styles = (theme: Object) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: '1 1 auto',
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  links: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
});

type Props = {
  classes: Object,
  match: Object,
};

const Public = ({ classes, match }: Props) => (
  <div className={classes.root}>
    <main className={classes.main}>
      <Switch>
        <Route path={`${match.path}/register`} component={Register} />
        <Route exact path={match.path} component={SignIn} />
        <Route component={NotFound} />
      </Switch>
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
    </main>
    <Typography
      component="footer"
      variant="caption"
      color="textSecondary"
      align="center"
      gutterBottom
    >
      &copy; 2019 <Link href="https://libermatic.com">libermatic</Link>. Powered
      by <Link href="https://www.traccar.org/">traccar</Link>.
    </Typography>
  </div>
);

export default withStyles(styles)(Public);
