import Link from "next/link";

import S from "../../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <section className={S.notFound}>
      <h2>Página não encontrada</h2>
      <Link href="/">Voltar para página inicial</Link>
    </section>
  );
};

export default NotFound;
