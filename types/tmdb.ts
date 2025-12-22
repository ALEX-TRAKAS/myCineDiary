export interface TMDBMovie {
  id: number;
  title: string;
  name?: string; 
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
  [key: string]: any; 
}
type MediaType = 'movie' | 'tv';

export interface TMDBMedia {
  id: number;
  media_type: MediaType;
  title?: string;
  name?: string;
  poster_path: string;
}
export interface TMDBMediaResponse {
  page: number;
  results: TMDBMedia[];
  total_pages: number;
  total_results: number;
}