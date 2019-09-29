//@flow
import './GameDetail.scss';

import format from 'date-fns/format';
import flatten from 'lodash-es/flatten';
import * as React from 'react';
import { Button } from 'reactstrap';
import microsoftIcon from 'simple-icons/icons/microsoft';
import nintendoIcon from 'simple-icons/icons/nintendo';
import playstationIcon from 'simple-icons/icons/playstation';
import steamIcon from 'simple-icons/icons/steam';

import GameCoverImage from '../components/GameCoverImage';
import Icon from '../components/Icon';
import type { Game } from '../types/Game';
import { platforms } from '../types/platforms';
import type { Store } from '../types/platforms';

type Props = {
  game: ?Game
};

function getAvailableStores(game: Game): Array<Store> {
  const platformStores = game.platforms.map(p => {
    switch (p.id) {
      case platforms.playstation3:
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
        return 'steam';
      default:
        return null;
    }
  });

  const stores = new Set(flatten(platformStores).filter(Boolean));

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
    default:
      return '';
  }
}

function getStoreIcon(store: Store) {
  switch (store) {
    case 'playstation':
      return playstationIcon;
    case 'microsoft':
      return microsoftIcon;
    case 'nintendo':
      return nintendoIcon;
    case 'steam':
      return steamIcon;
    default:
      return null;
  }
}

class GameDetail extends React.Component<Props> {
  render() {
    const game = this.props.game;
    if (game) {
      const releaseYear = format(game.releaseDate, 'YYYY');
      const platformNames = game.platforms.map(p => p.name);

      const storeSearchLinks = getAvailableStores(game).map(s => {
        return {
          type: s,
          link: makeStoreLink(s, game.title)
        };
      });

      return (
        <div className="game-detail">
          <GameCoverImage imageURL={game.coverURL} height={400} className="game-poster" />
          <div className="game-info">
            <div className="game-title">
              {game.title} ({releaseYear})
            </div>
            <div className="game-description">{game.description}</div>
            <div className="platforms">Available Platforms: {platformNames.join(', ')}</div>
            {storeSearchLinks.length > 0 ? (
              <div className="stores">
                Search for this game on these stores:
                <div className="store-links">
                  {storeSearchLinks.map(link => {
                    const storeIcon = getStoreIcon(link.type);
                    return (
                      <Button
                        key={link.type}
                        color="primary"
                        outline
                        tag="a"
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        <span className="store-name">
                          {storeIcon && <Icon path={storeIcon.path} size={18} className="store-icon" />}
                          {link.type.toUpperCase()}
                        </span>
                      </Button>
                    );
                  })}
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
