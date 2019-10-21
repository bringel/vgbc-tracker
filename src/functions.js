//@flow
import cheerio from 'cheerio';

import { type GameOfTheMonthDoc } from './types/Game';
import { type SearchResponseGame } from './types/GameSearchResponse';

export function responseToGameOfTheMonthDocument(
  apiResponse: SearchResponseGame,
  activeMonth: number,
  activeYear: number,
  currentGame: boolean = false
): GameOfTheMonthDoc {
  const platforms = apiResponse.platforms.map(p => {
    return {
      id: p.id,
      name: p.name
    };
  });

  const $ = cheerio.load(apiResponse.description);

  const descriptionText = $('h2')
    .first()
    .nextUntil('h2')
    .text();

  return {
    giantBombID: `${apiResponse.id}`,
    title: apiResponse.name,
    releaseDate: apiResponse.original_release_date
      ? apiResponse.original_release_date
      : new Date(
          apiResponse.expected_release_year,
          apiResponse.expected_release_month - 1,
          apiResponse.expected_release_day
        ).toISOString(),
    coverURL: apiResponse.image.original_url,
    current: currentGame,
    activeMonth: activeMonth,
    activeYear: activeYear,
    platforms: platforms,
    description: descriptionText,
    storeLinks: []
  };
}
