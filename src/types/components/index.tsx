export type CarouselProps = {
  title: string;
  release_date: string;
  background_url: string;
  id_movie: number;
};

export type DetailsProps = {
  background_img: string;
  budget: number;
  revenue: number;
  runtime: number;
  overview: string;
  title: string;
  release_date: string;
  genres: [{ name: string }];
};
