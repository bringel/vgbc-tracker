import React, { Component } from 'react';

import Button from '../components/Button';
import './Login.scss';

class Login extends Component<{}> {
  handleLoginClick = () => {};

  render() {
    return (
      <div className="login">
        <Button className="login-button">Login in with Facebook</Button>
      </div>
    );
  }
}

export default Login;
