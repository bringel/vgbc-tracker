//@flow
import * as React from 'react';

import type { User } from './types/User.js';

export type FirebaseContextValue = {
  isLoggedIn: boolean,
  currentUser: User
};

export const defaultContext: FirebaseContextValue = {
  isLoggedIn: false,
  currentUser: { userID: '', displayName: '', email: '', role: 'user' }
};

const FirebaseContext = React.createContext<FirebaseContextValue>(defaultContext);

export default FirebaseContext;
