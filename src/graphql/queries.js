import gql from 'graphql-tag';

export const AUTHED = gql`
  query GetAuthed {
    isAuthed @client
    authCompleted @client
  }
`;

export const SESSION = gql`
  {
    me {
      id
      email
      name
    }
  }
`;

export const CREATE_SESSION = gql`
  mutation CreateSession {
    createSession {
      traccarSessionId
      me {
        id
        email
        name
      }
    }
  }
`;

export const DELETE_SESSION = gql`
  mutation DeleteSession {
    deleteSession
  }
`;

export const AUTH_WITH_PASSWORD = gql`
  mutation AuthWithPassword($email: String!, $password: String!) {
    authWithPassword(input: { email: $email, password: $password }) @client {
      id
      email
      name
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut @client
  }
`;

export const REGISTER_WITH_PASSWORD = gql`
  mutation RegisterWithPassword(
    $name: String!
    $email: String!
    $password: String!
  ) {
    registerWithPassword(
      input: { name: $name, email: $email, password: $password }
    ) @client {
      id
      email
      name
    }
  }
`;
