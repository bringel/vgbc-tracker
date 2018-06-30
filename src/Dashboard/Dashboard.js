import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import format from 'date-fns/format';

import type { Game } from '../types/Game';

import firebase from '../services/firebase';

import Header from '../components/Header';
import GameDetail from '../Game/GameDetail';

import './Dashboard.scss';

type Props = {
  loggedIn: boolean
};

const currentGame: Game = {
  id: '34234',
  giantBombID: '48412',
  title: 'Hollow Knight',
  releaseDate: new Date('2017-02-24 00:00:00'),
  description: 'A 2D exploration action adventure, developed by Team Cherry.',
  coverURL: 'https://www.giantbomb.com/api/image/original/2710030-hk.jpg',
  platforms: [
    {
      id: 17,
      name: 'Mac'
    },
    {
      id: 94,
      name: 'PC'
    },
    {
      id: 152,
      name: 'Linux'
    },
    {
      id: 157,
      name: 'Nintendo Switch'
    }
  ],
  storeLinks: []
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
          <GameDetail game={currentGame} />
        </div>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default Dashboard;
