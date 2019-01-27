// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import SignIn from '../components/SignIn';

const styles = (theme: Object) => ({
  root: {
    textAlign: 'center',
    // padding: theme.spacing.unit * 3,
  },
});

type Props = {
  classes: Object,
};

function Index(props: Props) {
  return (
    <div className={props.classes.root}>
      <SignIn />
    </div>
  );
}

export default withStyles(styles)(Index);
