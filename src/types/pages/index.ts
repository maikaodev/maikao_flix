import { DetailsProps } from "../components";

export type ResultsProps = {
  media_type: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  vote_average: number;
  id: number;
  release_date: string;
  video: boolean;
};

export type DataProps = {
  results: ResultsProps[];
  error?: boolean;
  message?: string;
  total_pages?: number;
};
export type CollectionsProps = {
  parts: ResultsProps[];
};

export type ResultTrailerProps = {
  name: string;
  key: string;
  empty?: boolean;
};
export type TrailerProps = {
  results: ResultTrailerProps[];
};
export type DetailsData = DetailsProps & {
  background_path: string;
  poster_path: string;
  name: string;
  first_air_date: string;
};
