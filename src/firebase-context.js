//@flow
import * as React from 'react';

import type { User } from './types/User.js';

type FirebaseContextValue = {
  isLoggedIn: boolean,
  currentUser: User
};

const defaultContext: FirebaseContextValue = {
  isLoggedIn: false,
  currentUser: null
};

const FirebaseContext = React.createContext(defaultContext);

export default FirebaseContext;
