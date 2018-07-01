//@flow
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import type { RouterHistory } from 'react-router-dom';

import firebase, { loginProvider, database } from '../services/firebase';

import Button from '../components/Button';
import './Login.scss';

type Props = {
  loggedIn: boolean,
  history: RouterHistory
};

class Login extends Component<Props> {
  handleLoginClick = () => {
    firebase
      .auth()
      .signInWithPopup(loginProvider)
      .then((result) => {
        const { displayName, email, photoURL, uid } = result.user;

        database
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
    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login">
        <Button className="login-button" onClick={this.handleLoginClick}>
          Login in with Facebook
        </Button>
      </div>
    );
  }
}

export default Login;
