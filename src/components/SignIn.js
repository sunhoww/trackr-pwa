// @flow

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import { Mutation } from 'react-apollo';

import { LOGIN } from '../graphql/queries';

const styles = (theme: Object) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
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
};

type State = {
  email?: string,
  password?: string,
  showPassword: boolean,
};

class SignIn extends React.Component<Props, State> {
  state = {
    email: undefined,
    password: undefined,
    showPassword: false,
  };
  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  };
  handleShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleSubmit = mutation => e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      mutation({ variables: { email, password } });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PermIdentityIcon fontSize="large" />
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
            <Mutation mutation={LOGIN}>
              {(login, { loading }) => {
                return (
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
                );
              }}
            </Mutation>
          </form>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(SignIn);