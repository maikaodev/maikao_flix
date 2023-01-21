import { releaseDate } from "@/utils/releaseDate";
import { Link } from "react-router-dom";
import "./style.css";

const api_image = import.meta.env.VITE_API_IMG;

export type CarouselProps = {
  title: string;
  release_date: string;
  background_url: string;
  id_movie: number;
};

export const Carousel = ({ data = {} as CarouselProps }) => {
  return (
    <>
      <Link id="link" to={`detalhes/movie/${data.id_movie}`}>
        <div
          id="carousel"
          style={{ backgroundImage: `url(${api_image + data.background_url})` }}
        >
          <div id="carousel_content">
            <h4>
              {data.title +
                " (" +
                releaseDate(new Date(data.release_date)) +
                ")"}
            </h4>
          </div>
        </div>
      </Link>
    </>
  );
};
