import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { fetchData } from "@/utils/fetchData";

import { AlertMessage, Card, Loading } from "@/components";
import { Pagination } from "antd";

import S from "../../styles/Home.module.css";
import styles from "../../styles/Search.module.css";

import { api_key, api_url_default } from "../index";

import { DataProps as WantedDataProps, ResultsProps } from "@/types/pages";

const Search = ({ wantedData }: { wantedData: WantedDataProps }) => {
  const [searchedCategory, setSearchedCategory] = useState([
    {} as ResultsProps,
  ]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>();

  const router = useRouter();

  const checkData = (data: WantedDataProps) => {
    if (data.error) {
      setIsLoading(false);
      return setAlertMessage(data.message);
    }

    setSearchedCategory(data.results);
    setTotalPages(data.total_pages!);

    setIsLoading(false);
  };

  useEffect(() => {
    checkData(wantedData);
  }, []);

  useEffect(() => {
    checkData(wantedData);
  }, [router.query.page, router.query.name]);

  return (
    <>
      <Head>
        <title>MaikãoFlix | Procurando </title>
        <meta name="description" content="Maikaoflix | Procurando" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && <Loading />}

      {!isLoading && alertMessage && (
        <AlertMessage alertMessage={alertMessage} />
      )}
      {!isLoading && searchedCategory.length === 0 && (
        <AlertMessage
          alertMessage="Filme não encontrado..."
          isAReqNotFound={true}
        />
      )}
      {!isLoading && searchedCategory.length > 0 && (
        <section className={styles.content}>
          <section className={S.section_card_list}>
            <div className={S.list} data-testid="card">
              {searchedCategory && <Card dataCard={searchedCategory} />}
            </div>
          </section>
          {totalPages > 1 && (
            <div className={styles.pagination} data-testid="content_pagination">
              <Pagination
                data-testid="pagination"
                simple
                defaultCurrent={Number(router.query.page)}
                current={Number(router.query.page)}
                total={totalPages * 10}
                onChange={(event) => {
                  setIsLoading(true);
                  router.push(`${router.query.name}?page=${event}`);
                }}
              />
            </div>
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
