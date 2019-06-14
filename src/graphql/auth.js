import gql from 'graphql-tag';

import { SESSION, CREATE_SESSION, DELETE_SESSION } from './queries';

export const typeDef = gql`
  extend type Query {
    traccarSessionId: String
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

export async function createSession(client) {
  const {
    data: { createSession },
  } = await client.mutate({ mutation: CREATE_SESSION });
  const { traccarSessionId, me } = createSession || {};
  client.writeData({ data: { traccarSessionId } });
  client.writeQuery({ query: SESSION, data: { me } });
}

export const resolvers = {
  Mutation: {
    authWithPassword: async (_, { input }, { client, firebase }) => {
      await client.writeData({ data: { isManualAuth: true } });
      const { email, password } = input;
      await firebase.auth.signInWithEmailAndPassword(email, password);
      await createSession(client);
    },
    signOut: async (_, __, { client, firebase }) => {
      await client.mutate({ mutation: DELETE_SESSION });
      await firebase.auth.signOut();
    },
    registerWithPassword: async (_, { input }, { client, firebase }) => {
      await client.writeData({ data: { isManualAuth: true } });
      const { email, name, password } = input;
      const { user } = await firebase.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await user.updateProfile({ displayName: name });
      const forceRefresh = true;
      await user.getIdToken(forceRefresh);
      await createSession(client);
    },
  },
};
