// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';

export default function(Component: ComponentType<any>) {
  function WithRouter(props: Object) {
    return (
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    );
  }
  return WithRouter;
}
