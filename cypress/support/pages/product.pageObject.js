import PageObject from "../PageObject";

class ProductPageObject extends PageObject {

  assertUrl (searchText) {
    cy.url()
      .should('contain', searchText);
  }

  assertProductTitle(productTitle) {
    cy.get('[data-e2e="product-title"]')
      .should('contain', productTitle);
  }
}

export default ProductPageObject;