// @flow

import React from 'react';
import { Mutation } from 'react-apollo';
import { Button, CircularProgress } from '@material-ui/core';

import { useFirebase } from '../../services/firebase';
import { REGISTER_WITH_PASSWORD } from '../../graphql/queries';
import useStyles from '../SignIn/styles';

type Props = {
  handleSubmit: Function,
  onError: Function,
};

export default function RegisterAction({ handleSubmit, onError }: Props) {
  const classes = useStyles();
  const firebase = useFirebase();

  return (
    <Mutation
      mutation={REGISTER_WITH_PASSWORD}
      errorPolicy="all"
      onError={onError}
      context={{ firebase }}
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
            Sign Up
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.submitProgress} />
          )}
        </div>
      )}
    </Mutation>
  );
}
