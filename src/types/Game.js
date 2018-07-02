//@flow
export type Game = {
  giantBombID: string,
  title: string,
  releaseDate: Date,
  description: string,
  coverURL: string,
  platforms: Array<{ id: number, name: string }>,
  storeLinks: Array<{ type: string, url: string }>
};

export const emptyGame: Game = {
  giantBombID: '',
  title: '',
  releaseDate: new Date('0001-01-01'),
  description: '',
  coverURL: '',
  platforms: [],
  storeLinks: []
};

export type GamePreview = {
  giantBombID: string,
  title: string,
  releaseDate: Date,
  coverURL: string
};

export function toGamePreview(game: Game): GamePreview {
  const { giantBombID, title, releaseDate, coverURL } = game;
  return {
    giantBombID,
    title,
    releaseDate,
    coverURL
  };
}

type GameOfTheMonthProps = {
  activeMonth: Date,
  current: boolean
};

export type GameOfTheMonthGame = Game & GameOfTheMonthProps;
