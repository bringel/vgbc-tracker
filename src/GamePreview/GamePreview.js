//@flow
import * as React from 'react';
import format from 'date-fns/format';

import type { GameOfTheMonthGame } from '../types/Game';

type Props = {
  game: GameOfTheMonthGame
};

class GamePreview extends React.Component<Props> {
  render() {
    const { game } = this.props;
    const activeDate = new Date(game.activeYear, game.activeMonth - 1);
    return <div>{format(activeDate, 'MMMM')}</div>;
  }
}

export default GamePreview;
