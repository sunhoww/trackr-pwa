// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: red,
  },
  typography: {
    useNextVariants: true,
  },
});

export function withMaterial(Component: ComponentType<any>) {
  function WithMaterial(props: Object) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return WithMaterial;
}
