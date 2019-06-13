// @flow

import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { teal, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: red,
  },
  typography: {
    useNextVariants: true,
  },
});

type Props = {
  theme: Object,
  children: React.Node,
};

export function MaterialProvider({ theme, children }: Props) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default theme;
