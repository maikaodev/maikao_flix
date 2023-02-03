// Functions - Native
import Link from "next/link";

// Functions - Utils
import { releaseDate } from "@/utils/releaseDate";

// CSS
import S from "./Carousel.module.css";

// .env
import { api_image } from "../Card";

// TS
import { CarouselProps } from "@/types/components";

export const Carousel = ({ data = {} as CarouselProps }) => {
  return (
    <>
      <Link href={`detalhes/movie?id=${data.id_movie}`}>
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
