import { releaseDate } from "@/utils/releaseDate";
import "./style.css";

const api_image = import.meta.env.VITE_API_IMG;

export type CarouselProps = {
  title: string;
  release_date: string;
  background_url: string;
};

export const Carousel = ({ data = {} as CarouselProps }) => {
  return (
    <>
      <div
        id="carousel"
        style={{ backgroundImage: `url(${api_image + data.background_url})` }}
      >
        <div id="carousel_content">
          <h3>
            {data.title + " (" + releaseDate(new Date(data.release_date)) + ")"}
          </h3>
        </div>
      </div>
    </>
  );
};
