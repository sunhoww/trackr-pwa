// @flow

import * as React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import gql from 'graphql-tag';

import client from './apollo';
import { SESSION, CREATE_SESSION } from '../graphql/queries';

const firebaseConfig = JSON.parse(
  process.env.REACT_APP_FIREBASE_CONFIG || '{}'
);

class Firebase {
  auth: Object;
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }
}

export const FirebaseContext = React.createContext<?Firebase>(null);

export const FirebaseProvider = FirebaseContext.Provider;

// firebase.auth().onAuthStateChanged(async user => {
//   if (user) {
//     const { isManualAuth } = await client.readQuery({
//       query: gql(`{ isManualAuth @client }`),
//     });
//     if (!isManualAuth) {
//       const {
//         data: { createSession },
//       } = await client.mutate({ mutation: CREATE_SESSION });
//       const { traccarSessionId, me } = createSession || {};
//       client.writeData({ data: { isAuthed: true, traccarSessionId } });
//       client.writeQuery({ query: SESSION, data: { me } });
//     }
//   } else {
//     await client.resetStore();
//   }
//   client.writeData({ data: { authCompleted: true } });
// });

export default Firebase;
