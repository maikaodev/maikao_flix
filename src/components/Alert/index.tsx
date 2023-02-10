// Functions - Native
import { useRouter } from "next/router";

// CSS
import S from "./Alert.module.css";

// Icons
import { AiFillWarning } from "react-icons/ai";

export const AlertMessage = ({
  alertMessage,
  backTo,
  isAReqNotFound = false,
}: {
  alertMessage: string;
  backTo?: string;
  isAReqNotFound?: boolean;
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
      <div className={S.alert} data-testid="alert">
        <div>
          {!isAReqNotFound && <AiFillWarning data-testid="alert_icon" />}
          <span data-testid="alert_message">{alertMessage}</span>
        </div>
        <button onClick={checkTheRoute} data-testid="alert_button">
          {backTo || "Página Inicial"}
        </button>
      </div>
    </>
  );
};
