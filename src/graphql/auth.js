import gql from 'graphql-tag';
import firebase from 'firebase/app';

import { DELETE_SESSION } from './queries';

export const typeDef = gql`
  extend type Query {
    isAuthed: Boolean
    authCompleted: Boolean
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

// traccar mutations are handled by onAuthStateChanged in services/firebase
export const resolvers = {
  Mutation: {
    authWithPassword: async (_, { input }) => {
      const { email, password } = input;
      await firebase.auth().signInWithEmailAndPassword(email, password);
    },
    signOut: async (_, __, { client }) => {
      // traccar mutation is required server requires access to idToken for the request
      await client.mutate({ mutation: DELETE_SESSION });
      await firebase.auth().signOut();
    },
    registerWithPassword: async (_, { input }, { client }) => {
      const { email, name, password } = input;
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      user.updateProfile({ displayName: name });
    },
  },
};
