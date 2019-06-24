// @flow

import React from 'react';
import type { Node } from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue, grey, amber } from '@material-ui/core/colors';
import clsx from 'clsx';

import { getInitials } from '../../utils/string';
import { CONNECTION_STATUS } from '../../constants';

const useStyles = makeStyles((theme: Object) => ({
  connectionOnline: {
    backgroundColor: blue[400],
  },
  connectionOffline: {
    backgroundColor: grey[400],
  },
  connectionUnknown: {
    backgroundColor: amber[400],
  },
}));

type Props = {
  primary: string,
  secondary?: string,
  icon?: Node,
  connectionStatus?: string,
};

export default function DeviceList({
  primary,
  secondary,
  icon,
  connectionStatus,
}: Props) {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          className={clsx({
            [classes.connectionOnline]:
              connectionStatus === CONNECTION_STATUS.ONLINE,
            [classes.connectionOffline]:
              connectionStatus === CONNECTION_STATUS.OFFLINE,
            [classes.connectionUnknown]:
              connectionStatus === CONNECTION_STATUS.UNKNOWN,
          })}
        >
          {icon || getInitials(primary)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
}
