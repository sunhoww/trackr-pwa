// @flow

import React from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Error as ErrorIcon, Close as CloseIcon } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Object) => ({
  content: {
    display: 'flex',
    flexFlow: 'row nowrap',
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  action: {
    fontSize: 20,
  },
}));

type Props = {
  hasErrored: Boolean,
  message: String,
  resetError: Function,
};

export default function SnackbarView({
  hasErrored,
  message,
  resetError,
}: Props) {
  const classes = useStyles();
  return (
    <Snackbar open={hasErrored} onClose={resetError}>
      <SnackbarContent
        className={classes.content}
        message={
          <span className={classes.message}>
            <ErrorIcon className={classes.icon} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={resetError}
          >
            <CloseIcon className={classes.action} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}
