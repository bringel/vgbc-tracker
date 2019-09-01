//@flow
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { HeadProvider } from 'react-head';

import type { User } from './types/User.js';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import Dashboard from './Dashboard/Dashboard';
import FirebaseContext, { defaultContext } from './firebase-context';
import Header from './components/Header';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import ThemeContext, { type ThemeOption, type AccentColor } from './themeContext';
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
    currentUser: defaultContext.currentUser,
    loaded: true,
    theme: 'dark',
    accentColor: 'green'
  };

  componentDidMount() {
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.unsubscribeUserDoc = usersCollection()
          .doc(user.uid)
          .onSnapshot((snapshot) => {
            user.getIdToken(true);

            const currentUser: User = {
              userID: user.uid,
              ...snapshot.data()
            };

            this.setState({ loggedIn: true, currentUser: currentUser, loaded: true });
          });
      } else {
        this.setState({ loggedIn: false, currentUser: defaultContext.currentUser, loaded: true });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeUserDoc) {
      this.unsubscribeUserDoc();
    }
  }

  unsubscribeUserDoc = null;

  setTheme = (theme: *) => {
    this.setState({ theme: theme });
  };

  setAccentColor = (accentColor: *) => {
    this.setState({ accentColor: accentColor });
  };

  render() {
    return this.state.loaded ? (
      <HeadProvider>
        <ThemeContext.Provider
          value={{
            theme: this.state.theme,
            accentColor: this.state.accentColor,
            setTheme: this.setTheme,
            setAccentColor: this.setAccentColor
          }}>
          <BrowserRouter>
            <ThemeContext.Consumer>
              {(themeContext) => (
                <>
                  <div className={`app ${themeContext.theme} accent-${themeContext.accentColor}`}>
                    <FirebaseContext.Provider
                      value={{ isLoggedIn: this.state.loggedIn, currentUser: this.state.currentUser }}>
                      <Header />
                      <div className="content-wrapper">
                        <Switch>
                          <Route path="/login" render={({ history }) => <Login history={history} />} />
                          <Route path="/signup" render={(routeProps: *) => <SignUp {...routeProps} />} />
                          <AdminRoute
                            path="/admin"
                            render={(routeProps: *) => <AdminDashboard match={routeProps.match} />}
                          />
                          <Route path="/" exact render={() => <Dashboard />} />
                        </Switch>
                      </div>
                    </FirebaseContext.Provider>
                  </div>
                  <div id="modal-portal" className={`${themeContext.theme} accent-${themeContext.accentColor}`} />
                </>
              )}
            </ThemeContext.Consumer>
          </BrowserRouter>
        </ThemeContext.Provider>
      </HeadProvider>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default App;
