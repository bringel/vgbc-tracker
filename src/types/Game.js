//@flow
export type Game = {
  id: string,
  giantBombID: string,
  title: string,
  releaseDate: Date,
  description: string,
  coverURL: string,
  platforms: Array<{ id: number, name: string }>,
  storeLinks: Array<{ type: string, url: string }>
};

export type GamePreview = {
  id: string,
  giantBombID: string,
  title: string,
  releaseDate: Date,
  coverURL: string
};

export function toGamePreview(game: Game): GamePreview {
  const { id, giantBombID, title, releaseDate, coverURL } = game;
  return {
    id,
    giantBombID,
    title,
    releaseDate,
    coverURL
  };
}
