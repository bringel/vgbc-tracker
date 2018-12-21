//@flow
import * as React from 'react';
import { type Match, RouterHistory } from 'react-router';

import firebase from '../services/firebase';

import Input from '../components/Input';
import Button from '../components/Button';
import { AccentColorUpdate } from '../themeContext';

import './SignUp.scss';

type Props = {
  match: Match,
  history: RouterHistory
};

type State = {
  name: string,
  email: string,
  password: string,
  verifyPassword: string,
  error: string
};

class SignUp extends React.Component<Props, State> {
  state = {
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
    error: ''
  };

  handleInputChange = (event: SyntheticInputEvent<*>) => {
    const fieldName = event.target.name;
    const value = event.target.value;

    this.setState({ [fieldName]: value }, () => {
      const { password, verifyPassword } = this.state;
      if (password !== '' && verifyPassword !== '' && password !== verifyPassword) {
        this.setState({ error: 'Passwords must match' });
      } else {
        this.setState({ error: '' });
      }
    });
  };

  handleSignUpButton = () => {
    const { name, email, password, error } = this.state;
    if (error === '') {
      const auth = firebase.auth();
      auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          console.log(`${error.code}: ${error.message}`);
        })
        .then((cred) => {
          if (cred) {
            cred.user.updateProfile({ displayName: name }).then(() => {
              this.props.history.push('/');
            });
          }
        });
    }
  };

  render() {
    const { name, email, password, verifyPassword, error } = this.state;
    return (
      <>
        <AccentColorUpdate accentColor="blue" />
        <div className="signup-wrapper">
          <div className="signup-form">
            <Input
              id="name"
              name="name"
              type="text"
              label="Name"
              value={name}
              onChange={(event) => this.handleInputChange(event)}
            />
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              value={email}
              onChange={(event) => this.handleInputChange(event)}
            />
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              value={password}
              onChange={(event) => this.handleInputChange(event)}
            />
            <Input
              id="verifyPassword"
              name="verifyPassword"
              type="password"
              label="Verify Password"
              value={verifyPassword}
              onChange={(event) => this.handleInputChange(event)}
            />
            <div className="error-container">{error}</div>
            <Button buttonStyle="blue" onClick={this.handleSignUpButton}>
              Sign Up
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
