//@flow
import * as React from 'react';

// import firebase from '../services/firebase';

import Input from '../components/Input';
import Button from '../components/Button';
import { AccentColorUpdate } from '../themeContext';

import './SignUp.scss';

type Props = {};

type State = {
  name: string,
  email: string,
  password: string,
  verifyPassword: string
};

class SignUp extends React.Component<Props, State> {
  state = {
    name: '',
    email: '',
    password: '',
    verifyPassword: ''
  };

  handleInputChange = (event: SyntheticInputEvent<*>) => {
    const fieldName = event.target.name;
    const value = event.target.value;

    this.setState({ [fieldName]: value });
  };

  render() {
    return (
      <>
        <AccentColorUpdate accentColor="blue" />
        <div className="signup-wrapper">
          <div className="signup-form">
            <Input id="name" name="name" type="text" label="Name" onChange={(event) => this.handleInputChange(event)} />
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              onChange={(event) => this.handleInputChange(event)}
            />
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              onChange={(event) => this.handleInputChange(event)}
            />
            <Input
              id="verifyPassword"
              name="verifyPassword"
              type="password"
              label="Verify Password"
              onChange={(event) => this.handleInputChange(event)}
            />

            <Button buttonStyle="blue">Sign Up</Button>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
