//@flow
import * as React from 'react';
import { type Match, type RouterHistory } from 'react-router';

import firebase, { codesCollection } from '../services/firebase';

import Input from '../components/Input';
import Button from '../components/Button';
import { AccentColorUpdate } from '../themeContext';

import './SignUp.scss';

type Props = {
  match: Match,
  history: RouterHistory
};

type State = {
  validCode: boolean,
  name: string,
  email: string,
  password: string,
  verifyPassword: string,
  error: string
};

class SignUp extends React.Component<Props, State> {
  state = {
    validCode: false,
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
    error: ''
  };

  verifySignupCode(code: string) {
    return codesCollection()
      .doc('signupCode')
      .get()
      .then((doc) => {
        if (doc.exists) {
          const signupData: { code: string } = doc.data();
          return code === signupData.code;
        } else {
          return false;
        }
      });
  }

  handleSignupCodeChange = (event: SyntheticInputEvent<*>) => {
    const value = event.target.value;
    this.verifySignupCode(value).then((valid) => {
      console.log(`code valid: ${valid}`);
      this.setState({ validCode: valid });
    });
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
    const { validCode, name, email, password, verifyPassword, error } = this.state;

    return (
      <>
        <AccentColorUpdate accentColor="blue" />
        <div className="code-wrapper">
          <Input id="code" name="code" type="text" label="Signup Code" onChange={this.handleSignupCodeChange} />
        </div>
        <div className="signup-wrapper">
          <div className="signup-form">
            <Input
              id="name"
              name="name"
              type="text"
              label="Name"
              value={name}
              onChange={(event) => this.handleInputChange(event)}
              autoComplete="name"
              disabled={!validCode}
            />
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              value={email}
              onChange={(event) => this.handleInputChange(event)}
              autoComplete="email"
              disabled={!validCode}
            />
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              value={password}
              onChange={(event) => this.handleInputChange(event)}
              autoComplete="new-password"
              disabled={!validCode}
            />
            <Input
              id="verifyPassword"
              name="verifyPassword"
              type="password"
              label="Verify Password"
              value={verifyPassword}
              onChange={(event) => this.handleInputChange(event)}
              autoComplete="new-password"
              disabled={!validCode}
            />
            <div className="error-container">{error}</div>
            <Button onClick={this.handleSignUpButton} disabled={!validCode} type="submit">
              Sign Up
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
