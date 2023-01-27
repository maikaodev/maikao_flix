// Functions - Native
import Link from "next/link";

// CSS
import "./style.css";

// Icons
import { AiFillWarning } from "react-icons/ai";

export const AlertMessage = ({
  alertMessage,
  backTo,
}: {
  alertMessage: string;
  backTo?: string;
}) => {
  return (
    <>
      <div id="alert">
        <div>
          <AiFillWarning />
          <span>{alertMessage}</span>
        </div>
        <Link href="/">{backTo || "Página Inicial"}</Link>
      </div>
    </>
  );
};
