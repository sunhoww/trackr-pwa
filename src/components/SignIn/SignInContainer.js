// @flow

import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';

import { AUTH_WITH_PASSWORD } from '../../graphql/queries';
import useStyles from './styles';

type Props = {
  onSuccess: Function,
  setErrorMessage: Function,
};

export default function SignInView({ onSuccess, setErrorMessage }: Props) {
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
        onCompleted={onSuccess}
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
              Sign In
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
