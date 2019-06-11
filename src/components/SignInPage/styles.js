// @flow

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Object) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: '1 1 auto',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  footer: {
    textAlign: 'center',
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    width: 64,
    height: 64,
    backgroundColor: theme.palette.text.hint,
  },

  links: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },

  errorAvatar: {
    backgroundColor: theme.palette.error.dark,
  },
  errorSnackbar: {
    display: 'flex',
    flexFlow: 'row nowrap',
    backgroundColor: theme.palette.error.dark,
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  errorAction: {
    fontSize: 20,
  },
}));

export default useStyles;
