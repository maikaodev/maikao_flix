// Functions - Native
import { Link } from "react-router-dom";

// CSS
import "./style.css";

// Icons
import { AiFillWarning } from "react-icons/ai";

export const AlertMessage = ({ alertMessage }: { alertMessage: string }) => {
  return (
    <>
      <div id="alert">
        <div>
          <AiFillWarning />
          <span>{alertMessage}</span>
        </div>
        <Link to="/">Página Inicial</Link>
      </div>
    </>
  );
};
