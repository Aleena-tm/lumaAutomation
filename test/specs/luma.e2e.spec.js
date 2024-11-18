import homePage from "../pageobjects/Luma/homePage.js";
import lumaData from "../testdata/lumaData.json";

describe("User account creation and log in", ()=>{
 it("To be able to load the URL", async ()=>{
    await homePage.loadPage();
    expect(await homePage.$pageHeader().isDisplayed())
    .withContext("Expected page should load correctly")
    .toBeTrue();
 });

 it("To be able to click on Create an Account", async ()=>{
   await homePage.clickCreateAccount();
   expect(await homePage.$createAccountPage().isDisplayed())
   .withContext("Expected page should load correctly")
   .toBeTrue();
 });

 it("To able to enter the details for account creation", async ()=>{
   await homePage.enterAccountDetails(
    "firstname",
    "lastname",
    "email_address",
    "password",
    "password-confirmation");
   expect(await homePage.$successMessage().isDisplayed())
   .withContext("User is succesfully Registered")
   .toBeTrue();

 });

 it("To be able to sign out succesfully and validate sign out message", async()=>{
   await homePage.userSignOut();
   expect(await homePage.$signOutMessage().isDisplayed())
   .withContext("User should be signed out")
   .toBeTrue();
 });

 it("To be able to sign in succesfully with the new user credentials", async()=>{
  await homePage.userSignIn("email","pass");
  expect(await homePage.$welcomeBanner().isDisplayed())
  .withContext("User should be signed in")
  .toBeTrue();
 })

})