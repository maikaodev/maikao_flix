import Image from "next/image";
import S from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={S.loading}>
      <Image
        src="/assets/loading.gif"
        alt="Loading..."
        height={150}
        width={150}
      />
    </div>
  );
};
