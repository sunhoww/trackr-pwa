// @flow

import { makeStyles } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Object) => ({
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  dialogAvatar: {
    marginRight: theme.spacing(2),
  },
  dialogTitleText: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  redAvatar: {
    backgroundColor: colors.red[900],
  },
  pinkAvatar: {
    backgroundColor: colors.pink[900],
  },
  purpleAvatar: {
    backgroundColor: colors.purple[900],
  },
  deepPurpleAvatar: {
    backgroundColor: colors.deepPurple[900],
  },
  indigoAvatar: {
    backgroundColor: colors.indigo[900],
  },
  blueAvatar: {
    backgroundColor: colors.blue[900],
  },
  lightBlueAvatar: {
    backgroundColor: colors.lightBlue[900],
  },
  cyanAvatar: {
    backgroundColor: colors.cyan[900],
  },
  tealAvatar: {
    backgroundColor: colors.teal[900],
  },
  greenAvatar: {
    backgroundColor: colors.green[900],
  },
  lightGreenAvatar: {
    backgroundColor: colors.lightGreen[900],
  },
  limeAvatar: {
    backgroundColor: colors.lime[900],
  },
  yellowAvatar: {
    backgroundColor: colors.yellow[900],
  },
  amberAvatar: {
    backgroundColor: colors.amber[900],
  },
  orangeAvatar: {
    backgroundColor: colors.orange[900],
  },
  deepOrangeAvatar: {
    backgroundColor: colors.deepOrange[900],
  },
}));

export default useStyles;

export const colorChoices = [
  'redAvatar',
  'pinkAvatar',
  'purpleAvatar',
  'deepPurpleAvatar',
  'indigoAvatar',
  'blueAvatar',
  'lightBlueAvatar',
  'cyanAvatar',
  'tealAvatar',
  'greenAvatar',
  'lightGreenAvatar',
  'limeAvatar',
  'yellowAvatar',
  'amberAvatar',
  'orangeAvatar',
  'deepOrangeAvatar',
];
