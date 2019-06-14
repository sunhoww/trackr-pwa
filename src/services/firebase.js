// @flow

import { createContext, useContext } from 'react';
import app from 'firebase/app';
import 'firebase/auth';

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

const FirebaseContext = createContext<?Firebase>(null);

export const FirebaseProvider = FirebaseContext.Provider;

export function useFirebase() {
  return useContext(FirebaseContext);
}

export default Firebase;
