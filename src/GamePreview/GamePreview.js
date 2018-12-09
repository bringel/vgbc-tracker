//@flow
import * as React from 'react';
import format from 'date-fns/format';

import type { GameOfTheMonthGame } from '../types/Game';

import './GamePreview.scss';

type Props = {
  game: GameOfTheMonthGame
};

class GamePreview extends React.Component<Props> {
  render() {
    const { game } = this.props;
    const activeDate = new Date(game.activeYear, game.activeMonth - 1);
    return (
      <div className="game-preview">
        <div className="active-month">{format(activeDate, 'MMMM')}</div>
        <div className="preview-info">
          <div className="preview-cover">
            <img src={game.coverURL} />
          </div>
          <div className="game-title">{game.title}</div>
        </div>
      </div>
    );
  }
}

export default GamePreview;
