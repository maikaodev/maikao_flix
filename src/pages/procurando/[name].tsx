// Functions - Native
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Functions - Utils
import { fetchData } from "@/utils/fetchData";

// Components
import { AlertMessage, Card, Loading } from "@/components";
import { Pagination } from "antd";

// CSS
import S from "../../styles/Home.module.css";
import styles from "../../styles/Search.module.css";

// .env
import { api_key, api_url_default } from "../index";

// TS
import { DataProps, TopMoviesData } from "../index";

export type WantedDataProps = DataProps & {
  total_pages: number;
};

const Search = ({ wantedData }: { wantedData: WantedDataProps }) => {
  // React
  const [searchedCategory, setSearchedCategory] = useState([
    {} as TopMoviesData,
  ]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>();

  // Router
  const router = useRouter();

  const checkData = (data: WantedDataProps) => {
    if (data.error) {
      setIsLoading(false);
      return setAlertMessage(data.message);
    }

    setSearchedCategory(data.results);
    setTotalPages(data.total_pages);

    setIsLoading(false);
  };

  useEffect(() => {
    checkData(wantedData);
  }, []);

  useEffect(() => {
    checkData(wantedData);
  }, [router.query.page]);

  return (
    <>
      <Head>
        <title>MaikãoFlix | Procurando </title>
        <meta name="description" content="Maikaoflix | Procurando" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isLoading && alertMessage && (
        <AlertMessage alertMessage={alertMessage} />
      )}
      {!alertMessage && (
        <section className={styles.content}>
          {isLoading && <Loading />}
          {!isLoading && searchedCategory && (
            <>
              <section className={S.section_card_list}>
                <div className={S.list}>
                  {searchedCategory && <Card dataCard={searchedCategory} />}
                </div>
              </section>
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <Pagination
                    simple
                    defaultCurrent={Number(router.query.page)}
                    current={Number(router.query.page)}
                    total={totalPages * 10}
                    // TODO: TS
                    onChange={(event) => {
                      //
                      setIsLoading(true);
                      router.push(`${router.query.name}?page=${event}`);
                    }}
                  />
                </div>
              )}
            </>
          )}
          {searchedCategory.length === 0 && (
            <>
              <div className={styles.nothingToSeeHere}>
                <h1>Filme não encontrado...</h1>
                <Link href="/">Voltar para página principal</Link>
              </div>
            </>
          )}
          {!isLoading && alertMessage && (
            <AlertMessage alertMessage={alertMessage} />
          )}
        </section>
      )}
    </>
  );
};

export async function getServerSideProps({
  query,
}: {
  query: { name: string; page: string };
}) {
  const url = `${api_url_default}search/multi?${api_key}&language=pt-BR&query=${query.name.toLocaleLowerCase()}&page=${
    query.page
  }&include_adult=false&region=BR`;
  const wantedData = await fetchData(url);

  return {
    props: { wantedData },
  };
}

export default Search;
