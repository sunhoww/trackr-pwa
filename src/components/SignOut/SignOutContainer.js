// @flow

import React from 'react';
import { Mutation } from 'react-apollo';
import Button from '@material-ui/core/Button';
import { SIGN_OUT } from '../../graphql/queries';

export default function SignOutContainer() {
  return (
    <Mutation mutation={SIGN_OUT}>
      {mutation => (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={mutation}
        >
          Sign Out
        </Button>
      )}
    </Mutation>
  );
}
