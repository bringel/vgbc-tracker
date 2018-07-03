//@flow
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase, { usersCollection } from './services/firebase';

import { FirebaseContextProvider } from './firebase-context';
import type { User } from './types/User.js';

import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

import './App.scss';

type State = {
  loggedIn: boolean,
  currentUser: User
};

class App extends Component<{}, State> {
  state = {
    loggedIn: false,
    currentUser: null
  };

  componentDidMount() {
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userDoc = usersCollection().doc(user.uid);
        userDoc.get().then((doc) => {
          this.setState({ loggedIn: true, currentUser: doc.data() });
        });
      } else {
        this.setState({ loggedIn: false, currentUser: null });
      }
    });
  }
  render() {
    return (
      <div className="app">
        <FirebaseContextProvider value={{ isLoggedIn: this.state.loggedIn, currentUser: this.state.currentUser }}>
          <BrowserRouter>
            <Switch>
              <Route path="/login" render={({ history }) => <Login history={history} />} />
              <Route path="/" exact render={() => <Dashboard />} />
            </Switch>
          </BrowserRouter>
        </FirebaseContextProvider>
      </div>
    );
  }
}

export default App;
