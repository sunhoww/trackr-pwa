// @flow

import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Object) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.palette.action.disabled,
  },
  fullscreen: {
    flexGrow: 1,
  },
}));

type Props = {
  fullscreen: boolean,
};

export default function NotFoundView({ fullscreen }: Props) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, { [classes.fullscreen]: fullscreen })}>
      <Typography className={classes.text} variant="h3" gutterBottom>
        <span role="img" aria-label="not found">
          😬
        </span>
      </Typography>
      <Typography className={classes.text} variant="body1">
        Nothing to see here.
      </Typography>
    </div>
  );
}
