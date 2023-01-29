import { releaseDate } from "@/utils/releaseDate";
import Link from "next/link";

// CSS
import S from "./Carousel.module.css";

const api_image = process.env.NEXT_PUBLIC_API_IMG;

export type CarouselProps = {
  title: string;
  release_date: string;
  background_url: string;
  id_movie: number;
};

export const Carousel = ({ data = {} as CarouselProps }) => {
  return (
    <>
      <Link href={`detalhes/movie/${data.id_movie}`}>
        <div
          className={S.carousel}
          style={{ backgroundImage: `url(${api_image + data.background_url})` }}
        >
          <div className={S.carousel_content}>
            <span>
              {data.title +
                " (" +
                releaseDate(new Date(data.release_date)) +
                ")"}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};
