// @flow

import React, { useState } from 'react';
import {
  Avatar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  LinearProgress,
} from '@material-ui/core';
import {
  AccountCircle as AccountIcon,
  PowerSettingsNew as PowerIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

import useStyles, { colorChoices } from './styles';
import { getInitials, reduceToIndex } from '../../utils/string';

type Props = {
  name: string,
  email: string,
  photoUrl: string,
  loading: boolean,
  signOut: Function,
};

export default function ProfileView({
  name,
  email,
  photoUrl,
  loading,
  signOut,
}: Props) {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  function openDialog() {
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  const colorIndex = reduceToIndex(email, colorChoices.length);

  return (
    <>
      <IconButton color="inherit" onClick={openDialog}>
        {photoUrl ? <Avatar alt={name} src={photoUrl} /> : <AccountIcon />}
      </IconButton>
      <Dialog maxWidth="sm" fullWidth open={dialogOpen} onClose={closeDialog}>
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <Avatar
            alt={name}
            src={photoUrl}
            className={clsx(
              classes.dialogAvatar,
              classes[colorChoices[colorIndex]]
            )}
          >
            {getInitials(name)}
          </Avatar>
          <div className={classes.dialogTitleText}>
            <Typography variant="body1">{name}</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {email}
            </Typography>
          </div>
          <IconButton onClick={signOut}>
            <PowerIcon />
          </IconButton>
        </DialogTitle>
        {loading && <LinearProgress />}
      </Dialog>
    </>
  );
}
