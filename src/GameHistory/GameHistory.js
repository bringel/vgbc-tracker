//@flow
import * as React from 'react';
import { groupBy, flatMap } from 'lodash-es';

import type { GameOfTheMonthGame } from '../types/Game';

type Props = {
  games: Array<GameOfTheMonthGame>
};

type HistoryGroup = {
  year: number,
  games: Array<GameOfTheMonthGame>
};

function groupGames(games: Array<GameOfTheMonthGame>): Array<HistoryGroup> {
  const grouped = groupBy(games, (g) => g.activeYear);
  return flatMap(grouped, (value, key) => {
    return {
      year: key,
      games: value
    };
  });
}

class GameHistory extends React.Component<Props> {
  render() {
    const groupedGames = groupGames(this.props.games).sort((a, b) => b.year - a.year);
    return groupedGames.map((g) => <div key={g.year}>{g.year}</div>);
  }
}

export default GameHistory;
