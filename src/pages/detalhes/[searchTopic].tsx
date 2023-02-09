// Functions - Native
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Functions - utils
import { fetchData } from "@/utils/fetchData";

// Component
import {
  AlertMessage,
  BtnGoToTop,
  Card,
  Details,
  Loading,
} from "../../components";

// CSS
import S from "../../styles/About.module.css";

// .env
import { api_key, api_url_default } from "../index";

// TS
import {
  CollectionsProps,
  DataProps,
  DetailsData,
  ResultsProps,
  ResultTrailerProps,
  TrailerProps,
} from "@/types/pages";

export type AboutProps = DataProps &
  DetailsData & {
    belongs_to_collection?: { id: number };
  };

const About = ({
  dataDetails,
  dataTrailer,
  dataRecommendations,
  dataCollections,
}: {
  dataDetails: AboutProps;
  dataTrailer: TrailerProps;
  dataRecommendations: DataProps;
  dataCollections: CollectionsProps;
}) => {
  //
  const [details, setDetails] = useState<DetailsData>();
  const [recommendations, setRecommendations] = useState<
    ResultsProps[] | null
  >();
  const [collections, setCollections] = useState<ResultsProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trailerData, setTrailerData] = useState<ResultTrailerProps | null>();
  const [showIt, setShowIt] = useState<string>("");
  const [reqNotFound, setReqNotFound] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>();

  // Router
  const router = useRouter();

  const getDetailsMovies = async (
    data: AboutProps,
    dataTrailer: TrailerProps,
    dataRecommendations: DataProps,
    dataCollections: CollectionsProps
  ) => {
    //

    if (data?.error) {
      setIsLoading(false);

      return setAlertMessage(data.message);
    }

    if (data === undefined) {
      setReqNotFound(true);
    }

    if (data) {
      setDetails(data);

      if (showIt) {
        setShowIt("");
      }

      // Trailer
      if (dataTrailer?.results) {
        setTrailerData(dataTrailer.results[0]);
      } else {
        setTrailerData(null);
      }

      // Recommendations
      if (dataRecommendations?.results) {
        setRecommendations(dataRecommendations.results);
      } else {
        setRecommendations(null);
      }

      // Collections
      if (dataCollections?.parts) {
        setCollections(dataCollections.parts);
      } else {
        setCollections(null);
      }

      setIsLoading(false);
    }
  };

  const setContent = (content: string) => {
    if (content === showIt) return;
    setShowIt(content);
  };

  useEffect(() => {
    getDetailsMovies(
      dataDetails,
      dataTrailer,
      dataRecommendations,
      dataCollections
    );
  }, []);

  useEffect(() => {
    getDetailsMovies(
      dataDetails,
      dataTrailer,
      dataRecommendations,
      dataCollections
    );
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>MaikãoFlix | Detalhes </title>
        <meta name="description" content="Maikaoflix | Detalhes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && <Loading />}
      {!isLoading && details && (
        <main>
          <div>
            <button className={S.back} onClick={() => router.back()}>
              Voltar
            </button>
            <BtnGoToTop />
          </div>
          <section>
            <Details
              title={details.title || details.name}
              background_img={details.poster_path || details.background_path}
              budget={details.budget}
              revenue={details.revenue}
              runtime={details.runtime}
              overview={details.overview}
              release_date={details.release_date || details.first_air_date}
              genres={details.genres}
            />
          </section>
          {router.query.searchTopic && (
            <section>
              <ul className={S.menu_show_it}>
                {trailerData && (
                  <li>
                    <button
                      onClick={() => {
                        setContent("trailer");
                      }}
                    >
                      Trailer
                    </button>
                  </li>
                )}
                {collections && (
                  <li>
                    <button
                      onClick={() => {
                        setContent("collections");
                      }}
                    >
                      Coleções
                    </button>
                  </li>
                )}
                {recommendations && (
                  <li>
                    <button
                      onClick={() => {
                        setContent("recommendations");
                      }}
                    >
                      Recomendações
                    </button>
                  </li>
                )}
              </ul>
            </section>
          )}
          {/* TRAILER */}
          {showIt === "trailer" && (
            <section>
              {router.query.searchTopic === "movie" && trailerData && (
                <section className={S.trailer}>
                  <h2>Trailer</h2>
                  <iframe
                    title={trailerData.name}
                    sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                    src={`https://youtube.com/embed/${trailerData.key}?autoplay=0`}
                  ></iframe>
                </section>
              )}
            </section>
          )}
          {/* TRAILER */}

          {/* COLLECTIONS */}
          {showIt === "collections" && (
            <>
              {collections && (
                <section className={S.collections}>
                  <h2>Coleções</h2>
                  <Card dataCard={collections} />
                </section>
              )}
            </>
          )}
          {/* COLLECTIONS */}

          {/* RECOMMENDATIONS */}
          {showIt === "recommendations" && (
            <>
              {recommendations && (
                <section className={S.recommendations}>
                  <h2>Recomendações</h2>
                  <Card dataCard={recommendations} />
                </section>
              )}
            </>
          )}
          {/* RECOMMENDATIONS */}
        </main>
      )}
      {!isLoading && reqNotFound && (
        <div className={S.req_not_found}>
          <span>Desculpe... não existe informações a respeito</span>
          <Link href="/">Página Inicial</Link>
        </div>
      )}
      {!isLoading && alertMessage && (
        <AlertMessage alertMessage={alertMessage} />
      )}
    </>
  );
};
export async function getServerSideProps({
  query,
}: {
  query: { searchTopic: string; id: string };
}) {
  const detailsURL = `${api_url_default}${query.searchTopic}/${query.id}?${api_key}&language=pt-BR`;
  const trailerURL = `${api_url_default}${query.searchTopic}/${query.id}/videos?${api_key}&language=pt-BR`;
  const recommendationsURL = `${api_url_default}${query.searchTopic}/${query.id}/recommendations?${api_key}&language=pt-BR&page=1&region=BR`;

  const dataDetails = await fetchData(detailsURL);
  const dataTrailer = await fetchData(trailerURL);
  const dataRecommendations = await fetchData(recommendationsURL);

  // Collections
  let dataCollections = null;

  if (query.searchTopic === "movie" && dataDetails.belongs_to_collection?.id) {
    const collectionsURL = `${api_url_default}collection/${dataDetails.belongs_to_collection.id}?${api_key}&language=pt-BR`;
    dataCollections = await fetchData(collectionsURL);
  }

  return {
    props: { dataDetails, dataTrailer, dataRecommendations, dataCollections },
  };
}
export default About;
