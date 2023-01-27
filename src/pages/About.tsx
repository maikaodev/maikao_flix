// Functions - Native
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Component
import {
  AlertMessage,
  BtnGoToTop,
  Card,
  Details,
  Loading,
} from "../components";

// CSS
import S from "../../styles/About.module.css";

// .env
const movies_url = process.env.API_URL_DEFAULT;
const api_key = process.env.API_KEY;

// TS
import { fetchData } from "@/utils/fetchData";
import Link from "next/link";
import { TopMoviesData } from "./index";

type DetailsData = {
  first_air_date: string;
  name: string;
  genres: [{ name: string }];
  release_date: string;
  title: string;
  poster_path: string;
  budget: number;
  revenue: number;
  runtime: number;
  overview: string;
};

const About = () => {
  //
  const [details, setDetails] = useState({} as DetailsData);
  const [recommendations, setRecommendations] = useState([{} as TopMoviesData]);
  const [collections, setCollections] = useState([{} as TopMoviesData]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trailer, setTrailer] = useState([
    {} as {
      name: string;
      key: string;
      empty?: boolean;
    },
  ]);
  const [showIt, setShowIt] = useState<string>("");
  const [reqNotFound, setReqNotFound] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>();

  // Router
  const router = useRouter();

  const getDetailsMovies = async () => {
    //
    const detailsURL = `${movies_url}${router.query.searchTopic}/${router.query.id}?${api_key}&language=pt-BR&page=1&region=BR`;

    const data = await fetchData(detailsURL);

    if (data?.error) {
      setIsLoading(false);

      return setAlertMessage(data.message);
    }

    if (data === undefined) {
      setReqNotFound(true);
    }

    if (data) {
      setDetails(data);
      getTheVideos();
      getTheRecommendations();

      if (data?.belongs_to_collection) {
        getTheCollections(data.belongs_to_collection.id);
      }

      setIsLoading(false);
    }
  };

  const getTheRecommendations = async () => {
    const recommendationsURL = `${movies_url}${router.query.searchTopic}/${router.query.id}/recommendations?${api_key}&language=pt-BR&page=1&region=BR`;

    const data = await fetchData(recommendationsURL);
    if (data.results) {
      setRecommendations(data.results);
    }
  };

  const getTheCollections = async (collectionsId: number) => {
    const collectionsURL = `${movies_url}collection/${collectionsId}?${api_key}&language=pt-BR`;

    const data = await fetchData(collectionsURL);

    if (data.parts) {
      setCollections(data.parts);
    }
  };

  const getTheVideos = async () => {
    const videosURL = `${movies_url}${router.query.searchTopic}/${router.query.id}/videos?${api_key}&language=pt-BR`;

    const data = await fetchData(videosURL);

    if (data.results) {
      setTrailer(data.results);
    }
  };

  const setContent = (content: string) => {
    if (content === showIt) return;
    setShowIt(content);
  };

  useEffect(() => {
    getDetailsMovies();
  });

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
              background_img={details.poster_path}
              budget={details.budget}
              revenue={details.revenue}
              runTime={details.runtime}
              overView={details.overview}
              release_date={details.release_date || details.first_air_date}
              genres={details.genres}
            />
          </section>
          {router.query.searchTopic && (
            <section>
              <ul className={S.menu_show_it}>
                {trailer.length > 0 && (
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
              {router.query.searchTopic === "movie" && trailer.length > 0 && (
                <section className={S.trailer}>
                  <h2>Trailer</h2>
                  <iframe
                    title={trailer[0].name}
                    sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                    src={`https://youtube.com/embed/${trailer[0].key}?autoplay=0`}
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

export default About;
