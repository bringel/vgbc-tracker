//@flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import firebase from '../services/firebase';
import FirebaseContext from '../firebase-context';
import './Header.scss';

const Header = () => (
  <FirebaseContext.Consumer>
    {(context) => (
      <div className="header">
        <h1>
          <Link to="/" className="link">
            Video Game Book Club Tracker
          </Link>
        </h1>
        <div className="nav-container">
          {context.isLoggedIn ? (
            <>
              <span>
                <Link to="/admin" className="link">
                  Admin
                </Link>
              </span>
              <span onClick={() => firebase.auth().signOut()} className="link">
                Logout
              </span>
              <span>{context.currentUser.displayName || ''}</span>
            </>
          ) : (
            <span>
              <Link to="/login" className="link">
                Log In
              </Link>
            </span>
          )}
        </div>
      </div>
    )}
  </FirebaseContext.Consumer>
);

export default Header;
