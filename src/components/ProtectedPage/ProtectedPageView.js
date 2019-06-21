// @flow

import React, { useState } from 'react';
import { Route } from 'react-router-dom';
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
import NotFound from '../NotFound';
import useStyles from './styles';

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
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
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
          <Profile
            drawerAction={
              isLargeScreen && (
                <IconButton onClick={() => setDrawerOpen(false)}>
                  <ChevronLeftIcon />
                </IconButton>
              )
            }
          />
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
        <Route
          render={props => <NotFound className={classes.notFound} {...props} />}
        />
      </Container>
    </div>
  );
}
