// Icons
import { BsGraphUp } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { MdDescription } from "react-icons/md";
import { SlWallet } from "react-icons/sl";

import "./style.css";

const api_image = import.meta.env.VITE_API_IMG;

type genres = {};

type DetailsProps = {
  background_img: string;
  budget: number;
  revenue: number;
  runTime: number;
  overView: string;
  title: string;
  release_date: string;
  genres: [{ name: string }];
};

export const Details = ({
  background_img,
  budget,
  overView,
  revenue,
  runTime,
  title,
  release_date,
  genres,
}: DetailsProps) => {
  //
  const formatCurrency = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

  const releaseData = (date: any) => {
    const convertDate = new Date(date).getFullYear();

    return convertDate;
  };

  const converterMinutesInHoures = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    const textHours = `${hours}hr`;
    const textMinutes = `${min}min`;

    return `${textHours} ${textMinutes}`;
  };

  console.log();

  console.log("[GENRES]===> ", genres);

  return (
    <div className="content_details">
      <img
        id="img"
        src={`${api_image}${background_img}`}
        alt={title}
        height={400}
        width={300}
      />
      <section>
        {/* HEADER */}
        <div id="header_movie">
          <h2>
            {title} ({releaseData(release_date)})
          </h2>
          <ul id="genre_list">
            <>
              {genres &&
                genres.map((genre) => {
                  return (
                    <>
                      <li key={genre.name}>{genre.name}</li>
                      <span>-</span>
                    </>
                  );
                })}
            </>

            <div id="runtime">
              <CgSandClock />
              <span> {converterMinutesInHoures(runTime)}</span>
            </div>
          </ul>
        </div>
        {/* HEADER */}

        {/* DESCRIPTION */}
        <ul id="details_list">
          <li className="item_details">
            <div>
              <SlWallet />
              <strong>Orçamento :</strong>
            </div>
            <span>{formatCurrency(budget)}</span>
          </li>
          <li className="item_details">
            <div>
              <BsGraphUp />
              <strong>Receita :</strong>
            </div>
            <span>{formatCurrency(revenue)}</span>
          </li>
          <li className="item_details">
            <div>
              <MdDescription />
              <strong>Sinopse :</strong>
            </div>
            <p id="synopsis">{overView}</p>
          </li>
        </ul>
        {/* DESCRIPTION */}
      </section>
    </div>
  );
};
