//@flow
import * as React from 'react';
import { type ContextRouter } from 'react-router';
import isAfter from 'date-fns/is_after';

import firebase, { codesCollection, usersCollection } from '../services/firebase';

import Input from '../components/Input';
import Button from '../components/Button';
import Message from '../components/Message';
import { AccentColorUpdate } from '../themeContext';

import './SignUp.scss';

type Props = {
  ...ContextRouter
};

type State = {
  validCode: boolean,
  signupCode: string,
  name: string,
  email: string,
  password: string,
  verifyPassword: string,
  error: string,
  creating: boolean
};

class SignUp extends React.Component<Props, State> {
  state = {
    validCode: false,
    signupCode: '',
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
    error: '',
    creating: false
  };

  componentDidMount() {
    const { location } = this.props;

    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    if (code) {
      this.setState({ signupCode: code });
      this.verifySignupCode(code).then((valid) => {
        this.setState({ validCode: valid });
      });
    }
  }

  verifySignupCode(code: string) {
    return codesCollection()
      .doc('signupCode')
      .get()
      .then((doc) => {
        if (doc.exists) {
          const signupData: { code: string, expiration: ?any } = doc.data();
          const now = new Date();
          const expirationDate: ?Date = signupData.expiration ? signupData.expiration.toDate() : null;

          if (expirationDate) {
            return code === signupData.code && !isAfter(now, expirationDate);
          } else {
            return code === signupData.code;
          }
        } else {
          return false;
        }
      });
  }

  handleSignupCodeChange = (event: SyntheticInputEvent<*>) => {
    const value = event.target.value;
    this.setState({ signupCode: value });
    this.verifySignupCode(value).then((valid) => {
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
      this.setState({ creating: true });
      const auth = firebase.auth();
      auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          const errorCode = error.code;
          let errorMessage = '';

          if (errorCode === 'auth/email-already-in-use') {
            errorMessage = 'An account already exists for this email address';
          } else if (errorCode === 'auth/invalid-email') {
            errorMessage = 'Please enter a valid email address';
          } else if (errorCode === 'auth/weak-password') {
            errorMessage = 'Please enter a strong password';
          } else if (errorCode === 'auth/operation-not-allowed') {
            errorMessage = 'Sorry, creating new accounts is disabled for the moment';
          }
          this.setState({ error: errorMessage, creating: false });
        })
        .then((cred) => {
          if (cred) {
            cred.user.updateProfile({ displayName: name }).then(() => {
              usersCollection()
                .doc(cred.user.uid)
                .set({ displayName: name }, { merge: true })
                .then(() => {
                  this.props.history.push('/');
                });
            });
          }
        });
    }
  };

  render() {
    const { validCode, signupCode, name, email, password, verifyPassword, error, creating } = this.state;

    const message = !validCode ? 'You need a valid sign up code to create a new account' : error !== '' ? error : '';
    return (
      <>
        <AccentColorUpdate accentColor="blue" />
        <Message type={!validCode ? 'warning' : error !== '' ? 'error' : 'placeholder'}>{message}</Message>
        <div className="code-wrapper">
          <Input
            id="code"
            name="code"
            type="text"
            label="Signup Code"
            value={signupCode}
            onChange={this.handleSignupCodeChange}
          />
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
            {/* <div className="error-container">{error}</div> */}
            <Button onClick={this.handleSignUpButton} disabled={!validCode || creating} type="submit">
              Sign Up
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
