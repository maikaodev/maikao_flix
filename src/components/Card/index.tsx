import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

import "./style.css";

const api_image = import.meta.env.VITE_API_IMG;

export const Card = ({
  url_image,
  title,
  vote_average,
  id_movie,
  search_topic,
}: {
  url_image: string;
  title: string;
  vote_average: number;
  id_movie: number;
  search_topic: string;
}) => {
  //

  return (
    <>
      <li className="item_movie">
        <div className="card">
          <div id="background">
            <img
              src={`${api_image}${url_image}`}
              alt={title}
              width={150}
              height={200}
            />

            <div className="vote_average">
              <AiFillStar id="star_icon" />
              <span>{vote_average}</span>
            </div>
          </div>

          <Link to={`/${search_topic}/${id_movie}`}>{title}</Link>
        </div>
      </li>
    </>
  );
};
