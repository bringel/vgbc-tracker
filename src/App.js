//@flow
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from './services/firebase';

import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

import './App.scss';

type State = {
  loggedIn: boolean
};

class App extends Component<{}, State> {
  state = {
    loggedIn: true
  };

  componentDidMount() {
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route path="/login" render={({ history }) => <Login loggedIn={this.state.loggedIn} history={history} />} />
            <Route path="/" exact render={() => <Dashboard loggedIn={this.state.loggedIn} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
