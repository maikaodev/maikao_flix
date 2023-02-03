// Function - Native
import Image from "next/image";

// Icons
import { BsGraphUp } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { MdDescription } from "react-icons/md";
import { SlWallet } from "react-icons/sl";

// CSS
import S from "./Details.module.css";

// Functions - utils
import { convertMinutesToHours } from "@/utils/convertMinutesToHours";
import { formatCurrency } from "@/utils/formatCurrency";
import { releaseDate } from "@/utils/releaseDate";

// Components
import { api_image } from "../Card";

// TS
import { DetailsProps } from "@/types/components";

export const Details = ({
  background_img,
  budget,
  overview,
  revenue,
  runtime,
  title,
  release_date,
  genres,
}: DetailsProps) => {
  //

  return (
    <div className={S.content_details}>
      <Image
        src={`${api_image}${background_img}`}
        alt={title}
        height={400}
        width={300}
      />
      <section>
        {/* HEADER */}
        <div className={S.header_movie}>
          <h2>
            {title} ({releaseDate(new Date(release_date))})
          </h2>
          <ul className={S.genre_list}>
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
            {runtime > 0 && (
              <li className={S.runtime}>
                <CgSandClock />
                <span> {convertMinutesToHours(runtime)}</span>
              </li>
            )}
          </ul>
        </div>
        {/* HEADER */}

        {/* DESCRIPTION */}
        <ul className={S.details_list}>
          {budget > 0 && (
            <li className={S.item_details}>
              <div>
                <SlWallet />
                <strong>Orçamento :</strong>
              </div>
              <span>{formatCurrency(budget)}</span>
            </li>
          )}
          {revenue > 0 && (
            <li className={S.item_details}>
              <div>
                <BsGraphUp />
                <strong>Receita :</strong>
              </div>
              <span>{formatCurrency(revenue)}</span>
            </li>
          )}

          <li className={S.item_details}>
            <div>
              <MdDescription />
              <strong>Sinopse :</strong>
            </div>
            <p className={S.synopsis}>{overview || "Não tem sinopse... "}</p>
          </li>
        </ul>
        {/* DESCRIPTION */}
      </section>
    </div>
  );
};
