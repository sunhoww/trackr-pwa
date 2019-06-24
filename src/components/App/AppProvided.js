// @flow

import React from 'react';

import { AuthenticationProvider } from '../Auth';
import AppContainer from './AppContainer';

export default function AppView() {
  return (
    <AuthenticationProvider>
      <AppContainer />
    </AuthenticationProvider>
  );
}
