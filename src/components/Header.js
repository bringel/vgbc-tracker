//@flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import firebase from '../services/firebase';
import FirebaseContext from '../firebase-context';

const Header = () => (
  <FirebaseContext.Consumer>
    {(context) => (
      <Navbar dark expand className="justify-content-between">
        <NavbarBrand href="/" className="text-primary">
          Video Game Book Club Tracker
        </NavbarBrand>
        <Nav navbar>
          {context.isLoggedIn ? (
            <>
              {context.currentUser.role === 'admin' ? (
                <NavItem>
                  <NavLink tag={Link} to="/admin" className="text-primary">
                    Admin
                  </NavLink>
                </NavItem>
              ) : null}
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  onClick={() => firebase.auth().signOut()}
                  className="text-primary">
                  Logout
                </NavLink>
              </NavItem>
              <NavItem>
                <span className="navbar-text text-primary" style={{ margin: '0 0.5rem' }}>
                  {context.currentUser.displayName || ''}
                </span>
              </NavItem>
            </>
          ) : (
            <NavItem>
              <NavLink tag={Link} to="/login" className="text-primary">
                Log In
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Navbar>
    )}
  </FirebaseContext.Consumer>
);

export default Header;
