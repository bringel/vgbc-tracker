import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import firebase from '../services/firebase';

import Header from '../components/Header';

import './Dashboard.scss';

type Props = {
  loggedIn: boolean
};

class Dashboard extends Component<Props> {
  render() {
    const user = firebase.auth().currentUser;
    return this.props.loggedIn ? (
      <div className="dashboard">
        <Header userName={user ? user.displayName : ''} />
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default Dashboard;
