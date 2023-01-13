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
import { TopMoviesData } from "../Home";

type DetailsData = {
  genres: [{ name: string }];
  release_date: string;
  title: string;
  poster_path: string;
  budget: number;
  revenue: number;
  runtime: number;
  overview: string;
};

const Movie = () => {
  //
  const [details, setDetails] = useState({} as DetailsData);
  const [recommendations, setRecommendations] = useState([{} as TopMoviesData]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [navigations, setNavigations] = useState<number>(-1);

  let { id, searchTopic } = useParams();

  const navigate = useNavigate();

  const getDetailsMovies = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    try {
      if (response.ok) {
        setDetails(data);
        console.log("[MOVIE]====>", data);
      } else {
        throw new Error("Ocorreu um erro inesperado!");
      }
    } catch (error: any) {
      alert(error.message);
    }
    setIsLoading(false);
  };

  const getTheRecommendations = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    try {
      if (response.ok) {
        setRecommendations(data.results);
        console.log("[recommendations]====>", data);
      } else {
        throw new Error("Ocorreu um erro inesperado!");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const detailsURL = `${movies_url}${searchTopic}/${id}?${api_key}&language=pt-BR&page=1&region=BR`;
    const recommendationsURL = `${movies_url}${searchTopic}/${id}/recommendations?${api_key}&language=pt-BR&page=1&region=BR`;

    setIsLoading(true);
    getDetailsMovies(detailsURL);
    getTheRecommendations(recommendationsURL);
  }, []);

  useEffect(() => {
    const detailsURL = `${movies_url}${searchTopic}/${id}?${api_key}&language=pt-BR&page=1&region=BR`;
    const recommendationsURL = `${movies_url}${searchTopic}/${id}/recommendations?${api_key}&language=pt-BR&page=1&region=BR`;

    setIsLoading(true);
    getDetailsMovies(detailsURL);
    getTheRecommendations(recommendationsURL);
  }, [id]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div>
            <button id="back" onClick={() => navigate(navigations)}>
              Voltar
            </button>
            <a
              id="float_button"
              href="#topo"
              onClick={() => {
                setNavigations((prevCount) => (prevCount += -1));
                console.log(navigations);
              }}
            >
              ⬆
            </a>
          </div>
          <section>
            <Details
              title={details.title}
              background_img={details.poster_path}
              budget={details.budget}
              revenue={details.revenue}
              runTime={details.runtime}
              overView={details.overview}
              release_date={details.release_date}
              genres={details.genres}
            />
          </section>
          <section id="recommendations">
            <h2>Recomendações</h2>
            <ul>
              {recommendations &&
                recommendations.map((movie, index) => {
                  return (
                    <Card
                      key={index + 1}
                      url_image={movie.backdrop_path || movie.poster_path}
                      title={movie.title || movie.name}
                      vote_average={movie.vote_average}
                      id_movie={movie.id}
                      search_topic={searchTopic}
                    />
                  );
                })}
            </ul>
          </section>
        </>
      )}
    </>
  );
};

export default Movie;
