import Link from "next/link";

import { releaseDate } from "@/utils/releaseDate";

import S from "./Carousel.module.css";

import { api_image } from "../Card";

import { CarouselProps } from "@/types/components";

export const Carousel = ({ data = {} as CarouselProps }) => {
  return (
    <>
      <Link
        data-testid="carousel-link"
        href={`detalhes/movie?id=${data.id_movie}`}
      >
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
