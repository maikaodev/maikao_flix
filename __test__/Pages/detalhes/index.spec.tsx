import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, within } from "@testing-library/react";
import mockRouter from "next-router-mock";

import Details, { AboutProps } from "@/pages/detalhes/[searchTopic]";

import { CollectionsProps, DataProps, TrailerProps } from "@/types/pages";

import { fetchData } from "../../../src/utils/fetchData";

jest.mock("next/router", () => require("next-router-mock"));

describe("Details page", () => {
  describe("Good request", () => {
    let dataDetails: AboutProps;
    let dataTrailer: TrailerProps;
    let dataRecommendations: DataProps;
    let dataCollections: CollectionsProps;

    beforeEach(async () => {
      const detailsURL = "https://api.themoviedb.org/detalhes/238/default";
      const trailerURL = "https://api.themoviedb.org/detalhes/238/trailer";
      const recommendationsURL =
        "https://api.themoviedb.org/detalhes/238/recommendations";
      const collectionsURL =
        "https://api.themoviedb.org/detalhes/238/collection?";

      dataDetails = await fetchData(detailsURL);
      dataTrailer = await fetchData(trailerURL);
      dataRecommendations = await fetchData(recommendationsURL);
      dataCollections = await fetchData(collectionsURL);

      mockRouter.push("/detalhes/movie?id=238");
    });

    beforeAll(() => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
    });

    it("should have a card component", async () => {
      const { getByTestId } = render(
        <Details
          dataDetails={dataDetails}
          dataTrailer={dataTrailer}
          dataRecommendations={dataRecommendations}
          dataCollections={dataCollections}
        />
      );

      const btn_collections = getByTestId("btn_collections");
      const btn_recommendations = getByTestId("btn_recommendations");

      const btns = [btn_collections, btn_recommendations];

      btns.forEach((btn) => {
        fireEvent.click(btn);

        expect(getByTestId("card_list")).toBeInTheDocument();
      });
    });

    it("should render the same amout", async () => {
      const { getByTestId } = render(
        <Details
          dataDetails={dataDetails}
          dataTrailer={dataTrailer}
          dataCollections={dataCollections}
          dataRecommendations={dataRecommendations}
        />
      );

      const btn_collections = getByTestId("btn_collections");
      const btn_recommendations = getByTestId("btn_recommendations");

      fireEvent.click(btn_collections);

      expect(
        within(getByTestId("card_list")).getAllByTestId("item_card_list")
      ).toHaveLength(dataCollections.parts.length);

      fireEvent.click(btn_recommendations);

      expect(
        within(getByTestId("card_list")).getAllByTestId("item_card_list")
      ).toHaveLength(dataRecommendations.results.length);
    });
  });

  describe("Bad request", () => {
    let dataDetailsEmptyReq: AboutProps;
    let dataDetailsReqFailed: AboutProps;
    let dataTrailer: TrailerProps;
    let dataRecommendations: DataProps;
    let dataCollections: CollectionsProps;

    beforeEach(async () => {
      const detailsURL =
        "https://api.themoviedb.org/detalhes/123/empty_request";
      const detailsReqFailedURL = "https://api.themoviedb.org/detalhes/123/123";

      dataDetailsEmptyReq = await fetchData(detailsURL);
      dataDetailsReqFailed = await fetchData(detailsReqFailedURL);
    });

    it("Should have an alert : Nothing Found", async () => {
      const { getByTestId } = render(
        <Details
          dataDetails={dataDetailsEmptyReq}
          dataTrailer={dataTrailer}
          dataRecommendations={dataRecommendations}
          dataCollections={dataCollections}
        />
      );

      const alertMessage = getByTestId("alert_message");
      const alertButton = getByTestId("alert_button");

      expect(alertMessage).toHaveTextContent(
        "Desculpe... não existe informações a respeito"
      );
      expect(alertButton).toHaveTextContent("Página Inicial");
    });

    it.only("Should have an alert : Sorry, an unexpected error occurred", async () => {
      const { getByTestId } = render(
        <Details
          dataDetails={dataDetailsReqFailed}
          dataTrailer={dataTrailer}
          dataRecommendations={dataRecommendations}
          dataCollections={dataCollections}
        />
      );

      const alertMessage = getByTestId("alert_message");
      const alertButton = getByTestId("alert_button");

      expect(alertMessage).toHaveTextContent(
        "Desculpe, ocorreu um erro inesperado!"
      );
      expect(alertButton).toHaveTextContent("Página Inicial");
    });
  });
});
