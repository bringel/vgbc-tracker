//@flow
export type GameSuggestion = {
  giantBombID: number,
  displayName: string,
  coverURL: string,
  giantBombLink: string,
  user: {
    userID: string,
    userName: string
  },
  releaseDate: string
};
