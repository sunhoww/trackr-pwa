// @flow

import firebase from 'firebase/app';
import 'firebase/auth';
import gql from 'graphql-tag';

import client from './apollo';
import { SESSION, CREATE_SESSION } from '../graphql/queries';

const firebaseConfig = JSON.parse(
  process.env.REACT_APP_FIREBASE_CONFIG || '{}'
);

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    const { isManualAuth } = await client.readQuery({
      query: gql(`{ isManualAuth @client }`),
    });
    if (!isManualAuth) {
      const {
        data: { createSession },
      } = await client.mutate({ mutation: CREATE_SESSION });
      const { traccarSessionId, me } = createSession || {};
      client.writeData({ data: { isAuthed: true, traccarSessionId } });
      client.writeQuery({ query: SESSION, data: { me } });
    }
  } else {
    await client.resetStore();
  }
  client.writeData({ data: { authCompleted: true } });
});
