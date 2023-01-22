// Functions - Native
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Component
import { Card, Details, Loading } from "../../components";

// CSS
import "./style.css";

// .env
const movies_url = import.meta.env.VITE_API_URL_DEFAULT;
const api_key = import.meta.env.VITE_API_KEY;

// TS
import { fetchData } from "@/utils/fetchData";
import { TopMoviesData } from "../Home";

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
    },
  ]);
  const [showIt, setShowIt] = useState<string>("trailer");
  const [navigations, setNavigations] = useState<number>(-1);

  let { id, searchTopic } = useParams();

  const navigate = useNavigate();

  const getDetailsMovies = async () => {
    //
    const detailsURL = `${movies_url}${searchTopic}/${id}?${api_key}&language=pt-BR&page=1&region=BR`;

    const data = await fetchData(detailsURL);

    setDetails(data);

    getTheRecommendations();
    if (data?.belongs_to_collection?.id) {
      getTheCollections(data.belongs_to_collection.id);
    }

    setIsLoading(false);
  };

  const getTheRecommendations = async () => {
    const recommendationsURL = `${movies_url}${searchTopic}/${id}/recommendations?${api_key}&language=pt-BR&page=1&region=BR`;

    const data = await fetchData(recommendationsURL);

    setRecommendations(data.results);
  };

  const getTheCollections = async (collectionsId: number) => {
    const collectionsURL = `${movies_url}collection/${collectionsId}?${api_key}&language=pt-BR`;

    const data = await fetchData(collectionsURL);

    setCollections(data.parts);
  };

  const getTheVideos = async () => {
    const videosURL = `${movies_url}${searchTopic}/${id}/videos?${api_key}&language=pt-BR`;

    const data = await fetchData(videosURL);

    setTrailer(data.results);
  };

  const setContent = (content: string) => {
    if (content === showIt) return;
    setShowIt(content);
  };

  useEffect(() => {
    setIsLoading(true);

    getDetailsMovies();
    getTheVideos();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getDetailsMovies();
  }, [id]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <main>
          <div>
            <button id="back" onClick={() => navigate(navigations)}>
              Voltar
            </button>
            <a
              id="float_button"
              href="#topo"
              onClick={() => {
                setNavigations((prevCount) => (prevCount += -1));
              }}
            >
              ⬆
            </a>
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
          {searchTopic === "movie" && (
            <section>
              <ul id="menu_show_it">
                {trailer && (
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
              {searchTopic === "movie" && (
                <section id="trailer">
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
              {collections && (
                <section id="collections">
                  <h2>Coleções</h2>

                  <ul id="card_list">
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
                <section id="recommendations">
                  <h2>Recomendações</h2>
                  <ul id="card_list">
                    <Card dataCard={recommendations} />
                  </ul>
                </section>
              )}
            </>
          )}
          {/* RECOMMENDATIONS */}
        </main>
      )}
    </>
  );
};

export default About;
