//@flow
import flatten from 'lodash-es/flatten';
import type { Game } from '../types/Game';
import { platforms } from '../types/platforms';

export function getPlatformIcons(game: Game): Array<string> {
  const platformStores = game.platforms.map((p) => {
    switch (p.id) {
      case platforms.playstation4:
        return 'playstation';
      case platforms.xboxOne:
        return 'windows';
      case platforms.nintendo3DS:
      case platforms.wiiU:
      case platforms.nintendoSwitch:
        return 'nintendo-switch';
      case platforms.pc:
        return ['steam', 'windows'];
      case platforms.mac:
      case platforms.linux:
        return 'steam';
      default:
        return null;
    }
  });

  const stores = new Set(flatten(platformStores).filter((s) => s));

  return [...stores];
}
