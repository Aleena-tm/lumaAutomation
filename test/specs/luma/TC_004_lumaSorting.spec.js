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


describe("TC_004: Successful sorting functionality of Luma", () => {
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

  it("Verify the user can sort the products according to the product name and validate the names are sorted or not", async () => {
    isSorted = await productsPage.sortByNames();
    expect(isSorted)
      .withContext("Product names should be sorted in ascending order")
      .toBeTrue();
  });

  it("Verify the user can sort the products according to the price and validate the prices are sorted or not", async () => {
    isSorted = await productsPage.sortByPrice();
    expect(isSorted)
      .withContext("Products should be sorted according to price")
      .toBeTrue();
  });

  it("Verify the user can sort the products according to position", async () => {
    productNames = await productsPage.sortByPosition();
    console.log(productNames);
    console.log(userData.nameOfProducts);
    expect(productNames)
      .withContext("Products should be sorted according to position")
      .toEqual(userData.nameOfProducts);
  });


});
