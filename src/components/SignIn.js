// @flow

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { LOGIN } from '../graphql/queries';

export const styles = (theme: Object) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    width: 64,
    height: 64,
    backgroundColor: theme.palette.text.hint,
  },
  errored: {
    backgroundColor: theme.palette.error.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    position: 'relative',
  },
  submitProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

type Props = {
  classes: Object,
  location: Object,
};

type State = {
  email?: string,
  password?: string,
  showPassword: boolean,
  hasErrored: boolean,
  willRedirect: boolean,
};

class SignIn extends React.Component<Props, State> {
  state = {
    email: undefined,
    password: undefined,
    showPassword: false,
    hasErrored: false,
    willRedirect: false,
  };
  handleChange = (field: string) => e => {
    this.setState({ hasErrored: false, [field]: e.target.value });
  };
  handleShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleError = () => {
    this.setState({ hasErrored: true });
  };
  handleSubmit = mutation => e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      mutation({ variables: { email, password } });
    }
  };
  handleSuccess = cache => {
    cache.writeData({ data: { authed: true } });
    this.setState({ willRedirect: true });
  };
  render() {
    const { classes } = this.props;
    if (this.state.willRedirect) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      return <Redirect to={from} />;
    }
    return (
      <Paper className={classes.paper}>
        <Avatar
          className={classnames({
            [classes.avatar]: true,
            [classes.errored]: this.state.hasErrored,
          })}
        >
          {this.state.hasErrored ? (
            <ErrorOutlineIcon fontSize="large" />
          ) : (
            <PersonIcon fontSize="large" />
          )}
        </Avatar>
        <form className={classes.form}>
          <TextField
            id="email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            autoFocus
            fullWidth
            margin="normal"
            variant="filled"
            onChange={this.handleChange('email')}
          />
          <TextField
            id="password"
            label="Password"
            type={this.state.showPassword ? 'text' : 'password'}
            required
            autoComplete="current-password"
            fullWidth
            margin="normal"
            variant="filled"
            onChange={this.handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Mutation
            mutation={LOGIN}
            update={this.handleSuccess}
            onError={this.handleError}
          >
            {(login, { loading }) => (
              <div className={classes.submit}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={this.handleSubmit(login)}
                >
                  Sign in
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.submitProgress}
                  />
                )}
              </div>
            )}
          </Mutation>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(SignIn);
