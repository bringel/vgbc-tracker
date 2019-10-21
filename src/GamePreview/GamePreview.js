//@flow
import './GamePreview.scss';

import { format } from 'date-fns';
import * as React from 'react';
import appleIcon from 'simple-icons/icons/apple';
import linuxIcon from 'simple-icons/icons/linux';
import nintendo64Icon from 'simple-icons/icons/nintendo';
import gamecubeIcon from 'simple-icons/icons/nintendogamecube';
import switchIcon from 'simple-icons/icons/nintendoswitch';
import playstation3Icon from 'simple-icons/icons/playstation3';
import playstation4Icon from 'simple-icons/icons/playstation4';
import wiiIcon from 'simple-icons/icons/wii';
import wiiUIcon from 'simple-icons/icons/wiiu';
import pcIcon from 'simple-icons/icons/windows';
import xboxIcon from 'simple-icons/icons/xbox';

import GameCoverImage from '../components/GameCoverImage';
import Icon from '../components/Icon';
import type { GameOfTheMonthGame } from '../types/Game';
import { platforms } from '../types/platforms';

function getPlatformIcons(game: GameOfTheMonthGame) {
  return game.platforms
    .map(platform => {
      switch (platform.id) {
        case platforms.mac:
          return appleIcon;
        case platforms.gamecube:
          return gamecubeIcon;
        case platforms.playstation3:
          return playstation3Icon;
        case platforms.wii:
          return wiiIcon;
        case platforms.nintendo64:
          return nintendo64Icon;
        case platforms.pc:
          return pcIcon;
        case platforms.nintendo3DS:
          return null; //need an icon here
        case platforms.wiiU:
          return wiiUIcon;
        case platforms.xboxOne:
          return xboxIcon;
        case platforms.playstation4:
          return playstation4Icon;
        case platforms.linux:
          return linuxIcon;
        case platforms.nintendoSwitch:
          return switchIcon;
        default:
          return null;
      }
    })
    .filter(Boolean);
}

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
          <GameCoverImage imageURL={game.coverURL} height={300} className="preview-cover" />
          <div>
            <div className="game-title">{game.title}</div>
            <div>Available On</div>
            <div className="icons-container">
              {getPlatformIcons(game).map(icon => (
                <span className="icon" key={icon.slug}>
                  <Icon path={icon.path} size={24} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GamePreview;
