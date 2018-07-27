//@flow
import * as React from 'react';

import firebase from '../services/firebase';
import { FirebaseContextConsumer } from '../firebase-context';
import './Header.scss';

const Header = () => (
  <FirebaseContextConsumer>
    {(context) => (
      <div className="header">
        <h1>Video Game Book Club Tracker</h1>
        {context.isLoggedIn && (
          <div className="user-container">
            <span className="user-name">{context.currentUser.displayName || ''}</span>
            <span onClick={() => firebase.auth().signOut()} className="logout-link">
              Logout
            </span>
          </div>
        )}
      </div>
    )}
  </FirebaseContextConsumer>
);

export default Header;
