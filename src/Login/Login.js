//@flow
import React, { Component } from 'react';
import type { RouterHistory } from 'react-router-dom';

import firebase, { loginProvider } from '../services/firebase';

import { AccentColorUpdate } from '../themeContext';
import Button from '../components/Button';
import './Login.scss';

type Props = {
  history: RouterHistory
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
    return (
      <div className="login">
        <AccentColorUpdate accentColor="facebook-blue" />
        <Button className="login-button" onClick={this.handleLoginClick}>
          Login in with Facebook
        </Button>
      </div>
    );
  }
}

export default Login;
