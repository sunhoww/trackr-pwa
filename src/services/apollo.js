// @flow

import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import firebase from 'firebase';
import { merge } from 'ramda';

import { defaults, resolvers, typeDefs } from '../graphql';

const client = new ApolloClient({
  uri: process.env.REACT_APP_TRACCAR_GRAPHQL,
  fetchOptions: { credentials: 'include' },
  clientState: { defaults, resolvers, typeDefs },
  request: async (operation, ...rest) => {
    const [idToken, sessionId] = await Promise.all([
      getIdToken(),
      getSessionId(),
    ]);
    const headers = merge(idToken, sessionId);
    if (Object.keys(headers).length > 0) {
      operation.setContext({ headers });
    }
  },
});

async function getIdToken() {
  const user = firebase.auth().currentUser;
  if (user) {
    const idToken = await user.getIdToken();
    return { authorization: `Bearer ${idToken}` };
  }
  return {};
}

async function getSessionId() {
  const { traccarSessionId } = await client.readQuery({
    query: gql(`{ traccarSessionId @client }`),
  });
  if (traccarSessionId) {
    return { 'x-traccar-session-id': traccarSessionId };
  }
  return {};
}

client.onResetStore(() => client.writeData({ data: defaults }));

export default client;
