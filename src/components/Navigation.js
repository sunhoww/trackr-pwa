// @flow

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaceIcon from '@material-ui/icons/Place';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import { NavLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import { getColor, getInitials } from '../utils/color';

const styles = (theme: Object) => ({
  paper: {
    width: 320,
  },
  header: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  avatar: {
    marginTop: theme.spacing.unit * 2 + 38,
    marginBottom: theme.spacing.unit * 2,
    width: theme.spacing.unit * 7,
    height: theme.spacing.unit * 7,
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
  },
});

type Props = {
  classes: Object,
  email: string,
  name: string,
  width: number,
};
type State = {
  open: boolean,
};

const links = [
  { label: 'Devices', path: '/devices', icon: <PlaceIcon /> },
  { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
];

class Navigation extends React.Component<Props, State> {
  state = {
    open: false,
  };
  toggleDrawer = (open: boolean) => () => {
    this.setState({ open });
  };
  render() {
    const { classes, name, email } = this.props;
    const color = getColor(name);
    return (
      <nav>
        <IconButton onClick={this.toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          classes={{ paper: classes.paper }}
          open={this.state.open}
          onClose={this.toggleDrawer(false)}
        >
          <div className={classes.header}>
            <Avatar
              style={{ backgroundColor: color.light }}
              className={classes.avatar}
            >
              <Typography
                style={{ color: color.dark }}
                component="div"
                variant="h5"
              >
                {getInitials(name)}
              </Typography>
            </Avatar>
            <div className={classes.title}>
              <Typography variant="h5">{name}</Typography>
              <Typography
                component="p"
                variant="subtitle1"
                color="textSecondary"
              >
                {email}
              </Typography>
            </div>
          </div>
          <Divider />
          <List>
            {links.map(({ label, path, icon }) => (
              <ListItem
                button
                key={path}
                component={NavLink}
                to={path}
                onClick={this.toggleDrawer(false)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem
              button
              component={NavLink}
              to="/about"
              onClick={this.toggleDrawer(false)}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </Drawer>
      </nav>
    );
  }
}

export default withStyles(styles)(Navigation);
