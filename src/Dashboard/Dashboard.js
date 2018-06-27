import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import format from 'date-fns/format';

import firebase from '../services/firebase';

import Header from '../components/Header';
import GameDetail from '../Game/GameDetail';

import './Dashboard.scss';

type Props = {
  loggedIn: boolean
};

class Dashboard extends Component<Props> {
  handleLogout = () => {
    firebase.auth().signOut();
  };

  getCurrentMonth() {
    return format(new Date(), 'MMMM YYYY');
  }
  render() {
    const user = firebase.auth().currentUser;
    return this.props.loggedIn ? (
      <div className="dashboard">
        <Header userName={user ? user.displayName : ''} onLogout={this.handleLogout} />
        <div className="content-wrapper">
          <h2>Game of the Month for {this.getCurrentMonth()}:</h2>
          <GameDetail />
        </div>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default Dashboard;
