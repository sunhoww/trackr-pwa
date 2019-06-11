// @flow

import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

type Props = {
  fullscreen: Boolean,
};

const useStyles = makeStyles((theme: Object) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreen: {
    minHeight: '100vh',
  },
}));

export default function LoadingView({ fullscreen }: Props) {
  const classes = useStyles();
  return (
    <Container
      className={clsx({
        [classes.container]: true,
        [classes.fullscreen]: fullscreen,
      })}
    >
      <CircularProgress />
    </Container>
  );
}
