// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import {
  ErrorOutline as ErrorOutlineIcon,
  Person as PersonIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

import useStyles from './styles';
import { ROUTES } from '../../constants';

type Props = {
  hasErrored: boolean,
};

export default function AvatarIcon({ hasErrored }: Props) {
  const classes = useStyles();
  return (
    <Avatar
      className={clsx(classes.avatar, {
        [classes.errorAvatar]: hasErrored,
      })}
    >
      {hasErrored ? (
        <ErrorOutlineIcon fontSize="large" />
      ) : (
        <Switch>
          <Route
            path={ROUTES.SIGN_IN}
            render={() => <PersonIcon fontSize="large" />}
          />
          <Route
            path={ROUTES.SIGN_UP}
            render={() => <AddIcon fontSize="large" />}
          />
        </Switch>
      )}
    </Avatar>
  );
}
