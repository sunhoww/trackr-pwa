// @flow

import React, { useState } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import type { RouterLocation, RouterHistory } from 'react-router-dom';
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
  ArrowBack as ArrowBackIcon,
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

type Props = {
  location: RouterLocation,
  history: RouterHistory,
};

function ProtectedPageView({ location, history }: Props) {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const isSecondaryPage = !location.pathname.startsWith(ROUTES.DASHBOARD);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
        color={isSecondaryPage ? 'default' : 'primary'}
      >
        <Toolbar>
          <IconButton
            className={clsx(classes.menuButton, {
              [classes.hide]: isLargeScreen && drawerOpen && !isSecondaryPage,
            })}
            color="inherit"
            edge="start"
            onClick={
              isSecondaryPage ? history.goBack : () => setDrawerOpen(true)
            }
          >
            <Switch>
              <Route path={ROUTES.DASHBOARD} component={MenuIcon} />
              <Route path={ROUTES.DEVICES} component={ArrowBackIcon} />
            </Switch>
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
          <Switch>
            <Route path={ROUTES.DASHBOARD} component={Profile} />
          </Switch>
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

export default withRouter(ProtectedPageView);
