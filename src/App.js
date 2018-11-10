//@flow
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';

import ThemeContext, { type ThemeOption, type AccentColor } from './themeContext';
import FirebaseContext from './firebase-context';
import type { User } from './types/User.js';
import Dashboard from './Dashboard/Dashboard';
import Header from './components/Header';
import Login from './Login/Login';
import firebase, { usersCollection } from './services/firebase';

import './App.scss';

type State = {
  loggedIn: boolean,
  currentUser: User,
  loaded: boolean,
  theme: ThemeOption,
  accentColor: AccentColor
};

class App extends Component<{}, State> {
  state = {
    loggedIn: false,
    currentUser: null,
    loaded: true,
    theme: 'dark',
    accentColor: 'green'
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

  setTheme = (theme: *) => {
    this.setState({ theme: theme });
  };

  setAccentColor = (accentColor: *) => {
    this.setState({ accentColor: accentColor });
  };

  render() {
    return this.state.loaded ? (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          accentColor: this.state.accentColor,
          setTheme: this.setTheme,
          setAccentColor: this.setAccentColor
        }}>
        <ThemeContext.Consumer>
          {(themeContext) => (
            <div className={`app ${themeContext.theme} accent-${themeContext.accentColor}`}>
              <FirebaseContext.Provider
                value={{ isLoggedIn: this.state.loggedIn, currentUser: this.state.currentUser }}>
                <Header />
                <div className="content-wrapper">
                  <BrowserRouter>
                    <Switch>
                      <Route path="/login" render={({ history }) => <Login history={history} />} />
                      <Route path="/" exact render={() => <Dashboard />} />
                    </Switch>
                  </BrowserRouter>
                </div>
              </FirebaseContext.Provider>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeContext.Provider>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default App;
