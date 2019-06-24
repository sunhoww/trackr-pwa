// @flow

import React, { createContext, useState, useEffect, useContext } from 'react';
import type { Node } from 'react';

import { useFirebase } from '../../services/firebase';

type Context = {
  user?: Object,
  isSigningIn: boolean,
};

const initValues = { user: null, isSigningIn: true };

const AuthenticationContext = createContext<Context>(initValues);

type Props = {
  children: Node,
};

export function AuthenticationProvider({ children }: Props) {
  const [values, setValues] = useState(initValues);
  const firebase = useFirebase();
  useEffect(
    () => {
      if (firebase) {
        return firebase.auth.onAuthStateChanged(async user => {
          setValues({ user, isSigningIn: false });
        });
      }
    },
    [firebase]
  );

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
