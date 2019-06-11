// @flow

import firebase from 'firebase/app';
import 'firebase/auth';

import client from './apollo';
import { SESSION, CREATE_SESSION } from '../graphql/queries';

const firebaseConfig = JSON.parse(
  process.env.REACT_APP_FIREBASE_CONFIG || '{}'
);

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    const {
      data: { createSession },
    } = await client.mutate({ mutation: CREATE_SESSION });
    const { traccarSessionId, me } = createSession || {};
    client.writeData({ data: { isAuthed: true, traccarSessionId } });
    client.writeQuery({ query: SESSION, data: { me } });
  } else {
    client.resetStore();
  }
  client.writeData({ data: { authCompleted: true } });
});
