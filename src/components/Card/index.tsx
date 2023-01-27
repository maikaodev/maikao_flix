import "./style.css";

const api_image = process.env.VITE_API_IMG;

// TS
import { TopMoviesData } from "@/pages";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";

export const Card = ({ dataCard = [{} as TopMoviesData] }) => {
  //

  return (
    <>
      {dataCard && (
        <>
          {dataCard.map((data) => {
            {
              if (data.backdrop_path && data.poster_path !== null) {
                return (
                  <li
                    key={data.id}
                    className="card_list_item"
                    style={{
                      backgroundImage: `url(${
                        api_image + data.backdrop_path || data.poster_path
                      })`,
                    }}
                  >
                    <div id="description_card">
                      {data.vote_average && (
                        <div className="vote_average">
                          <AiFillStar id="star_icon" />
                          <span>{data.vote_average.toFixed(1)}</span>
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/detalhes/${!data.video ? "movie" : "tv"}/${
                            data.id
                          }`}
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
    </>
  );
};
{
}
