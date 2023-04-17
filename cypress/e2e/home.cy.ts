describe("Home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should go to movies page", () => {
    cy.findByTestId("movies_page").click();

    cy.url().should("eq", "http://localhost:3000/categoria/filmes?page=1");
  });

  it("should go to series page", () => {
    cy.findByTestId("series_page").click();

    cy.url().should("eq", "http://localhost:3000/categoria/series?page=1");
  });

  it("Should search for the Batman movie", () => {
    cy.findByTestId("research_input").should("be.enabled").type("Batman");

    cy.get("#research_button").should("be.enabled").click();

    cy.url().should("eq", "http://localhost:3000/procurando/Batman?page=1");
  });
});
