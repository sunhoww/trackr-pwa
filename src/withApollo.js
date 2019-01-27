// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://graphql.docker.localhost/',
});
const client = new ApolloClient({ cache, link });

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
