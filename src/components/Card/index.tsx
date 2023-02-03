// Functions - Native
import Link from "next/link";

// CSS
import S from "./Card.module.css";

// Icons
import { AiFillStar } from "react-icons/ai";

// .env
export const api_image =
  process.env.NEXT_PUBLIC_API_IMG || process.env.NEXT_PUBLIC_PRODUCTION_API_IMG;

// TS
import { ResultsProps as CardProps } from "@/types/pages";

export const Card = ({ dataCard = [{} as CardProps] }) => {
  //

  return (
    <ul className={S.card_list}>
      {dataCard && (
        <>
          {dataCard.map((data) => {
            {
              if (data.backdrop_path && data.poster_path !== null) {
                return (
                  <li
                    key={data.id}
                    className={S.card_list_item}
                    style={{
                      backgroundImage: `url(${
                        api_image + data.backdrop_path || data.poster_path
                      })`,
                    }}
                  >
                    <div className={S.description_card}>
                      {data.vote_average && (
                        <div className={S.vote_average}>
                          <AiFillStar className={S.star_icon} />
                          <span>{data.vote_average.toFixed(1)}</span>
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/detalhes/${
                            data?.video === false ? "movie" : "tv"
                          }?id=${data.id}`}
                        >
                          {data.title || data.name}
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              }
            }
          })}
        </>
      )}
    </ul>
  );
};
{
}
