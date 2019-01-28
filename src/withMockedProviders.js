import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';

export default function(Component: ComponentType<any>) {
  function WithMockedProviders(props: Object) {
    return (
      <MockedProvider>
        <Component {...props} />
      </MockedProvider>
    );
  }
  return WithMockedProviders;
}
