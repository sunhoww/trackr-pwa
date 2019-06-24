// @flow

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Object) => ({
  emptyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.palette.action.disabled,
  },
  emptyIcon: {
    fontSize: '4em',
  },
}));

export default useStyles;
