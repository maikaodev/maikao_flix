// Functions - Native
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
import { DetailsProps } from "@/components/Details";
import { DataProps, TopMoviesData } from "../index";

export type DetailsData = DetailsProps & {
  first_air_date: string;
  name: string;
  genres: [{ name: string }];
  release_date: string;
  title: string;
  poster_path: string;
  background_path: string;
  budget: number;
  revenue: number;
  runtime: number;
  overview: string;
};

type AboutProps = DataProps &
  DetailsData & {
    belongs_to_collection?: { id: number };
  };

type ResultsProps = {
  name: string;
  key: string;
  empty?: boolean;
};

type DataTrailer = {
  results: ResultsProps[];
};

const About = ({
  dataDetails,
  dataTrailer,
}: {
  dataDetails: AboutProps;
  dataTrailer: DataTrailer;
}) => {
  //
  const [details, setDetails] = useState<DetailsData>();
  const [recommendations, setRecommendations] = useState([{} as TopMoviesData]);
  const [collections, setCollections] = useState([{} as TopMoviesData]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trailerData, setTrailerData] = useState<ResultsProps>();
  const [showIt, setShowIt] = useState<string>("");
  const [reqNotFound, setReqNotFound] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>();

  // Router
  const router = useRouter();

  const getDetailsMovies = async (
    data: AboutProps,
    dataTrailer: DataTrailer
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
      setTrailerData(dataTrailer.results[0]);
      // setTrailerData(dataTrailer.results[0])
      // setVideo(dataTrailer[0])
      // getTheRecommendations();

      // if (data?.belongs_to_collection) {
      //   getTheCollections(data.belongs_to_collection.id);
      // }

      setIsLoading(false);
    }
  };

  const getTheRecommendations = async () => {
    const recommendationsURL = `${api_url_default}${router.query.searchTopic}/${router.query.id}/recommendations?${api_key}&language=pt-BR&page=1&region=BR`;

    const data = await fetchData(recommendationsURL);
    if (data.results) {
      setRecommendations(data.results);
    }
  };

  const getTheCollections = async (collectionsId: number) => {
    const collectionsURL = `${api_url_default}collection/${collectionsId}?${api_key}&language=pt-BR`;

    const data = await fetchData(collectionsURL);

    if (data.parts) {
      setCollections(data.parts);
    }
  };

  const getTheVideos = async () => {
    // const data = await fetchData(videosURL);
    // if (data.results) {
    //   setTrailer(data.results);
    // }
  };

  const setContent = (content: string) => {
    if (content === showIt) return;
    setShowIt(content);
  };

  useEffect(() => {
    getDetailsMovies(dataDetails, dataTrailer);
  }, []);

  return (
    <>
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
                {trailerData?.key && (
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
                {collections[0].id && (
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
                {recommendations.length > 0 && (
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
              {router.query.searchTopic === "movie" && trailerData?.key && (
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
              {collections[0].id && (
                <section className={S.collections}>
                  <h2>Coleções</h2>
                  <ul className={S.card_list}>
                    <Card dataCard={collections} />
                  </ul>
                </section>
              )}
            </>
          )}
          {/* COLLECTIONS */}

          {/* RECOMMENDATIONS */}
          {showIt === "recommendations" && (
            <>
              {recommendations.length > 0 && (
                <section className={S.recommendations}>
                  <h2>Recomendações</h2>
                  <ul className={S.card_list}>
                    <Card dataCard={recommendations} />
                  </ul>
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

  const dataDetails = await fetchData(detailsURL);
  const dataTrailer = await fetchData(trailerURL);

  console.log("dataTraier ", dataTrailer);

  return {
    props: { dataDetails, dataTrailer },
  };
}
export default About;
