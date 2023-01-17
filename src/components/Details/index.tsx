// Icons
import { BsGraphUp } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { MdDescription } from "react-icons/md";
import { SlWallet } from "react-icons/sl";

// CSS
import "./style.css";

// Functions - utils
import { convertMinutesToHours } from "@/utils/convertMinutesToHours";
import { formatCurrency } from "@/utils/formatCurrency";
import { releaseData } from "@/utils/releaseData";

const api_image = import.meta.env.VITE_API_IMG;

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
            {title} ({releaseData(new Date(release_date))})
          </h2>
          <ul id="genre_list">
            <>
              {genres &&
                genres.map((genre) => {
                  return (
                    <>
                      <li key={genre.name}>{genre.name}</li>
                      {genres.length > 1 && <span>-</span>}
                    </>
                  );
                })}
            </>
            {runTime > 0 && (
              <li id="runtime">
                <CgSandClock />
                <span> {convertMinutesToHours(runTime)}</span>
              </li>
            )}
          </ul>
        </div>
        {/* HEADER */}

        {/* DESCRIPTION */}
        <ul id="details_list">
          {budget > 0 && (
            <li className="item_details">
              <div>
                <SlWallet />
                <strong>Orçamento :</strong>
              </div>
              <span>{formatCurrency(budget)}</span>
            </li>
          )}
          {revenue > 0 && (
            <li className="item_details">
              <div>
                <BsGraphUp />
                <strong>Receita :</strong>
              </div>
              <span>{formatCurrency(revenue)}</span>
            </li>
          )}

          <li className="item_details">
            <div>
              <MdDescription />
              <strong>Sinopse :</strong>
            </div>
            <p id="synopsis">{overView || "Não tem sinopse... "}</p>
          </li>
        </ul>
        {/* DESCRIPTION */}
      </section>
    </div>
  );
};
