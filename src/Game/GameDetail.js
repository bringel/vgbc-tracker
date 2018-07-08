//@flow
import * as React from 'react';
import format from 'date-fns/format';
import flatten from 'lodash-es/flatten';

import type { Game } from '../types/Game';
import { platforms } from '../types/platforms';
import type { Store } from '../types/platforms';
import StoreLink from './StoreLink';

import './GameDetail.scss';

type Props = {
  game: Game
};

function getAvailableStores(game: Game): Array<Store> {
  const platformStores = game.platforms.map((p) => {
    switch (p.id) {
      case platforms.playstation4:
        return 'playstation';
      case platforms.xboxOne:
        return 'microsoft';
      case platforms.nintendo3DS:
      case platforms.wiiU:
      case platforms.nintendoSwitch:
        return 'nintendo';
      case platforms.mac:
      case platforms.pc:
      case platforms.linux:
        return ['steam', 'gog'];
      default:
        return null;
    }
  });

  const stores = new Set(flatten(platformStores).filter((s) => s));

  return [...stores];
}

function makeStoreLink(type: Store, gameTitle: string) {
  switch (type) {
    case 'playstation':
      return `https://store.playstation.com/en-us/grid/search-game/1?query=${gameTitle}`;
    case 'microsoft':
      return `https://www.microsoft.com/en-us/store/search/games?q=${gameTitle}&devicetype=xbox`;
    case 'nintendo':
      return `https://www.nintendo.com/games/game-guide?pv=true%23filter/--------------featureddes${gameTitle}-#filter/-|-|-|-|-|-|-|-|-|-|-|-|-|-|featured|des|${gameTitle}|-`;
    case 'steam':
      return `https://store.steampowered.com/search/?term=${gameTitle}`;
    case 'gog':
      return `https://www.gog.com/games?sort=popularity&search=${gameTitle}`;
    default:
      return '';
  }
}

class GameDetail extends React.Component<Props> {
  render() {
    if (this.props.game) {
      const releaseYear = format(this.props.game.releaseDate, 'YYYY');
      const platformNames = this.props.game.platforms.map((p) => p.name);

      const storeSearchLinks = getAvailableStores(this.props.game).map((s) => {
        return {
          type: s,
          link: makeStoreLink(s, this.props.game.title)
        };
      });

      return (
        <div className="game-detail">
          <img className="game-poster" src={this.props.game.coverURL} alt="current game poster" />
          <div className="game-info">
            <div className="game-title">
              {this.props.game.title} ({releaseYear})
            </div>
            <div className="game-description">{this.props.game.description}</div>
            <div className="platforms">Available Platforms: {platformNames.join(', ')}</div>
            {storeSearchLinks.length > 0 ? (
              <div className="stores">
                Search for this game on these stores:
                <div className="store-links">
                  {storeSearchLinks.map((link) => <StoreLink key={link.type} type={link.type} linkURL={link.link} />)}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default GameDetail;
