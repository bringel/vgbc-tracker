//@flow
import './Dashboard.scss';

import { compareDesc, format, isAfter, isSameDay } from 'date-fns';
import React, { Component } from 'react';

import GameDetail from '../Game/GameDetail';
import GameHistory from '../GameHistory/GameHistory';
import { gamesCollection } from '../services/firebase';
import { AccentColorUpdate } from '../themeContext';
import type { GameOfTheMonthGame } from '../types/Game';

type Props = {};

type State = {
  currentGame: ?GameOfTheMonthGame,
  gamesHistory: Array<GameOfTheMonthGame>
};

class Dashboard extends Component<Props, State> {
  state = {
    currentGame: null,
    gamesHistory: []
  };
  componentDidMount() {
    gamesCollection()
      .get()
      .then(querySnapshot => {
        // const currentDoc = querySnapshot.docs.find(g => {
        //   return ((g.data(): any): GameOfTheMonthGame).current;
        // });
        // const gamesHistoryDocs = querySnapshot.docs.filter(g => {
        //   return !((g.data(): any): GameOfTheMonthGame).current;
        // });

        // if (!currentDoc) {
        //   return;
        // }

        // const current = ((currentDoc.data(): any): GameOfTheMonthGame);
        // const gamesHistory = gamesHistoryDocs.map(d => ((d.data(): any): GameOfTheMonthGame));

        // this.setState({ currentGame: current, gamesHistory: gamesHistory });
        const today = new Date();
        const documentData: Array<GameOfTheMonthGame> = querySnapshot.docs.map(d => d.data());
        documentData.sort((a, b) => {
          const aDate = new Date(a.activeYear, a.activeMonth - 1);
          const bDate = new Date(b.activeYear, b.activeMonth - 1);
          return compareDesc(aDate, bDate);
        });

        const current = documentData.find(doc => {
          const d = new Date(doc.activeYear, doc.activeMonth - 1);
          return !isAfter(d, today) || isSameDay(d, today);
        });
        const history = current ? documentData.filter(d => d.giantBombID !== current.giantBombID) : documentData;

        this.setState({ currentGame: current, gamesHistory: history });
      });
  }

  getCurrentMonth() {
    if (this.state.currentGame) {
      const activeDate = new Date(this.state.currentGame.activeYear, this.state.currentGame.activeMonth - 1);
      return format(activeDate, 'MMMM yyyy');
    }
  }
  render() {
    return (
      <>
        <AccentColorUpdate accentColor="green" />
        <h2>Game of the Month for {this.getCurrentMonth()}:</h2>
        <GameDetail game={this.state.currentGame} />
        <GameHistory games={this.state.gamesHistory} />
      </>
    );
  }
}

export default Dashboard;
