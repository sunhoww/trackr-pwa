// @flow

import React from 'react';
import { Mutation } from 'react-apollo';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { PowerSettingsNew as PowerIcon } from '@material-ui/icons';

import { useFirebase } from '../../services/firebase';
import { SIGN_OUT } from '../../graphql/queries';

type Props = {
  onClick?: Function,
};

export default function SignOutLink({ onClick }: Props) {
  const firebase = useFirebase();

  function handleAction(mutate) {
    return function() {
      mutate();
      onClick && onClick();
    };
  }

  return (
    <Mutation mutation={SIGN_OUT} context={{ firebase }}>
      {mutate => (
        <li>
          <ListItem button onClick={handleAction(mutate)}>
            <ListItemIcon>
              <PowerIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </li>
      )}
    </Mutation>
  );
}
