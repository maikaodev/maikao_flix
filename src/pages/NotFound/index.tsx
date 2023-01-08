import { Link } from "react-router-dom";

import "./style.css";

const NotFound = () => {
  return (
    <section id="notFound">
      <h2>Página não encontrada</h2>
      <Link to="/">Voltar para página inicial</Link>
    </section>
  );
};

export default NotFound;
