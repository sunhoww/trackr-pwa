// @flow

import React, { useContext } from 'react';
import { Mutation } from 'react-apollo';
import { Button, CircularProgress } from '@material-ui/core';

import { FirebaseContext } from '../../services/firebase';
import { AUTH_WITH_PASSWORD } from '../../graphql/queries';
import useStyles from './styles';

type Props = {
  handleSubmit: Function,
  onSuccess: Function,
  onError: Function,
};

export default function SignInAction({
  handleSubmit,
  onSuccess,
  onError,
}: Props) {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  return (
    <Mutation
      mutation={AUTH_WITH_PASSWORD}
      errorPolicy="all"
      onCompleted={onSuccess}
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
            Sign In
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.submitProgress} />
          )}
        </div>
      )}
    </Mutation>
  );
}
