import Link from "next/link";

import S from "@/styles/404.module.css";

const NotFound = () => {
  return (
    <section className={S.notFound}>
      <h2>Página não encontrada</h2>
      <Link href="/">Voltar para página inicial</Link>
    </section>
  );
};

export default NotFound;
