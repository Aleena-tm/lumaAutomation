import homePage from "../../pageobjects/Luma/homePage.js";

describe("TC003: To verify user is able to select a product and add it to the cart and checkout", () => {
  it("To be able to load the URL", async () => {
    await homePage.loadPage();
    expect(await homePage.$pageHeader().isDisplayed())
      .withContext("Expected page should load correctly")
      .toBeTrue();
  });

  it("To be able to click on Create an Account", async () => {
    await homePage.clickCreateAccount();
    expect(await homePage.$createAccountPage().isDisplayed())
      .withContext("Expected page should load correctly")
      .toBeTrue();
  });

  it("To able to enter the details for account creation", async () => {
    await homePage.enterAccountDetails(
      "firstname",
      "lastname",
      "email_address",
      "password",
      "password-confirmation"
    );
    expect(await homePage.$successMessage().isDisplayed())
      .withContext("User need to be succesfully registered")
      .toBeTrue();
  });
  it("To able to search for a product and view the page is loaded for the search result", async () => {
    await homePage.searchProduct("search");
    expect(await homePage.$searchResultBanner().isDisplayed())
      .withContext("user expected to view the searched product")
      .toBeTrue();
  });

  it("To able to select one product and add it to the cart", async () => {
    await homePage.addToCart();
    expect(await homePage.$addToCartMessage().isDisplayed())
      .withContext("The product need to be added in the cart")
      .toBeTrue();
  });
  it("To able to check out from the cart", async () => {
    await homePage.checkOut();
    expect(await homePage.$checkOutMessage().isDisplayed())
      .withContext("User expected to get checked out")
      .toBeTrue();
  });
});
