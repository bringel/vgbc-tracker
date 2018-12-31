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
        {context.isLoggedIn ? (
          <div className="user-container">
            <span className="user-name">{context.currentUser.displayName || ''}</span>
            <span onClick={() => firebase.auth().signOut()} className="link">
              Logout
            </span>
          </div>
        ) : (
          <div className="nav-container">
            <span>
              <Link to="/login" className="link">
                Log In
              </Link>
            </span>
            <span>
              <Link to="/signup" className="link">
                Sign Up
              </Link>
            </span>
          </div>
        )}
      </div>
    )}
  </FirebaseContext.Consumer>
);

export default Header;
