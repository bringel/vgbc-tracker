//@flow
export type Game = {
  giantBombID: string,
  title: string,
  releaseDate: string,
  description: string,
  coverURL: string,
  platforms: Array<{ id: number, name: string }>,
  storeLinks: Array<{ type: string, url: string }>
};

export const emptyGame: Game = {
  giantBombID: '',
  title: '',
  releaseDate: '0001-01-01',
  description: '',
  coverURL: '',
  platforms: [],
  storeLinks: []
};

export type GamePreview = {
  giantBombID: string,
  title: string,
  releaseDate: string,
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
  activeMonth: number,
  activeYear: number,
  current: boolean
};

export type GameOfTheMonthGame = Game & GameOfTheMonthProps;

export type GameOfTheMonthDoc = {
  giantBombID: string,
  title: string,
  releaseDate: string,
  description: string,
  coverURL: string,
  platforms: Array<{ id: number, name: string }>,
  current: boolean,
  activeMonth: number,
  activeYear: number
};
