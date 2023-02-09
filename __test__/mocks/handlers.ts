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

  rest.get(
    "https://api.themoviedb.org/detalhes/:id/:topic",
    (req, res, ctx) => {
      //
      const { id, topic } = req.params;

      if (id === "238" && topic === "default") {
        return res(
          ctx.status(200),
          ctx.json({
            adult: false,
            backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
            belongs_to_collection: {
              id: 230,
              name: "O Poderoso Chefão: Coleção",
              poster_path: "/m5SGcKvBWyXxufO0YQxhzaw2f5f.jpg",
              backdrop_path: "/3WZTxpgscsmoUk81TuECXdFOD0R.jpg",
            },
            budget: 6000000,
            genres: [
              { id: 18, name: "Drama" },
              { id: 80, name: "Crime" },
            ],
            homepage: "",
            id: 238,
            imdb_id: "tt0068646",
            original_language: "en",
            original_title: "The Godfather",
            overview: `Em 1945, Don Corleone é o chefe de uma mafiosa família italiana de Nova York. Ele costuma apadrinhar várias pessoas, realizando importantes favores para elas, em troca de favores futuros. Com a chegada das drogas, as famílias começam uma disputa pelo promissor mercado. Quando Corleone se recusa a facilitar 
              a entrada dos narcóticos na cidade, não oferecendo ajuda política e policial, sua família começa a sofrer atentados para que mudem de posição. É nessa complicada época que Michael, um herói de guerra nunca envolvido nos negócios da família, vê a necessidade de proteger o seu pai e tudo o que ele construiu ao longo dos anos.`,
            popularity: 105.224,
            poster_path: "/oJagOzBu9Rdd9BrciseCm3U3MCU.jpg",
            production_companies: [
              {
                id: 4,
                logo_path: "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png",
                name: "Paramount",
                origin_country: "US",
              },
              {
                id: 10211,
                logo_path: null,
                name: "Alfran Productions",
                origin_country: "US",
              },
            ],
            production_countries: [
              { iso_3166_1: "US", name: "United States of America" },
            ],
            release_date: "1972-03-14",
            revenue: 245066411,
            runtime: 175,
            spoken_languages: [
              { english_name: "English", iso_639_1: "en", name: "English" },
              { english_name: "Italian", iso_639_1: "it", name: "Italiano" },
              { english_name: "Latin", iso_639_1: "la", name: "Latin" },
            ],
            status: "Released",
            tagline: "Uma oferta que você não vai poder recusar.",
            title: "O Poderoso Chefão",
            video: false,
            vote_average: 8.715,
            vote_count: 17434,
          })
        );
      }

      if (id === "238" && topic == "collection") {
        return res(
          ctx.status(200),
          ctx.json({
            parts: [
              {
                adult: false,
                backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
                genre_ids: [Array],
                id: 238,
                original_language: "en",
                original_title: "The Godfather",
                overview:
                  "Em 1945, Don Corleone é o chefe de uma mafiosa família italiana de Nova York. Ele costuma apadrinhar várias pessoas, realizando importantes favores para elas, em troca de favores futuros. Com a chegada das drogas, as famílias começam uma disputa pelo promissor mercado. Quando Corleone se recusa a facilitar a entrada dos narcóticos na cidade, não oferecendo ajuda política e policial, sua família começa a sofrer atentados para que mudem de posição. É nessa complicada época que Michael, um herói de guerra nunca envolvido nos negócios da família, vê a necessidade de proteger o seu pai e tudo o que ele construiu ao longo dos anos.",
                popularity: 105.224,
                poster_path: "/oJagOzBu9Rdd9BrciseCm3U3MCU.jpg",
                release_date: "1972-03-14",
                title: "O Poderoso Chefão",
                video: false,
                vote_average: 8.715,
                vote_count: 17434,
              },
              {
                adult: false,
                backdrop_path: "/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
                genre_ids: [Array],
                id: 240,
                original_language: "en",
                original_title: "The Godfather Part II",
                overview: `Após a máfia matar sua família, o jovem Vito foge da sua cidade na Sicília e vai para a América. Vito luta para manter sua família. Ele mata Black Hand Fanucci, que exigia dos comerciantes uma parte dos 
                seus ganhos. Com a morte de Fanucci, o poderio de Vito cresce, mas sua família é o que mais importa para ele. 
                Agora baseado no Lago Tahoe, Michael planeja fazer incursões em Las Vegas e Havana instalando negócios ligados ao lazer, mas descobre que aliados como Hyman Roth estão tentando matá-lo.`,
                popularity: 57.489,
                poster_path: "/7g6wvsWHxBQujUcSXvZLhdFpDUy.jpg",
                release_date: "1974-12-20",
                title: "O Poderoso Chefão: Parte II",
                video: false,
                vote_average: 8.601,
                vote_count: 10557,
              },
              {
                adult: false,
                backdrop_path: "/zNnjHLDtV8Ti3aworltaeaLMov4.jpg",
                genre_ids: [Array],
                id: 242,
                original_language: "en",
                original_title: "The Godfather Part III",
                overview: `Don Michael Corleone está envelhecendo e, com a ajuda do sobrinho Vicente Mancini, busca a legitimação dos interesses da família, em Nova York e na Itália, antes de sua morte. Mas seu protegido não está 
                só interessado em parte do império da família. Ele também deseja a filha de Michael, Mary.`,
                popularity: 104.619,
                poster_path: "/y8GROCjgD8amoFufSx2USKrOy7d.jpg",
                release_date: "1990-12-25",
                title: "O Poderoso Chefão: Parte III",
                video: false,
                vote_average: 7.419,
                vote_count: 5321,
              },
            ],
          })
        );
      }

      // TODO: Criar endpoint sem belongs_to_collection

      if (id === "238" && topic === "trailer") {
        return res(
          ctx.status(200),
          ctx.json({
            results: [
              {
                iso_639_1: "pt",
                iso_3166_1: "BR",
                name: "O Poderoso Chefão | Aniversário de 50 Anos | Trailer Oficial | Paramount Pictures Brasil",
                key: "0v6MO0EB7UY",
                site: "YouTube",
                size: 1080,
                type: "Trailer",
                official: true,
                published_at: "2022-01-13T14:03:27.000Z",
                id: "623a98c2e942be00877e6683",
              },
            ],
          })
        );
      }

      if (id === "238" && topic === "recommendations") {
        return res(
          ctx.status(200),
          ctx.json({
            page: 1,
            total_pages: 2,
            total_results: 40,
            results: [
              {
                adult: false,
                backdrop_path: "/maxRhndtC4BJABvqRPvYNu69CHA.jpg",
                id: 551271,
                title: "Medieval",
                original_language: "en",
                original_title: "Medieval",
                overview:
                  "A história do ícone tcheco do século XV e senhor da guerra Jan Zizka, que derrotou os exércitos da Ordem Teutônica e do Sacro Império Romano,",
                poster_path: "/eeUNWsdoiOijOZAMaWFDA5Pb1n8.jpg",
                media_type: "movie",
                genre_ids: [Array],
                popularity: 399.179,
                release_date: "2022-09-08",
                video: false,
                vote_average: 7.229,
                vote_count: 321,
              },
              {
                adult: false,
                backdrop_path: "/elL2k88SPUcqSqvH0glmW7EdLck.jpg",
                id: 936511,
                title: "VOY@GER",
                original_language: "ja",
                original_title:
                  "アイドルマスターシリーズ イメージソング2021『VOY@GER』​",
                overview:
                  "Voy@ger is conceptual movie produced in commemoration of the 16th anniversary of the iDOLM@STER franchise. It features an image song of the same name, gathering 15 different idols from 5 different sub-franchises.",
                poster_path: "/wxrgtMJSmxYLVxfusktyKP8M3X5.jpg",
                media_type: "movie",
                genre_ids: [Array],
                popularity: 1.605,
                release_date: "2021-08-25",
                video: false,
                vote_average: 3.8,
                vote_count: 2,
              },
              {
                adult: false,
                backdrop_path: "/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
                id: 240,
                title: "O Poderoso Chefão: Parte II",
                original_language: "en",
                original_title: "The Godfather Part II",
                overview: `Após a máfia matar sua família, o jovem Vito foge da sua cidade na Sicília e vai para a América. Vito luta para manter sua família. Ele mata Black Hand Fanucci, que exigia dos comerciantes uma parte dos 
                  seus ganhos. Com a morte de Fanucci, o poderio de Vito cresce, mas sua família é o que mais importa para ele. 
                  Agora baseado no Lago Tahoe, Michael planeja fazer incursões em Las Vegas e Havana instalando negócios ligados ao lazer, mas descobre que aliados como Hyman Roth estão tentando matá-lo.`,
                poster_path: "/7g6wvsWHxBQujUcSXvZLhdFpDUy.jpg",
                media_type: "movie",
                genre_ids: [Array],
                popularity: 57.489,
                release_date: "1974-12-20",
                video: false,
                vote_average: 8.601,
                vote_count: 10557,
              },
              {
                adult: false,
                backdrop_path: "/sqVxhRkPwOo6jogWZjE99V1HRE1.jpg",
                id: 1037858,
                title: "Futebol em Apuros",
                original_language: "en",
                original_title: "The Soccer Football Movie",
                overview: `Quatro superfãs de futebol se unem para ajudar seus ídolos a recuperar o talento roubado por 
                  um cientista maluco.`,
                poster_path: "/1WHeh743USzQoCrzPQYUKEDsTjZ.jpg",
                media_type: "movie",
                genre_ids: [Array],
                popularity: 174.288,
                release_date: "2022-11-09",
                video: false,
                vote_average: 6.2,
                vote_count: 78,
              },
              {
                adult: false,
                backdrop_path: "/wPU78OPN4BYEgWYdXyg0phMee64.jpg",
                id: 278,
                title: "Um Sonho de Liberdade",
                original_language: "en",
                original_title: "The Shawshank Redemption",
                overview: `Em 1946, Andy Dufresne, um banqueiro jovem e bem sucedido, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela. Ele é mandado para uma prisão que é o pesadelo de qualquer detento, a Penitenciária Estadual de Shawshank, no Maine. Lá ele irá cumprir a pena perpétua. Andy logo será apresentado a Warden Norton, o corrupto e cruel agente penitenciário, que usa a Bíblia como arma de controle e ao Capitão Byron Hadley que trata os internos como animais. Andy faz amizade com Ellis Boyd Redding, um prisioneiro que cumpre pena há 20 anos e controla o mercado negro da 
                  instituição.`,
                poster_path: "/umX3lBhHoTV7Lsci140Yr8VpXyN.jpg",
                media_type: "movie",
                genre_ids: [Array],
                popularity: 129.328,
                release_date: "1994-09-23",
                video: false,
                vote_average: 8.702,
                vote_count: 23245,
              },
              {
                adult: false,
                backdrop_path: "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
                id: 436270,
                title: "Adão Negro",
                original_language: "en",
                original_title: "Black Adam",
                overview: `Quase 5.000 anos depois de ter sido concedido com os poderes onipotentes dos deuses egípcios 
                  - e de ter sido preso, - Adão Negro se ergue de seu túmulo, pronto para trazer sua justiça ao mundo moderno.`,
                poster_path: "/9z256FFPDsL7kSVJ9oyLELaN1ph.jpg",
                media_type: "movie",
                genre_ids: [Array],
                popularity: 1088.833,
                release_date: "2022-10-19",
                video: false,
                vote_average: 7.198,
                vote_count: 4074,
              },
              {
                adult: false,
                backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
                id: 505642,
                title: "Pantera Negra: Wakanda para Sempre",
                original_language: "en",
                original_title: "Black Panther: Wakanda Forever",
                overview:
                  "A rainha Ramonda, Shuri, M'Baku, Okoye e as poderosas Dora Milaje lutam para proteger sua nação após a morte do rei T'Challa. Com a ajuda da Cão de Guerra Nakia e de Everett Ross, eles tentam encontrar um novo caminho para Wakanda.",
                poster_path: "/nZ69WTv7n01womaNz3SHa4inA9x.jpg",
                media_type: "movie",
                genre_ids: [Array],
                popularity: 9051.476,
                release_date: "2022-11-09",
                video: false,
                vote_average: 7.495,
                vote_count: 2709,
              },
              {
                adult: false,
                backdrop_path: "/rahBsU0BvOURJu8kcXRo99LyVp.jpg",
                id: 158358,
                title: "Red Bull Rampage 2012",
                original_language: "en",
                original_title: "Red Bull Rampage 2012",
                overview: `Documentário sobre a edição de 2012 do Red Bull Rampage, o campeonato anual no cenário agreste das rochas vermelhas de Virgin, Utah, que é considerado o maior teste de coragem, habilidade e criatividade 
                  para os craques do mountain bike.`,
                poster_path: "/uuQupignhVEYV8V66V39KzBS422.jpg",
                media_type: "movie",
                genre_ids: [Array],
                popularity: 0.84,
                release_date: "2012-10-07",
                video: false,
                vote_average: 0,
                vote_count: 0,
              },
            ],
          })
        );
      }
    }
  ),
];
