describe("app test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.clearLocalStorage();
  });
  it("should render an input", () => {
    cy.get(".myInput").type("hello");
    cy.get(".myInput").should("have.value", "hello");
  });

  it("should enter and retrieve item from localstorage", () => {
    cy.get(".addToLocalInput").type("hello");
    cy.get(".addToLocalBtn")
      .click()
      .should(() => {
        expect(localStorage.getItem("0")).to.eq("hello");
      });
  });
});
