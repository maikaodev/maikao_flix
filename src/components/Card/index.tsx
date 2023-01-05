import { AiFillStar } from "react-icons/ai";

import "./style.css";

export const Card = ({
  url_image,
  title,
  vote_average,
}: {
  url_image: string;
  title: string;
  vote_average: string;
}) => {
  //
  const api_image = import.meta.env.VITE_API_IMG;

  return (
    <>
      <li className="item_movie">
        <div className="bg">
          <img src={`${api_image}${url_image}`} alt={title} />
          <div className="content">
            <div className="vote_average">
              <AiFillStar id="star_icon" />
              {vote_average}
            </div>
            <span>{title}</span>
          </div>
          <a href="#">Detalhes</a>
        </div>
      </li>
    </>
  );
};
