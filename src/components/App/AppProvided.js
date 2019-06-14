// @flow

import React from 'react';

import { AuthenticationProvider } from './AuthenticationContext';
import AppContainer from './AppContainer';

export default function AppView() {
  return (
    <AuthenticationProvider>
      <AppContainer />
    </AuthenticationProvider>
  );
}
