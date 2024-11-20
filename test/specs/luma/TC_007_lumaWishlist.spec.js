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

describe("TC_007: Successful validation of wishlist functionality of Luma", () => {
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
    
    it("User should navigate to a men product from home page and validate products page header", async()=>{
        await homePage.searchMenProduct();
        expect(await homePage.$productsPageHeader().isDisplayed())
          .withContext("Product page should be displayed")
          .toBeTrue();
      })
    
      it("User should validate product details and add it to the wishlist and validate wishlist page header", async()=>{
        nameAndPrice= await productsPage.validateProductPageDetails();
        await productsPage.addToWishList();
        expect(await productsPage.$wishlistHeader().isDisplayed())
          .withContext("Wishlist page should be displayed")
          .toBeTrue();
      })
    
      it("Verify the product name and price on the wishlist page", async()=>{
        wishListnameAndPrice = await productsPage.wishListValidationOfProductOne();
        expect(wishListnameAndPrice[0])
          .withContext("Name of the product should be same")
          .toEqual(nameAndPrice[0]);
        expect(wishListnameAndPrice[1])
          .withContext("Name of the product should be same")
          .toEqual(nameAndPrice[1]);
    
      })
    
      it("User should search for a product from gear category to add it to the wishlist", async () => {
        await homePage.searchGearProduct();
        expect(await homePage.$productsPageHeader().isDisplayed())
          .withContext("Product page should be displayed")
          .toBeTrue();
      });
    
      it("User should validate product details of another product and add the product to the wishlist", async()=>{
        nameAndPrice= await productsPage.validateProductPageDetails();
        await productsPage.addToWishList();
        expect(await productsPage.$wishlistHeader().isDisplayed())
          .withContext("Wishlist page should be displayed")
          .toBeTrue();
      })
    
      it("Verify the product name and price of the gear product on the wishlist page", async()=>{
        wishListnameAndPrice = await productsPage.wishListValidationOfProductTwo();
        expect(wishListnameAndPrice[0])
          .withContext("Name of the product should be same")
          .toEqual(nameAndPrice[0]);
        expect(wishListnameAndPrice[1])
          .withContext("Name of the product should be same")
          .toEqual(nameAndPrice[1]);
    
      })
    
      it("User should remove a product from the wishlist and validate the empty message", async()=>{
        await productsPage.removeWishlist();
        expect(await productsPage.$emptyMsg().isDisplayed())
          .withContext("Products should be removed from the wishlist")
          .toBeTrue();
      })
});