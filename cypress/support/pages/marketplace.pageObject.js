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

  scrollTo(element) {
    cy.get('.ant-row > .ant-col').last().then(($div) => {
      const el = $div[0];
      el.scrollIntoView();
    });
  }

  checkSecondPageProducts() {
    const firstPageUrl = 'https://kcp-api.klickly-dev.com/marketplace/promotions?page=1';
    const secondPageUrl = 'https://kcp-api.klickly-dev.com/marketplace/promotions?page=2';

    cy.request('GET', firstPageUrl).then((firstPageResponse) => {
      cy.request('GET', secondPageUrl).then((secondPageResponse) => {
        let duplicate;
        for (let i = 0; i < secondPageResponse.body.promotions.length; i++) {
          const productId = secondPageResponse.body.promotions[i].id
          duplicate = firstPageResponse.body.promotions.some((item) => item.id.includes(productId));

          if (duplicate) {
            throw new Error(`Some of the products are duplicated with the first page.`);
          };
        };
        expect(duplicate, 'All products on the second page are different from the first one').to.equal(false)
      });
    });
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