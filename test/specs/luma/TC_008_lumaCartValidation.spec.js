/**
 * imports
 */
import homePage from "../../pageobjects/luma/homePage.js";
import productsPage from "../../pageobjects/luma/productsPage.js";
import landingPage from "../../pageobjects/luma/landing.js";
import productDetailsPage from "../../pageobjects/luma/productDetails.js";
import cartPopupPage from "../../pageobjects/luma/cartPopup.js";
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

describe("TC_008: Successful validation of cart functionality of Luma", () => {
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

    it("User should search for a women product to add it to the cart and validate prodcts page header", async()=>{
        await homePage.searchWomenProduct();
        expect(await homePage.$productsPageHeader().isDisplayed())
          .withContext("Product page should be displayed")
          .toBeTrue();
      })
    
      it("User should click add to cart button for the product and navigate to the products details page", async()=>{
        await productsPage.addProductToCart();
        expect(await productDetailsPage.$addedToCartValidation().isDisplayed())
          .withContext("Product should be added to the cart")
          .toBeTrue();
      })
    
      it("User should select size and color of product to add it to the cart", async()=>{
        await productDetailsPage.addWomenProductToCart();
        expect(await productDetailsPage.$cartPopup().isDisplayed())
        .withContext("Product should be added to the cart")
        .toBeTrue();
      })
    
      it("User should select the cart popup and validate ", async()=>{
        await productDetailsPage.selectCartPopup();
        expect(await cartPopupPage.$cartProducts(userData.indexNumbers[0]).isDisplayed())
          .withContext("Product should be added to the cart")
          .toBeTrue();
      })
    
      it("User should delete products from cart", async()=>{
        await productDetailsPage.deleteCart();
        expect(await cartPopupPage.$deletedMsg().isDisplayed())
          .withContext("Product should be added to the cart")
          .toBeTrue();
      })
    
      it("User should return back tohome page", async()=>{
        await productDetailsPage.moveToHomePage();
        expect(await homePage.$lumaIcon().isDisplayed())
         .withContext("Product should be added to the cart")
         .toBeTrue();
      })
    
      it("User should search for a product of different category", async()=>{
          await homePage.searchMenAnotherProduct();
          expect(await homePage.$productsPageHeader().isDisplayed())
            .withContext("Product page should be displayed")
            .toBeTrue();
      })
    
      it("User should add another category product to the cart", async()=>{
        await productsPage.addMenProductToCart();
        expect(await productDetailsPage.$addedToCartValidation().isDisplayed())
          .withContext("Product should be added to the cart")
          .toBeTrue();
      })
    
      it("User should add multiple number of products to the cart", async()=>{
        await productDetailsPage.addProductsForMenToCart();
        expect(await productDetailsPage.$cartPopup().isDisplayed())
          .withContext("Multiple products should be added to the cart")
          .toBeTrue();
      })
    
      it("User should select cart popup", async()=>{
        await productDetailsPage.selectCartPopup();
        expect(await cartPopupPage.$cartProducts(userData.indexNumbers[0]).isDisplayed())
          .withContext("Product should be added to the cart")
          .toBeTrue();
      })
    
      it("User should delete products from cart", async()=>{
        await productDetailsPage.deleteCart();
        expect(await cartPopupPage.$deletedMsg().isDisplayed())
          .withContext("Message should be displayed")
          .toBeTrue();
      })
});