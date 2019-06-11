// @flow

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Object) => ({
  form: {
    width: '100%',
  },
  submit: {
    marginTop: theme.spacing(3),
    position: 'relative',
  },
  submitProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default useStyles;
