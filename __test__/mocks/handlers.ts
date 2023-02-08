// src/mocks/handlers.js
import { rest } from "msw";

// Home
export const handlers = [
  //
  rest.get("https://api.themoviedb.org/3/:theme/:topic", (req, res, ctx) => {
    const { theme, topic } = req.params;

    if (theme === "movie" && topic === "top_rated") {
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            {
              adult: false,
              backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
              genre_ids: [18, 80],
              id: 123,
              original_language: "en",
              original_title: "The Godfather",
              overview: `Em 1945, Don Corleone é o chefe de uma mafiosa família italiana de Nova York. Ele costuma apadrinhar várias pessoas, realizando importantes favores para elas, em troca de 
            favores futuros. Com a chegada das drogas, as 
            famílias começam uma disputa pelo promissor mercado. Quando Corleone se recusa a facilitar a entrada dos narcóticos na cidade, não oferecendo ajuda política e policial, sua família começa a sofrer atentados para que mudem de posição. É nessa complicada época que Michael, um herói de guerra nunca envolvido nos negócios da família, vê a necessidade de proteger o seu pai e tudo o que ele construiu ao longo dos anos.`,
              popularity: 110.514,
              poster_path: "/oJagOzBu9Rdd9BrciseCm3U3MCU.jpg",
              release_date: "1972-07-07",
              title: "O Poderoso Chefão",
              video: false,
              vote_average: 8.7,
              vote_count: 17422,
            },
            {
              adult: false,
              backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
              genre_ids: [18, 80],
              id: 456,
              original_language: "en",
              original_title: "The Godfather",
              overview: `Em 1945, Don Corleone é o chefe de uma mafiosa família italiana de Nova York. Ele costuma apadrinhar várias pessoas, realizando importantes favores para elas, em troca de 
            favores futuros. Com a chegada das drogas, as 
            famílias começam uma disputa pelo promissor mercado. Quando Corleone se recusa a facilitar a entrada dos narcóticos na cidade, não oferecendo ajuda política e policial, sua família começa a sofrer atentados para que mudem de posição. É nessa complicada época que Michael, um herói de guerra nunca envolvido nos negócios da família, vê a necessidade de proteger o seu pai e tudo o que ele construiu ao longo dos anos.`,
              popularity: 110.514,
              poster_path: "/oJagOzBu9Rdd9BrciseCm3U3MCU.jpg",
              release_date: "1972-07-07",
              title: "O Poderoso Chefão",
              video: false,
              vote_average: 8.7,
              vote_count: 17422,
            },
            {
              adult: false,
              backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
              genre_ids: [18, 80],
              id: 789,
              original_language: "en",
              original_title: "The Godfather",
              overview: `Em 1945, Don Corleone é o chefe de uma mafiosa família italiana de Nova York. Ele costuma apadrinhar várias pessoas, realizando importantes favores para elas, em troca de 
            favores futuros. Com a chegada das drogas, as 
            famílias começam uma disputa pelo promissor mercado. Quando Corleone se recusa a facilitar a entrada dos narcóticos na cidade, não oferecendo ajuda política e policial, sua família começa a sofrer atentados para que mudem de posição. É nessa complicada época que Michael, um herói de guerra nunca envolvido nos negócios da família, vê a necessidade de proteger o seu pai e tudo o que ele construiu ao longo dos anos.`,
              popularity: 110.514,
              poster_path: "/oJagOzBu9Rdd9BrciseCm3U3MCU.jpg",
              release_date: "1972-07-07",
              title: "O Poderoso Chefão",
              video: false,
              vote_average: 8.7,
              vote_count: 17422,
            },
          ],
          total_pages: 200,
        })
      );
    }
    if (theme === "tv" && topic === "top_rated") {
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            {
              backdrop_path: "/99vBORZixICa32Pwdwj0lWcr8K.jpg",
              first_air_date: "2021-09-03",
              genre_ids: [10764],
              id: 123456,
              name: "The D'Amelio Show",
              origin_country: ["US"],
              original_language: "en",
              original_name: "The D'Amelio Show",
              overview:
                "De uma escuridão relativa e uma aparente vida normal, ao serem jogados nas luzes de Hollywood da noite para o dia, os D'Amelio enfrentam novos desafios e oportunidades que não poderiam ter imaginado. Charli, Dixie, Heidi e Marc fazem o melhor que podem para ficarem juntos, enquanto tentam se ajustar à vida em Hollywood.",
              popularity: 22.069,
              poster_path: "/phv2Jc4H8cvRzvTKb9X1uKMboTu.jpg",
              vote_average: 9,
              vote_count: 3171,
            },
            {
              backdrop_path: "/99vBORZixICa32Pwdwj0lWcr8K.jpg",
              first_air_date: "2021-09-03",
              genre_ids: [10764],
              id: 456789,
              name: "The D'Amelio Show",
              origin_country: ["US"],
              original_language: "en",
              original_name: "The D'Amelio Show",
              overview:
                "De uma escuridão relativa e uma aparente vida normal, ao serem jogados nas luzes de Hollywood da noite para o dia, os D'Amelio enfrentam novos desafios e oportunidades que não poderiam ter imaginado. Charli, Dixie, Heidi e Marc fazem o melhor que podem para ficarem juntos, enquanto tentam se ajustar à vida em Hollywood.",
              popularity: 22.069,
              poster_path: "/phv2Jc4H8cvRzvTKb9X1uKMboTu.jpg",
              vote_average: 9,
              vote_count: 3171,
            },
            {
              backdrop_path: "/99vBORZixICa32Pwdwj0lWcr8K.jpg",
              first_air_date: "2021-09-03",
              genre_ids: [10764],
              id: 789123,
              name: "The D'Amelio Show",
              origin_country: ["US"],
              original_language: "en",
              original_name: "The D'Amelio Show",
              overview:
                "De uma escuridão relativa e uma aparente vida normal, ao serem jogados nas luzes de Hollywood da noite para o dia, os D'Amelio enfrentam novos desafios e oportunidades que não poderiam ter imaginado. Charli, Dixie, Heidi e Marc fazem o melhor que podem para ficarem juntos, enquanto tentam se ajustar à vida em Hollywood.",
              popularity: 22.069,
              poster_path: "/phv2Jc4H8cvRzvTKb9X1uKMboTu.jpg",
              vote_average: 9,
              vote_count: 3171,
            },
          ],
          total_pages: 200,
        })
      );
    }
    if (theme === "search" && topic === "multi") {
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            {
              adult: false,
              backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
              genre_ids: [80, 9648, 53],
              id: 1414906,
              media_type: "movie",
              original_language: "en",
              original_title: "The Batman",
              overview: `Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City. Com poucos aliados confiáveis, o vigilante solitário 
            se estabelece como a personificação da vingança para a população.`,
              popularity: 331.984,
              poster_path: "/wd7b4Nv9QBHDTIjc2m7sr0IUMoh.jpg",
              release_date: "2022-03-03",
              title: "Batman",
              video: false,
              vote_average: 7.7,
              vote_count: 7423,
            },
            {
              adult: false,
              backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
              genre_ids: [80, 9648, 53],
              id: 2414906,
              media_type: "movie",
              original_language: "en",
              original_title: "The Batman",
              overview: `Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City. Com poucos aliados confiáveis, o vigilante solitário 
                se estabelece como a personificação da vingança para a população.`,
              popularity: 331.984,
              poster_path: "/wd7b4Nv9QBHDTIjc2m7sr0IUMoh.jpg",
              release_date: "2022-03-03",
              title: "Batman",
              video: false,
              vote_average: 7.7,
              vote_count: 7423,
            },
            {
              adult: false,
              backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
              genre_ids: [80, 9648, 53],
              id: 3414906,
              media_type: "movie",
              original_language: "en",
              original_title: "The Batman",
              overview: `Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City. Com poucos aliados confiáveis, o vigilante solitário 
                    se estabelece como a personificação da vingança para a população.`,
              popularity: 331.984,
              poster_path: "/wd7b4Nv9QBHDTIjc2m7sr0IUMoh.jpg",
              release_date: "2022-03-03",
              title: "Batman",
              video: false,
              vote_average: 7.7,
              vote_count: 7423,
            },
            {
              adult: false,
              backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
              genre_ids: [80, 9648, 53],
              id: 4414906,
              media_type: "movie",
              original_language: "en",
              original_title: "The Batman",
              overview: `Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City. Com poucos aliados confiáveis, o vigilante solitário 
                        se estabelece como a personificação da vingança para a população.`,
              popularity: 331.984,
              poster_path: "/wd7b4Nv9QBHDTIjc2m7sr0IUMoh.jpg",
              release_date: "2022-03-03",
              title: "Batman",
              video: false,
              vote_average: 7.7,
              vote_count: 7423,
            },
          ],
          total_pages: 200,
        })
      );
    }
  }),
];
