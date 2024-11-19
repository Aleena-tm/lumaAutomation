/**
 * imports
 */
import homePage from "../../pageobjects/luma/homePage.js";
import productsPage from "../../pageobjects/luma/productsPage.js";
import landingPage from "../../pageobjects/luma/landing.js";
import userData from "../../testData/lumaData.json";

let password, filterOption, isSorted, productNames,errorMessage, passwordStrength, nameOfProduct, priceOfProduct, productName, productPrice, value;
let cartQuantity, nameMiniCart, priceMiniCart, totalMiniCart;
let productQuantity = userData.quantities[1];
let productColor = userData.filterOptionsColor[0];
let productSize = userData.filterOptionsSize[1];
let errorMessages =[errorMessage, passwordStrength];
let nameAndPrice =[nameOfProduct, priceOfProduct];
let productDetails =[productName, productPrice];
let detailsOfCartPopup =[nameMiniCart, priceMiniCart, totalMiniCart];
let cartPageDetails =[];
let shippingProductDetails =[];
let wishListnameAndPrice=[];


describe("TC_003: Successfull functionality of filter options", () => {
it("Load URL of the webpage and the icon of luma should be displayed", async () => {
    await landingPage.loadURL();
    expect(await landingPage.$lumaIcon().isDisplayed())
      .withContext("Expected page should be loaded")
      .toBeTrue();
  });

it("User should sign in using existing credentials and validate the sign in message", async () => {
    await landingPage.userSignin("login[username]","login[password]");
    expect(await landingPage.$siginMessage().isDisplayed())
      .withContext("User should signed in")
      .toBeTrue();
  });

it("User should search for a product from women category at the navigation bar and validate products page header", async () => {
    await homePage.searchWomenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  });

it("User should filter products according to style and validate the selected filter option", async () => {
  for (filterOption of userData.filterOptionsListStyle) {
      await productsPage.selectFilterStyle(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext(`Product page should be displayed for the selected filter`)
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
  }
  });

  it("User should filter products according to size and validate the selected filter option", async () => {
    for (filterOption of userData.filterOptionsSize) {
      await productsPage.selectFilterSize(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to climate and validate the selected filter option", async () => {
    for (filterOption of userData.filterOptionsClimate) {
      await productsPage.selectFilterClimate(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to color and validate the selected filter option", async () => {
    for (filterOption of userData.filterOptionsColor) {
      await productsPage.selectFilterColor(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to eco collection and validate the selected filter option", async () => {
    await productsPage.selectFilterEcoCollection();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to erin recommends and validate the selected filter option", async () => {
    await productsPage.selectFilterErinRecommends();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to material and validate the selected filter option", async () => {
    for (filterOption of userData.filterOptionsMaterial) {
      await productsPage.selectFilterMaterial(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to new and validate the selected filter option", async () => {
    await productsPage.selectFilterNew();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to pattern and validate the selected filter option", async () => {
    for (filterOption of userData.filterOptionsPattern) {
      await productsPage.selectFilterPattern(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to performance fabric and validate the selected filter option", async () => {
    await productsPage.selectFilterPerformanceFabric();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to price and validate the selected filter option", async () => {
    await productsPage.selectFilterPrice();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to sale and validate the selected filter option", async () => {
    await productsPage.selectFilterSale();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to all the filter options validate the filter options selected", async () => {
    await productsPage.selectAllFilters();
    expect(await productsPage.$filtersChoosed().isDisplayed())
      .withContext(
        "Product page should be displayed for all the selected filter"
      )
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

});