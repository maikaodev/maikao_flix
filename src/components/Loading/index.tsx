import Image from "next/image";
import S from "./Loading.module.css";

import LoadingImg from "../../../public/assets/loading.gif";

export const Loading = () => {
  return (
    <div className={S.loading}>
      <Image src={LoadingImg} alt="Loading..." height={150} width={150} />
    </div>
  );
};
