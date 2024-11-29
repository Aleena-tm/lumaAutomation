import homePage from "../../pageobjects/Luma/homePage.js";


describe("TC001:To verify that user is able to create an account and login succesfully", () => {
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

});