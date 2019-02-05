// @flow

import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';

const COLORS = [
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
];

export function getIndex(text: string, base: number): number {
  return text.split('').reduce((a, x) => a + x.charCodeAt(0), 0) % base;
}
export function getColor(text: string) {
  const color = COLORS[getIndex(text, COLORS.length)];
  return { light: color[200], dark: color[900] };
}

export function getInitials(text: string = ''): string {
  const words = text
    .replace(/\s\s+/g, ' ')
    .toUpperCase()
    .split(' ');
  return (
    words[0].substring(0, 1) +
    (words.length > 1 ? words[words.length - 1].substring(0, 1) : '')
  );
}
