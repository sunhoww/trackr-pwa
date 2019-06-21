// @flow

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Link = React.forwardRef((props, ref) => (
  <NavLink {...props} innerRef={ref} />
));

type Props = {
  primary: string,
  icon: React.Node,
  to: string,
  onClick?: Function,
};

const useStyles = makeStyles((theme: Object) => ({
  active: {
    backgroundColor: theme.palette.action.selected,
  },
}));

export default function ListItemLink({ primary, icon, to, onClick }: Props) {
  const classes = useStyles();
  return (
    <li>
      <ListItem
        button
        component={Link}
        to={to}
        onClick={onClick}
        activeClassName={classes.active}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
