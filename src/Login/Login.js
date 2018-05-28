import React, { Component } from 'react';

import firebase, { loginProvider } from '../services/firebase';

import Button from '../components/Button';
import './Login.scss';

class Login extends Component<{}> {
  handleLoginClick = () => {
    firebase
      .auth()
      .signInWithPopup(loginProvider)
      .then((result) => {
        console.log(result);
      });
  };

  render() {
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
