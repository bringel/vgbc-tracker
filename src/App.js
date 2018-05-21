import React, { Component } from 'react';

import Login from './Login/Login';

import './App.scss';

class App extends Component<{}> {
  render() {
    return (
      <div className="app">
        <Login />
      </div>
    );
  }
}

export default App;
