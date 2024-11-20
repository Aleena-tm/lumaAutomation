/**
 * imports
 */
import homePage from "../../pageobjects/luma/homePage.js";
import cartPage from "../../pageobjects/luma/cartPage.js";
import myAccountPage from "../../pageobjects/luma/myAccountPage.js";
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


describe("TC_010: Successfull functionality of My Account option of Luma", () => {
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

  it("User should navigate to My Account page", async()=>{
    await homePage.selectMyAccount();
    expect(await myAccountPage.$myAccountHeader().isDisplayed())
      .withContext("User should be navigated to the home page")
      .toBeTrue();
  })

  it("User should edit contact information", async()=>{
    await myAccountPage.editContact();
    expect(await myAccountPage.$customerLogin().isDisplayed())
      .withContext("User should be navigated to the login page")
      .toBeTrue();
  })

  it("User should create new account from the my account page", async()=>{
    await myAccountPage.createNewAccount("firstname", "lastname", "email", "password", "password_confirmation");
    expect(await myAccountPage.$successMessage().isDisplayed())
      .withContext("New account should be created")
      .toBeTrue();
  })

  it("User should edit address from the my account page", async()=>{
    await myAccountPage.changeAddress();
    expect(await myAccountPage.$successMessage().isDisplayed())
      .withContext("New Address should be saved")
      .toBeTrue()
  })

  it("User should sign out to previous account", async () => {
    await landingPage.userSignout();
    expect(await landingPage.$signoutMessage().isDisplayed())
      .withContext("User is not signed out")
      .toBeTrue();
  });

  it("User should sign in using the previous credentials", async () => {
    await landingPage.userSignin("login[username]","login[password]");
    expect(await landingPage.$siginMessage().isDisplayed())
      .withContext("User is not signed in")
      .toBeTrue();
  });

  it("User should navigate to my orders", async ()=>{
    await myAccountPage.clickMyOrder();
    expect(await myAccountPage.$myOrderHeader().isDisplayed())
      .withContext("New Address should be saved")
      .toBeTrue()
  })

  it("User should view the previous orders", async()=>{
    await myAccountPage.viewOrder();
    expect(await myAccountPage.$orderedProduct().isDisplayed())
      .withContext("Product name should be displayed")
      .toBeTrue()

  })

  it("User should reorder the previously ordered product", async()=>{
    await myAccountPage.reorderProduct();
    expect(await cartPage.$cartHeader().isDisplayed())
      .withContext("User is navigated to the cart page")
      .toBeTrue()

  })
});