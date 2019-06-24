// @flow

import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Container,
  Divider,
  useMediaQuery,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Profile from '../Profile';
import Navigation from '../Navigation';
import Devices from '../Devices';
import { AuthRoute } from '../Auth';
import { ROUTES } from '../../constants';
import useStyles from './styles';

const titles = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.DEVICES]: 'Devices',
};

export default function ProtectedPageView() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            className={clsx(classes.menuButton, {
              [classes.hide]: isLargeScreen && drawerOpen,
            })}
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            className={classes.title}
          >
            {Object.keys(titles).map(x => (
              <Route key={x} exact path={x} render={() => titles[x]} />
            ))}
          </Typography>
          <Profile />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          variant={isLargeScreen ? 'persistent' : 'temporary'}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          <div className={classes.drawerAction}>
            <div className={classes.drawerTitle}>
              <Typography variant="h6" noWrap>
                trackr
              </Typography>
            </div>
            {isLargeScreen && (
              <IconButton onClick={() => setDrawerOpen(false)}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </div>
          <Divider />
          <Navigation onSelect={() => !isLargeScreen && setDrawerOpen(false)} />
        </Drawer>
      </nav>
      <Container
        component="main"
        className={clsx(classes.main, {
          [classes.mainShift]: drawerOpen,
        })}
      >
        <div className={classes.toolbarOffset} />
        <Switch>
          <AuthRoute
            path={ROUTES.DASHBOARD}
            component={() => <div>Dashboard</div>}
            condition={user => !!user}
          />
          <AuthRoute
            path={ROUTES.DEVICES}
            component={Devices}
            condition={user => !!user}
          />
          <Route render={() => <Redirect to={ROUTES.DASHBOARD} />} />
        </Switch>
      </Container>
    </div>
  );
}
