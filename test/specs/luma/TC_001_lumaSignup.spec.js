/**
 * imports
 */
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

describe("TC_001: Successfull singup functionality of Luma", () => {
  it("Load URL of the webpage and the icon of luma should be displayed", async () => {
    await landingPage.loadURL();
    expect(await landingPage.$lumaIcon().isDisplayed())
      .withContext("Expected page should be loaded")
      .toBeTrue();
  });

  it("Verify that the user can create an account only by entering mandatory details and validate the error message", async () => {
    await landingPage.toVerifycreateAccount();
    expect(await landingPage.$enterMandatoryDetails().isDisplayed())
      .withContext("Error message should be displayed")
      .toBeTrue();
  });

  it("Verify that the Email field only takes valid input data and validate the error message", async () => {
    await landingPage.toVerifyValidEmail("firstname", "lastname", "email");
    expect(await landingPage.$enterValidEmail().isDisplayed())
      .withContext("Error message should be displayed")
      .toBeTrue();
  });

  it("Verify the weak strength of the password field and validate the error messages", async () => {
    errorMessages = await landingPage.validatePassword("password");
      if (passwordStrength === "weak") {
        expect(await landingPage.$passwordStrength().isDisplayed())
          .withContext(`Password strength should be strong`)
          .toBeTrue();
        expect(errorMessage)
          .toSatisfy(
            (msg) =>
              msg.includes("minimum length") ||
              msg.includes("different classes of characters"))
          .withContext(`Error message should be displayed`)
          .toBeTrue();
      } 
    });
      
  it("Verify the medium and strong strength of the password field and validate the error messages", async () => {
      if (passwordStrength === "medium") {
        expect(await landingPage.$passwordStrength().isDisplayed())
          .withContext(`Password strength should be medium`)
          .toBeTrue();
      } else {
        expect(await landingPage.$passwordStrength().isDisplayed())
          .withContext(`Password strength should be strong`)
          .toBeTrue();
      }
  });

  it("Create an account for the user and validate the success message", async () => {
    await landingPage.createAccount("firstname","lastname","email","password","password_confirmation");
    expect(await landingPage.$successMessage().isDisplayed())
      .withContext("User should be registered")
      .toBeTrue();
  });

  it("User should sign out and validate the signed out message", async () => {
    await landingPage.userSignout();
    expect(await landingPage.$signoutMessage().isDisplayed())
      .withContext("User should be signed out")
      .toBeTrue();
  });

  it("User should sign in using existing credentials and validate the sign in message", async () => {
    await landingPage.userSignin("login[username]","login[password]");
    expect(await landingPage.$siginMessage().isDisplayed())
      .withContext("User should signed in")
      .toBeTrue();
  });


});
