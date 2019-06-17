import gql from 'graphql-tag';

import { SESSION, CREATE_SESSION, DELETE_SESSION } from './queries';

export const typeDef = gql`
  extend type Query {
    traccarSessionId: String
    waitForToken: Boolean
  }

  extend type Mutation {
    authWithPassword(input: AuthWithPasswordInput): Boolean
    signOut: Boolean
    registerWithPassword(input: RegisterWithPasswordInput): Boolean
  }

  input AuthWithPasswordInput {
    email: String!
    password: String!
  }

  input RegisterWithPasswordInput {
    email: String!
    name: String!
    password: String!
  }
`;

export async function createSession(client, force = false) {
  // `waitForToken` is used to prevent requesting session for new registration with
  // stale id token.
  const { waitForToken } = await client.readQuery({
    query: gql`
      {
        waitForToken @client
      }
    `,
  });
  if (waitForToken && !force) {
    return false;
  }
  const { data: { createSession } = {} } = await client.mutate({
    mutation: CREATE_SESSION,
  });
  const { traccarSessionId, me } = createSession || {};
  client.writeData({ data: { traccarSessionId, waitForToken: false } });
  client.writeQuery({ query: SESSION, data: { me } });
  return true;
}

export const resolvers = {
  Mutation: {
    authWithPassword: async (_, { input }, { client, firebase }) => {
      const { email, password } = input;
      await firebase.auth.signInWithEmailAndPassword(email, password);
    },
    signOut: async (_, __, { client, firebase }) => {
      await client.mutate({ mutation: DELETE_SESSION });
      await firebase.auth.signOut();
    },
    registerWithPassword: async (_, { input }, { client, firebase }) => {
      await client.writeData({ data: { waitForToken: true } });
      const { email, name, password } = input;
      const { user } = await firebase.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await user.updateProfile({ displayName: name });
      const forceRefresh = true;
      await user.getIdToken(forceRefresh);
      await createSession(client, forceRefresh);
    },
  },
};
