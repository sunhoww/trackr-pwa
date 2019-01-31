// @flow

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Mutation } from 'react-apollo';

import { SIGN_UP, SESSION } from '../graphql/queries';
import { styles } from './SignIn';

type Props = {
  classes: Object,
};

type State = {
  email?: string,
  name?: string,
  password?: string,
  passwordConfirm?: string,
  showPassword: boolean,
  hasErrored: boolean,
  willRedirect: boolean,
};

class Register extends React.Component<Props, State> {
  state = {
    email: undefined,
    name: undefined,
    password: undefined,
    passwordConfirm: undefined,
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
    const { name, email, password, passwordConfirm } = this.state;
    if (password !== passwordConfirm) {
      this.handleError();
    } else if (name && email && password) {
      mutation({ variables: { name, email, password } });
    }
  };
  handleSuccess = (cache, { data }) => {
    const { me } = data.signUp;
    cache.writeQuery({ query: SESSION, data: { me } });
    this.setState({ willRedirect: true });
  };
  render() {
    const { classes } = this.props;
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
            <PersonAddIcon fontSize="large" />
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
            id="name"
            label="Name"
            type="text"
            required
            fullWidth
            margin="normal"
            variant="filled"
            onChange={this.handleChange('name')}
          />
          <TextField
            id="password"
            label="Password"
            type={this.state.showPassword ? 'text' : 'password'}
            required
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
          <TextField
            id="passwordConfirm"
            label="Confirm Password"
            type={this.state.showPassword ? 'text' : 'password'}
            required
            fullWidth
            margin="normal"
            variant="filled"
            onChange={this.handleChange('passwordConfirm')}
          />
          <Mutation
            mutation={SIGN_UP}
            update={this.handleSuccess}
            onError={this.handleError}
          >
            {(signUp, { loading }) => (
              <div className={classes.submit}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={this.handleSubmit(signUp)}
                >
                  Sign Up
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

export default withStyles(styles)(Register);
