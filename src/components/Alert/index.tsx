// Functions - Native
import { useRouter } from "next/router";

// CSS
import S from "./Alert.module.css";

// Icons
import { AiFillWarning } from "react-icons/ai";

export const AlertMessage = ({
  alertMessage,
  backTo,
}: {
  alertMessage: string;
  backTo?: string;
}) => {
  const router = useRouter();

  const checkTheRoute = () => {
    if (router.asPath === "/") {
      router.reload();
    } else {
      router.replace("/");
    }
  };
  return (
    <>
      <div className={S.alert}>
        <div>
          <AiFillWarning />
          <span>{alertMessage}</span>
        </div>
        <button onClick={checkTheRoute}>{backTo || "Página Inicial"}</button>
      </div>
    </>
  );
};
