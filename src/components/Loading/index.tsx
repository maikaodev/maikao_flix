import Image from "next/image";
import "./style.css";

export const Loading = () => {
  return (
    <div id="loading">
      <Image src="/assets/loading.gif" alt="Loading..." />
    </div>
  );
};
