import React, { Component } from 'react';

import firebase from './services/firebase';

import Login from './Login/Login';

import './App.scss';

type State = {
  loggedIn: boolean
};

class App extends Component<{}, State> {
  state = {
    loggedIn: false
  };

  componentDidMount() {
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      }
    });
  }
  render() {
    return <div className="app">{this.state.loggedIn ? null : <Login />}</div>;
  }
}

export default App;
