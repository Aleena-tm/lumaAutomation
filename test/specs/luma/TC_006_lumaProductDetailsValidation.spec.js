/**
 * imports
 */
import homePage from "../../pageobjects/luma/homePage.js";
import productsPage from "../../pageobjects/luma/productsPage.js";
import productDetailsPage from "../../pageobjects/luma/productDetails.js";
import cartPopupPage from "../../pageobjects/luma/cartPopup.js";
import cartPage from "../../pageobjects/luma/cartPage.js";
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

describe("TC_006: Successful validation of product details of Luma", () => {
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

    it("Verify the product details: size and color of a product present on the product page", async () => {
        nameAndPrice= await productsPage.validateProductPageDetails();
        expect(await productsPage.$sizeOptions(1).isDisplayed())
          .withContext("Size options should be displayed")
          .toBeTrue();
        expect(await productsPage.$colorOptions(1).isDisplayed())
          .withContext("Color options should be displayed")
          .toBeTrue();
      });
    
      it("verify the product details: add to cart option, add to wishlist option, add to compare option are present on the product page", async()=>{
        expect(await productsPage.$addToCart(1).isDisplayed())
          .withContext("Add to cart option should be displayed")
          .toBeTrue();
        expect(await productsPage.$addToWishList(1).isDisplayed())
          .withContext("Add to wishlist option should be displayed")
          .toBeTrue();
        expect(await productsPage.$addToCompare(1).isDisplayed())
          .withContext("Add to compare options should be displayed")
          .toBeTrue();
      });
    
      it("Verify the details: name and parice of a product present on the product details page is same as product page", async () => {
        productDetails= await productDetailsPage.validateProductDetailsPage();
        expect(productName)
          .withContext("Product names should be same")
          .toEqual(nameOfProduct);
        expect(productPrice)
          .withContext("Product prices should be same")
          .toEqual(priceOfProduct);
      });
    
        it("Verify the product details: size and color present on the product details page", async ()=>{
        expect(await productDetailsPage.$sizeOptions(1).isDisplayed())
          .withContext("Size options should be displayed")
          .toBeTrue();
        expect(await productDetailsPage.$colorsList(1).isDisplayed())
          .withContext("Color options should be displayed")
          .toBeTrue();
        });
    
        it("Verify the product details: add to cart option, add to wishlist option, add to compare option are present on the product details page", async()=>{
        expect(await productDetailsPage.$addToCart(1).isDisplayed())
          .withContext("Add to cart option should be displayed")
          .toBeTrue();
        expect(await productDetailsPage.$addToWishList(1).isDisplayed())
          .withContext("Add to wishlist option should be displayed")
          .toBeTrue();
        expect(await productDetailsPage.$addToCompare(1).isDisplayed())
          .withContext("Add to compare option should be displayed")
          .toBeTrue();
      });
    
      it("Verify the error message when product is added to cart without selecting size and color", async()=>{
        await productDetailsPage.validateAddToCart()
        expect(await productDetailsPage.$errorMessage().isDisplayed())
          .withContext("Error message should be displayed")
          .toBeTrue(); 
      });
    
      it("Verify adding product to the cart, by selecting the size, color and quantity of the product", async()=>{
        cartQuantity= await productDetailsPage.addProductToCart()
        expect(cartQuantity)
          .withContext("Products quantity on the should be same as the selected")
          .toEqual(productQuantity);
      });
    
      it("Verify the product details: name and price on the cart popup", async()=>{
        detailsOfCartPopup=await cartPopupPage.validateCartPopup();
        expect(nameMiniCart)
          .withContext("Product name should be same")
          .toEqual(nameOfProduct);
        expect(priceMiniCart)
          .withContext("Product price should be same")
          .toEqual(priceOfProduct);
      })
    
      it("User should navigate to the cart page and validate the cart page header", async()=>{
        await cartPopupPage.moveToCartPage();
        expect(await cartPage.$cartHeader().isDisplayed())
          .withContext("Cart page should be loaded")
          .toBeTrue();
      })
    
      it("Verify the product details on the cart page: name and price", async()=>{
        cartPageDetails = await cartPage.validateCartPage();
        expect(cartPageDetails[0])
          .withContext("The product name on the cart page should be same as the name of the product")
          .toEqual(nameAndPrice[0]);
        expect(cartPageDetails[1])
          .withContext("The product price on the cart page should be same as the price of the product")
          .toEqual(nameAndPrice[1]);
      })
    
      it("Verify the total price and quantity of the product on the cart page", async()=>{
        expect(cartPageDetails[2])
        .withContext("The total price on the cart page should be same as the price on the cart popup")
        .toEqual( detailsOfCartPopup[2]);
        expect(cartPageDetails[3])
        .withContext("The product quantity should be same the quantity of products selected")
        .toEqual(productQuantity);
      })
    
      it("User should navigate to the checkout page and validate the checkout page header", async()=>{
        await cartPage.moveToCheckoutPage();
        expect(await cartPage.$checkoutHeader().isDisplayed())
          .withContext("User should be navigated to the checkout page")
          .toBeTrue();
      })
    
      it("User should enter shipping address and navigate to payment page", async()=>{
        await checkoutPage.enterShippingDetails();
        expect(await checkoutPage.$reviewAndPayments().isDisplayed())
          .withContext("User should be navigated to the checkout page")
          .toBeTrue();
      })
    
      it("Verify the product name, quantity and price on the checkout page", async()=>{
        shippingProductDetails = await checkoutPage.verifyShippingDetails();
        expect(shippingProductDetails[0])
          .withContext("Product names should be same")
          .toEqual(nameAndPrice[0]);
        expect(shippingProductDetails[1])
          .withContext("Product quantities should be same")
          .toEqual(productQuantity);
        expect(shippingProductDetails[2])
          .withContext("Product total price should be same")
          .toEqual(detailsOfCartPopup[2]);
      })
    
      it("User should place order and validate thankyou page header", async()=>{
        await checkoutPage.placeOrder();
        expect(await checkoutPage.$thankyouPage().isDisplayed())
          .withContext("User should be navigated to the thankyou page")
          .toBeTrue();
      })
    
      it("User should navigate back to home page after completing checkout and navigate home page icon", async()=>{
        await checkoutPage.continueShopping();
        expect(await checkoutPage.$lumaIcon().isDisplayed())
          .withContext("User should be navigated to the thankyou page")
          .toBeTrue();
      })
    
});