// @flow

import React from 'react';
import type { ComponentType } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import resolvers, { defaults } from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

const client = new ApolloClient({
  uri: 'http://graphql.docker.localhost/',
  credentials: 'include',
  clientState: { defaults, resolvers, typeDefs },
});

export default function(Component: ComponentType<any>) {
  function WithApollo(props: Object) {
    return (
      <ApolloProvider client={client}>
        <Component {...props} />
      </ApolloProvider>
    );
  }
  return WithApollo;
}
