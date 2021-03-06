//@flow
import './SignUp.scss';

import { isAfter } from 'date-fns';
import * as React from 'react';
import { type ContextRouter } from 'react-router';
import { Alert, Button, Input, Label } from 'reactstrap';

import firebase, { codesCollection, usersCollection } from '../services/firebase';
import { AccentColorUpdate } from '../themeContext';

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
      this.verifySignupCode(code).then(valid => {
        this.setState({ validCode: valid });
      });
    }
  }

  verifySignupCode(code: string) {
    return codesCollection()
      .doc('signupCode')
      .get()
      .then(doc => {
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
    this.verifySignupCode(value).then(valid => {
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
        .catch(error => {
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
        .then(cred => {
          if (cred) {
            cred.user.updateProfile({ displayName: name }).then(() => {
              usersCollection()
                .doc(cred.user.uid)
                .set({ displayName: name }, { merge: true });
            });
            this.unsubscribeUserDoc = usersCollection()
              .doc(cred.user.uid)
              .onSnapshot(snapshot => {
                //wait for the firebase function to set the role before navigating
                const data = snapshot.data();
                if (data && data.role) {
                  this.props.history.push('/');
                }
              });
          }
        });
    }
  };

  componentWillUnmount() {
    if (this.unsubscribeUserDoc) {
      this.unsubscribeUserDoc();
    }
  }

  unsubscribeUserDoc = null;

  render() {
    const { validCode, signupCode, name, email, password, verifyPassword, error, creating } = this.state;

    const message = !validCode ? 'You need a valid sign up code to create a new account' : error !== '' ? error : '';
    return (
      <>
        {/* <Message type={!validCode ? 'warning' : error !== '' ? 'error' : 'placeholder'}>{message}</Message> */}
        <div className="code-wrapper">
          <AccentColorUpdate accentColor="blue" />
          <div className="code-form-wrapper">
            {/* TODO: come back and re-layout this page so the alert doesnt need to be inside the form */}
            {(!validCode || error !== '') && (
              <Alert color={!validCode ? 'warning' : error !== '' ? 'danger' : ''}>{message}</Alert>
            )}
            <Label for="code">Signup Code</Label>
            <Input id="code" name="code" type="text" value={signupCode} onChange={this.handleSignupCodeChange} />
          </div>
        </div>
        <div className="signup-wrapper">
          <div className="signup-form">
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={event => this.handleInputChange(event)}
              autoComplete="name"
              disabled={!validCode}
            />
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={event => this.handleInputChange(event)}
              autoComplete="email"
              disabled={!validCode}
            />
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={event => this.handleInputChange(event)}
              autoComplete="new-password"
              disabled={!validCode}
            />
            <Label for="verifyPassword">Verify Password</Label>
            <Input
              id="verifyPassword"
              name="verifyPassword"
              type="password"
              value={verifyPassword}
              onChange={event => this.handleInputChange(event)}
              autoComplete="new-password"
              disabled={!validCode}
            />
            {/* <div className="error-container">{error}</div> */}
            <Button onClick={this.handleSignUpButton} disabled={!validCode || creating} type="submit" color="primary">
              Sign Up
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
