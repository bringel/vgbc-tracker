//@flow
import * as React from 'react';

import type { User } from './types/User.js';

type FirebaseContext = {
  isLoggedIn: boolean,
  currentUser: User
};

const defaultContext: FirebaseContext = {
  isLoggedIn: false,
  currentUser: null
};

const { Consumer, Provider } = React.createContext(defaultContext);

export { Consumer as FirebaseContextConsumer, Provider as FirebaseContextProvider };
