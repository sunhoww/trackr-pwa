// @flow

import { makeStyles } from '@material-ui/core/styles';
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
} from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Object) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  avatar: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  redAvatar: {
    backgroundColor: red[900],
    color: red[200],
  },
  pinkAvatar: {
    backgroundColor: pink[900],
    color: pink[200],
  },
  purpleAvatar: {
    backgroundColor: purple[900],
    color: purple[200],
  },
  deepPurpleAvatar: {
    backgroundColor: deepPurple[900],
    color: deepPurple[200],
  },
  indigoAvatar: {
    backgroundColor: indigo[900],
    color: indigo[200],
  },
  blueAvatar: {
    backgroundColor: blue[900],
    color: blue[200],
  },
  lightBlueAvatar: {
    backgroundColor: lightBlue[900],
    color: lightBlue[200],
  },
  cyanAvatar: {
    backgroundColor: cyan[900],
    color: cyan[200],
  },
  tealAvatar: {
    backgroundColor: teal[900],
    color: teal[200],
  },
  greenAvatar: {
    backgroundColor: green[900],
    color: green[200],
  },
  lightGreenAvatar: {
    backgroundColor: lightGreen[900],
    color: lightGreen[200],
  },
  limeAvatar: {
    backgroundColor: lime[900],
    color: lime[200],
  },
  yellowAvatar: {
    backgroundColor: yellow[900],
    color: yellow[200],
  },
  amberAvatar: {
    backgroundColor: amber[900],
    color: amber[200],
  },
  orangeAvatar: {
    backgroundColor: orange[900],
    color: orange[200],
  },
  deepOrangeAvatar: {
    backgroundColor: deepOrange[900],
    color: deepOrange[200],
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
