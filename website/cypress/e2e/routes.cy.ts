describe("application routes", () => {
  it("shows the Figma-based home page", () => {
    cy.visit("/");
    cy.contains("Narrative In A Glass").should("be.visible");
    cy.contains("Olfactory Signatures").should("be.visible");
    cy.contains("Scent Archetypes").should("be.visible");
    cy.contains("Occasional Scent Curation").should("be.visible");
    cy.contains("Atelier Chronicles").should("be.visible");
  });

  it("shows the product listing page", () => {
    cy.visit("/products");
    cy.contains("Products").should("be.visible");
  });

  it("shows the cart page", () => {
    cy.visit("/cart");
    cy.contains("Cart").should("be.visible");
  });
});
