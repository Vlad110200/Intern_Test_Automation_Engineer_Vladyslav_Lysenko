import MarketPlacePageObject from "../support/pages/marketPlace.PageObject"
import ProductPageObject from "../support/pages/product.pageObject"

const marketplacePage = new MarketPlacePageObject();
const productPage = new ProductPageObject();

let element;

describe('Marketplace page', () => {

  before(() => {
    cy.task('customData').then((customData) => {
      element = customData;
    });
  });

  beforeEach(() => {
    cy.visit(element.url.marketplaceUrl);
  });

  it('should allow the user to find a product and open it\'s page', () => {
    marketplacePage.fillIntoSearchField(element.product.tShirtTitle);
    marketplacePage.clickSearchButton();
    marketplacePage.clickedSearchedProduct(element.product.tShirtTitle);

    productPage.assertUrl(element.product.tShirtId);
    productPage.assertProductTitle(element.product.tShirtTitle);
  });

  it('should display searched by keyword products', () => {
    marketplacePage.fillIntoSearchField(element.product.keyword);
    marketplacePage.clickSearchButton();

    marketplacePage.assertFirstProduct(element.product.keyword);
    marketplacePage.assertLastProduct(element.product.keyword);
  });

  context('Errors',() => {
    it('should show error message', () => {
      cy.emulateEmptySearchResult();
      marketplacePage.fillIntoSearchField(element.product.keyword);
      marketplacePage.clickSearchButton();
      cy.wait('@getEmptyResult');

      marketplacePage.assertFirstProduct(element.product.keyword);
      marketplacePage.assertLastProduct(element.product.keyword);
    });
  });
  
  it.only('should display products on the second page different from the first one', () => {
    marketplacePage.scrollTo(element.lastProduct);
    marketplacePage.checkSecondPageProducts();
  });
});