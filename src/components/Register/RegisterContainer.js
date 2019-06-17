// @flow

import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';

import RegisterAction from './RegisterAction.js';
import useStyles from '../SignIn/styles';

type Props = {
  setErrorMessage: Function,
};

export default function SignInView({ setErrorMessage }: Props) {
  const classes = useStyles();
  const [fields, setFields] = useState({
    email: null,
    password: null,
    passwordConfirm: null,
    name: null,
  });
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
      const { password, passwordConfirm } = fields;
      if (password !== passwordConfirm) {
        return setErrorMessage('Password fields must match');
      }
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
        id="name"
        label="Name"
        required
        fullWidth
        margin="normal"
        variant="filled"
        onChange={handleChange('name')}
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
      <TextField
        id="passwordConfirm"
        label="Confirm Password"
        type={passwordVisible ? 'text' : 'password'}
        required
        autoComplete="current-password"
        fullWidth
        margin="normal"
        variant="filled"
        onChange={handleChange('passwordConfirm')}
      />
      <RegisterAction
        handleSubmit={handleSubmit}
        onError={({ networkError }) => setErrorMessage(networkError.message)}
      />
    </form>
  );
}
