// @flow

import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { AUTH_WITH_PASSWORD } from '../../graphql/queries';

const useStyles = makeStyles((theme: Object) => ({
  form: {
    width: '100%',
  },
  submit: {
    marginTop: theme.spacing(3),
    position: 'relative',
  },
  submitProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

type Props = {
  setErrorMessage: Function,
};

export default function SignInView({ setErrorMessage }: Props) {
  const classes = useStyles();
  const [fields, setFields] = useState({ email: null, password: null });
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleChange(field) {
    return function(e) {
      const { value } = e.target;
      setFields(prev => Object.assign({}, prev, { [field]: value }));
    };
  }

  function handleSubmit(mutation) {
    return function(e) {
      e.preventDefault();
      mutation({ variables: fields });
    };
  }

  return (
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
        onChange={handleChange('email')}
      />
      <TextField
        id="password"
        label="Password"
        type={passwordVisible ? 'text' : 'password'}
        required
        autoComplete="current-password"
        fullWidth
        margin="normal"
        variant="filled"
        onChange={handleChange('password')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={() => setPasswordVisible(prev => !prev)}
              >
                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Mutation
        mutation={AUTH_WITH_PASSWORD}
        errorPolicy="all"
        onError={({ networkError }) => setErrorMessage(networkError.message)}
      >
        {(mutation, { loading }) => (
          <div className={classes.submit}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleSubmit(mutation)}
            >
              Sign in
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.submitProgress} />
            )}
          </div>
        )}
      </Mutation>
    </form>
  );
}