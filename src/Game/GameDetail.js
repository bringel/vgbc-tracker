import * as React from 'react';

import './GameDetail.scss';

class GameDetail extends React.Component<{}> {
  render() {
    return (
      <div className="game-detail">
        <img className="game-poster" src="https://placeimg.com/200/350/animals" alt="current game poster" />
        <div className="game-info">
          <div className="game-title">Shovel Knight (2014)</div>
          <div className="game-description">
            An action-platformer paying homage to 8-bit classics like Mega Man and Castlevania. It is developed by a
            small group of former WayForward employees, with funding through Kickstarter.
          </div>
          <div className="platforms">
            Available Platforms: PC, Mac, Wii U, 3DS, Linux, PS4, PS Vita, PS3, Xbox One, Nintendo Switch
          </div>
          <div className="stores">
            Where to buy:
            <div className="store-links">
              <div className="store">Steam</div>
              <div className="store">Nintendo</div>
              <div className="store">Playstation</div>
              <div className="store">Microsoft</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameDetail;
