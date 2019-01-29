// @flow

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme: Object) => ({
  h1: {
    marginBottom: theme.spacing.unit * 4,
  },
});

type Props = {
  classes: Object,
};

const NotFound = ({ classes }: Props) => (
  <React.Fragment>
    <Typography className={classes.h1} component="h1" variant="h1">
      404
    </Typography>
    <Button variant="outlined" color="primary" component={Link} to="/">
      Home
    </Button>
  </React.Fragment>
);

export default withStyles(styles)(NotFound);
