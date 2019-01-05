//@flow
import * as React from 'react';

import type { User } from './types/User.js';

type FirebaseContextValue = {
  isLoggedIn: boolean,
  currentUser: User
};

export const defaultContext: FirebaseContextValue = {
  isLoggedIn: false,
  currentUser: { displayName: '', email: '', role: 'user' }
};

const FirebaseContext = React.createContext(defaultContext);

export default FirebaseContext;
