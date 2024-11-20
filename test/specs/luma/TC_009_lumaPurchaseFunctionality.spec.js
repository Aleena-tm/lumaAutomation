/**
 * imports
 */
import homePage from "../../pageobjects/luma/homePage.js";
import productsPage from "../../pageobjects/luma/productsPage.js";
import checkoutPage from "../../pageobjects/luma/checkout.js";
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


describe("TC_009: Successfull purchasing of products from Luma", () => {
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

 it("User should navigate to a product category for purchasing", async ()=>{
    await homePage.searchWomenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  })

  it("User should add a product to the cart for purchasing", async()=>{
    await productsPage.addNewProductToCart();
    expect(await productsPage.$cartPopup().isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should select another product of different category for purchasing", async()=>{
      await homePage.searchMenAnotherProduct();
      expect(await homePage.$productsPageHeader().isDisplayed())
        .withContext("Product page should be displayed")
        .toBeTrue();
  })

  it("User should add another product to the cart for purchasing", async()=>{
    await productsPage.addNewMenProductToCart();
    expect(await productsPage.$cartPopup().isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should add the wishlisted product to the cart", async()=>{
    await productsPage.wishlistProductToCart();
    expect(await productsPage.$cartPopup().isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should navigate to another product category for purchasing", async ()=>{
    await homePage.searchWomenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  })

  it("User should add a product to the cart for purchasing", async()=>{
    await productsPage.addNewProductToCart();
    expect(await productsPage.$cartPopup().isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

  it("User should click on cart icon and proceed to checkout", async()=>{
    await productsPage.proceedToCheckout();
    expect(await productsPage.$proceedToCheckout().isDisplayed())
      .withContext("Proceed to checkout button should be present inside the cart popup")
      .toBeTrue();
  })

  it("User should edit quantity of products in the cart for purchasing", async()=>{
    await productsPage.editQuantityNumber();
    expect(await checkoutPage.$shippingHeader().isDisplayed())
      .withContext("User is navigated to the Checkout page")
      .toBeTrue();
  })

  it("User should navigate to payment page for purchasing of products", async()=>{
    await checkoutPage.moveToPaymentPage();
    expect(await checkoutPage.$reviewAndPayments().isDisplayed())
      .withContext("User is navigated to the Payment page")
      .toBeTrue();
  })

  it("User should place order to purchase the products", async()=>{
    await checkoutPage.placeOrder();
    expect(await checkoutPage.$thankyouPage().isDisplayed())
      .withContext("User is navigated to the Thankyou page")
      .toBeTrue();
  })
 
  it("User should return back to home page after completing purchase of the products", async()=>{
    await checkoutPage.continueShopping();
    expect(await homePage.$lumaIcon().isDisplayed())
      .withContext("User should be navigated to the home page")
      .toBeTrue();
  })
});