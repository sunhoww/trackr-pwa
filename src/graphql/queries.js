import gql from 'graphql-tag';

export const SESSION = gql`
  {
    me {
      id
      email
      name
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      me {
        id
        email
        name
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signUp(input: { name: $name, email: $email, password: $password }) {
      me {
        id
        email
        name
      }
    }
  }
`;
