//@flow
import React, { Component } from 'react';
import type { RouterHistory } from 'react-router-dom';

import firebase from '../services/firebase';

import { AccentColorUpdate } from '../themeContext';
import Input from '../components/Input';
import Button from '../components/Button';
import './Login.scss';

type Props = {
  history: RouterHistory
};

type State = {
  email: string,
  password: string
};

class Login extends Component<Props, State> {
  state = {
    email: '',
    password: ''
  };

  handleChange = (event: SyntheticInputEvent<*>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLoginClick = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(`error: ${error.code} - ${error.message}`);
      })
      .then(() => {
        this.props.history.push('/');
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login">
        <AccentColorUpdate accentColor="blue" />
        <div className="login-form">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            value={email}
            onChange={this.handleChange}
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            value={password}
            onChange={this.handleChange}
          />
          <Button onClick={this.handleLoginClick} disabled={email === '' || password === ''}>
            Log In
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
