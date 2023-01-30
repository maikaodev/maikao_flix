// Functions - Native
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Functions - Utils
import { fetchData } from "@/utils/fetchData";

// Components
import { AlertMessage, Card, Loading } from "@/components";
import { Pagination } from "antd";

// CSS
import styles from "../../styles/Search.module.css";

// .env
export const api_url_default = process.env.API_URL_DEFAULT;
export const api_key = process.env.API_KEY;

// TS
import { DataProps, TopMoviesData } from "../index";

type WantedDataProps = DataProps & {
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

  return (
    <main>
      {!isLoading && alertMessage && (
        <AlertMessage alertMessage={alertMessage} />
      )}
      {!alertMessage && (
        <section className={styles.content}>
          {isLoading && <Loading />}
          {!isLoading && searchedCategory && (
            <>
              <section className={styles.searchedCategory}>
                <>{searchedCategory && <Card dataCard={searchedCategory} />}</>
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
                      router.push({
                        query: { page: event.toString() },
                      });
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
    </main>
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
