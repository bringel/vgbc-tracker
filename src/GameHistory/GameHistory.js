//@flow
import * as React from 'react';
import { groupBy, flatMap } from 'lodash-es';

import GamePreview from '../GamePreview/GamePreview';
import type { GameOfTheMonthGame } from '../types/Game';

import './GameHistory.scss';

type Props = {
  games: Array<GameOfTheMonthGame>
};

type HistoryGroup = {
  year: number,
  games: Array<GameOfTheMonthGame>
};

function groupGames(games: Array<GameOfTheMonthGame>): Array<HistoryGroup> {
  const grouped = groupBy(games, g => g.activeYear);
  return flatMap(grouped, (value, key) => {
    return {
      year: key,
      games: value.sort((a, b) => b.activeMonth - a.activeMonth)
    };
  });
}

class GameHistory extends React.Component<Props> {
  render() {
    const groupedGames = groupGames(this.props.games).sort((a, b) => b.year - a.year);
    //$FlowFixMe
    return groupedGames.map(g => (
      <React.Fragment key={g.year}>
        <div className="group-header">{g.year}</div>
        <div className="previews-grid">
          {g.games.map(game => (
            <GamePreview key={game.giantBombID} game={game} />
          ))}
        </div>
      </React.Fragment>
    ));
  }
}

export default GameHistory;
