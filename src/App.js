//@flow
import './App.scss';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';

import { FirebaseContextProvider } from './firebase-context';
import type { User } from './types/User.js';
import Dashboard from './Dashboard/Dashboard';
import Header from './components/Header';
import Login from './Login/Login';
import firebase, { usersCollection } from './services/firebase';

type State = {
  loggedIn: boolean,
  currentUser: User,
  loaded: boolean
};

class App extends Component<{}, State> {
  state = {
    loggedIn: false,
    currentUser: null,
    loaded: false
  };

  componentDidMount() {
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userDoc = usersCollection().doc(user.uid);
        userDoc.get().then((doc) => {
          this.setState({ loggedIn: true, currentUser: doc.data(), loaded: true });
        });
      } else {
        this.setState({ loggedIn: false, currentUser: null, loaded: true });
      }
    });
  }
  render() {
    return this.state.loaded ? (
      <div className="app">
        <FirebaseContextProvider value={{ isLoggedIn: this.state.loggedIn, currentUser: this.state.currentUser }}>
          <Header />
          <div className="content-wrapper">
            <BrowserRouter>
              <Switch>
                <Route
                  path="/login"
                  render={({ history }) => <Login history={history} loggedIn={this.state.loggedIn} />}
                />
                <Route path="/" exact render={() => <Dashboard loggedIn={this.state.loggedIn} />} />
              </Switch>
            </BrowserRouter>
          </div>
        </FirebaseContextProvider>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default App;
