// @flow

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Object) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  appBarShift: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
  },
  mainShift: {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  },
  drawer: {
    flexShrink: 0,
    width: `calc(100vw - ${theme.spacing(12)}px)`,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
  },
  drawerAction: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  drawerTitle: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: `calc(100vw - ${theme.spacing(12)}px)`,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
  },
  toolbarOffset: theme.mixins.toolbar,
}));

export default useStyles;
