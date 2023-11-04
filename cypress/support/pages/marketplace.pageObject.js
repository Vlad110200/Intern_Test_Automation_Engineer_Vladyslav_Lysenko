import PageObject from "../PageObject";

class MarketPlacePageObject extends PageObject {

  get searchField () {
    return cy.get('.sc-iIUQWv');
  }

  get searchButton() {
    return cy.contains('.sc-fotOHu', 'Search');
  }

  get productCard () {
    return cy.get('[data-e2e="product-card"]');
  }

  clickedSearchedProduct (productName) {
    cy.contains('.ant-typography', productName)
      .click();
  }

  clickSearchButton() {
    this.searchButton.click();
  }

  fillIntoSearchField (text) {
    this.searchField.type(text);
  }

  assertFirstProduct(title) {
    this.productCard
      .first()
      .should('contain.text', title);
  }

  assertLastProduct(title) {
    this.productCard
      .last()
      .should('contain.text', title)
  }

  get firstPageProducts() {
    return cy.get('[data-e2e="product-card"]');
  }

  get secondPageProducts() {
    cy.window().scrollTo('bottom', { ensureScrollable: false })
    return cy.get('[data-e2e="product-card"]');
  }
  
}

export default MarketPlacePageObject;