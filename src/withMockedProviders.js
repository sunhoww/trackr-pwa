import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';

export default function(providerProps) {
  return function(Component: ComponentType<any>) {
    function WithMockedProviders(props: Object) {
      return (
        <MockedProvider addTypename={false} {...providerProps}>
          <Component {...props} />
        </MockedProvider>
      );
    }
    return WithMockedProviders;
  };
}
