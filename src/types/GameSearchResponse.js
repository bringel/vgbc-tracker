//@flow

export type SearchResponseGame = {
  deck: string,
  description: string,
  id: number,
  image: {
    icon_url: string,
    medium_url: string,
    screen_url: string,
    screen_large_url: string,
    small_url: string,
    super_url: string,
    thumb_url: string,
    tiny_url: string,
    original_url: string
  },
  name: string,
  original_release_date: string, // ISO date
  platforms: Array<{
    api_detail_url: string,
    id: number,
    name: string,
    site_detail_url: string,
    abbreviation: string
  }>,
  site_detail_url: string,
  resource_type: string,
  expected_release_day: number,
  expected_release_month: number,
  expected_release_year: number
};

export type GameSearchResponse = {
  currentPage: number,
  totalPages: number,
  results: Array<SearchResponseGame>
};
