import * as React from 'react';
import format from 'date-fns/format';

import type { Game } from '../types/Game';
import './GameDetail.scss';

type Props = {
  game: Game
};

class GameDetail extends React.Component<Props> {
  render() {
    const releaseYear = format(this.props.game.releaseDate, 'YYYY');
    const platformNames = this.props.game.platforms.map((p) => p.name);
    return (
      <div className="game-detail">
        <img className="game-poster" src={this.props.game.coverURL} alt="current game poster" />
        <div className="game-info">
          <div className="game-title">
            {this.props.game.title} ({releaseYear})
          </div>
          <div className="game-description">{this.props.game.description}</div>
          <div className="platforms">Available Platforms: {platformNames.join(', ')}</div>
          {this.props.game.storeLinks.length > 0 ? (
            <div className="stores">
              Where to buy:
              <div className="store-links">
                <div className="store">Steam</div>
                <div className="store">Nintendo</div>
                <div className="store">Playstation</div>
                <div className="store">Microsoft</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default GameDetail;
