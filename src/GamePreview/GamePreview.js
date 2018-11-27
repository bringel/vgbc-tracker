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
        {format(activeDate, 'MMMM')}
        <div className="preview-info" />
      </div>
    );
  }
}

export default GamePreview;
