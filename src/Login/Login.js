//@flow
import React, { Component } from 'react';
import { Link, type RouterHistory } from 'react-router-dom';
import { Button, Input, Label, Alert } from 'reactstrap';

import firebase from '../services/firebase';

import { AccentColorUpdate } from '../themeContext';
import './Login.scss';

type Props = {
  history: RouterHistory
};

type State = {
  email: string,
  password: string,
  error: string
};

class Login extends Component<Props, State> {
  state = {
    email: '',
    password: '',
    error: ''
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
      .catch(error => {
        const errorCode = error.code;
        let errorMessage = '';
        if (errorCode === 'auth/invalid-email') {
          errorMessage = 'Please enter a valid email address';
        } else if (errorCode === 'auth/user-disabled') {
          errorMessage = 'This user has been disabled, please contact an administrator';
        } else if (errorCode === 'auth/user-not-found') {
          errorMessage = 'No user found for this email address';
        } else if (errorCode === 'auth/wrong-password') {
          errorMessage = 'Incorrect password';
        }
        this.setState({ error: errorMessage });
      })
      .then(user => {
        if (user) {
          this.props.history.push('/');
        }
      });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="login">
        <AccentColorUpdate accentColor="blue" />
        {/* <Message type={error !== '' ? 'error' : 'placeholder'}>{error}</Message> */}
        <div className="login-form">
          {/* TODO: come back and re-layout this page so the alert doesnt need to be inside the form */}
          {error !== '' && <Alert color="danger">{error}</Alert>}
          <Label for="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" value={email} onChange={this.handleChange} />
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={this.handleChange}
          />
          <Button onClick={this.handleLoginClick} disabled={email === '' || password === ''} color="primary">
            Log In
          </Button>
        </div>
        <div className="signup-link">
          <Link to="/signup">Sign up for a new account</Link>
        </div>
      </div>
    );
  }
}

export default Login;
