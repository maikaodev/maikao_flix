// Icons
import { BsGraphUp } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { MdDescription } from "react-icons/md";
import { SlWallet } from "react-icons/sl";

import "./style.css";

const api_image = import.meta.env.VITE_API_IMG;

type DetailsProps = {
  background_img: string;
  budget: number;
  revenue: number;
  runTime: number;
  overView: string;
  title: string;
};

export const Details = ({
  background_img,
  budget,
  overView,
  revenue,
  runTime,
  title,
}: DetailsProps) => {
  console.log(`${api_image}${background_img}`);
  return (
    <div className="content details">
      <img
        id="img"
        src={`${api_image}${background_img}`}
        alt={title}
        height={450}
        width={300}
      />
      <ul>
        <li className="item_details">
          <div>
            <SlWallet />
            <strong>Orçamento:</strong>
          </div>
          <span>{budget}</span>
        </li>
        <li className="item_details">
          <div>
            <BsGraphUp />
            <strong>Receita:</strong>
          </div>
          <span>{revenue}</span>
        </li>
        <li className="item_details">
          <div>
            <CgSandClock />
            <strong>Duração:</strong>
          </div>
          <span> {runTime}</span>
        </li>
        <li className="item_details">
          <div>
            <MdDescription />
            <strong>Descrição:</strong>
          </div>
          <p>{overView}</p>
        </li>
      </ul>
    </div>
  );
};
