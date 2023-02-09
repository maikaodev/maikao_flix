import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, within } from "@testing-library/react";
import mockRouter from "next-router-mock";

// Page
import Details, { AboutProps } from "@/pages/detalhes/[searchTopic]";

// TS
import { CollectionsProps, DataProps, TrailerProps } from "@/types/pages";

// Functions - utils
import { fetchData } from "../../../src/utils/fetchData";

// Mock Router
jest.mock("next/router", () => require("next-router-mock"));

describe("Details page", () => {
  //

  let dataDetails: AboutProps;
  let dataTrailer: TrailerProps;
  let dataRecommendations: DataProps;
  let dataCollections: CollectionsProps;

  beforeEach(async () => {
    //
    const detailsURL = "https://api.themoviedb.org/detalhes/238/default";
    const trailerURL = "https://api.themoviedb.org/detalhes/238/trailer";
    const recommendationsURL =
      "https://api.themoviedb.org/detalhes/238/recommendations";
    const collectionsURL =
      "https://api.themoviedb.org/detalhes/238/collection?";

    dataDetails = await fetchData(detailsURL);
    dataTrailer = await fetchData(trailerURL);
    dataRecommendations = await fetchData(recommendationsURL);

    // req condicional
    // dataCollections
    dataCollections = await fetchData(collectionsURL);

    // Passing the page parameter to the pagination component
    mockRouter.push("/detalhes/movie?id=238");
  });

  // Configuring to test antd component
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  //
  it("should have a card component", async () => {
    //
    const { getByTestId } = render(
      <Details
        dataDetails={dataDetails}
        dataTrailer={dataTrailer}
        dataRecommendations={dataRecommendations}
        dataCollections={dataCollections}
      />
    );

    // Element
    const btn_collections = getByTestId("btn_collections");
    const btn_recommendations = getByTestId("btn_recommendations");

    // event
    const btns = [btn_collections, btn_recommendations];

    btns.forEach((btn) => {
      // Event
      fireEvent.click(btn);

      // Assertion
      expect(getByTestId("card_list")).toBeInTheDocument();
    });
  });

  it.only("should render the same amout", async () => {
    //
    const { getByTestId } = render(
      <Details
        dataDetails={dataDetails}
        dataTrailer={dataTrailer}
        dataCollections={dataCollections}
        dataRecommendations={dataRecommendations}
      />
    );

    // Elements
    const btn_collections = getByTestId("btn_collections");
    const btn_recommendations = getByTestId("btn_recommendations");

    // Event
    fireEvent.click(btn_collections);

    // Assertion
    expect(
      within(getByTestId("card_list")).getAllByTestId("item_card_list")
    ).toHaveLength(dataCollections.parts.length);

    // Event
    fireEvent.click(btn_recommendations);

    // Assertion
    expect(
      within(getByTestId("card_list")).getAllByTestId("item_card_list")
    ).toHaveLength(dataRecommendations.results.length);
  });
});
