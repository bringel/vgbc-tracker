//@flow
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import type { RouterHistory } from 'react-router-dom';

import firebase, { loginProvider } from '../services/firebase';

import Header from '../components/Header';
import Button from '../components/Button';
import './Login.scss';

type Props = {
  history: RouterHistory,
  loggedIn: boolean
};

class Login extends Component<Props> {
  handleLoginClick = () => {
    firebase
      .auth()
      .signInWithPopup(loginProvider)
      .then((result) => {
        const { displayName, email, photoURL, uid } = result.user;

        firebase
          .firestore()
          .collection('users')
          .doc(uid)
          .set({
            displayName,
            email,
            photoURL,
            isAdmin: false
          });

        this.props.history.push('/');
      });
  };

  render() {
    return this.props.loggedIn ? (
      <Redirect to="/" />
    ) : (
      <div className="login">
        <Header />
        <div className="content-wrapper">
          <Button className="login-button" onClick={this.handleLoginClick}>
            Login in with Facebook
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
