/**
 * imports
 */
import landingPage from "../pageobjects/luma/landing.js";
import homePage from "../pageobjects/luma/homePage.js";
import productsPage from "../pageobjects/luma/productsPage.js";
import userData from "../testData/lumaData.json";
import productDetailsPage from "../pageobjects/luma/productDetails.js";
import cartPopupPage from "../pageobjects/luma/cartPopup.js";
import cartPage from "../pageobjects/luma/cartPage.js";
import checkoutPage from "../pageobjects/luma/checkout.js";

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

describe("End to end workflow for Luma", () => {
  it("Load URL of the webpage", async () => {
    await landingPage.loadURL();
    expect(await landingPage.$lumaIcon().isDisplayed())
      .withContext("Expected page is not loaded")
      .toBeTrue();
  });

  it("Verify that the user can create an account only by entering mandatory details", async () => {
    await landingPage.toVerifycreateAccount();
    expect(await landingPage.$enterMandatoryDetails().isDisplayed())
      .withContext("Error message is not displayed")
      .toBeTrue();
  });

  it("Verify that the Email field only takes valid input data", async () => {
    await landingPage.toVerifyValidEmail(
      userData.first_name,
      userData.last_name,
      userData.invalid_email
    );
    expect(await landingPage.$enterValidEmail().isDisplayed())
      .withContext("Error message is not displayed")
      .toBeTrue();
  });

  it("Verify the strength of the password field", async () => {
    for (password of userData.password_list) {
    errorMessages = await landingPage.validatePassword(password);
      if (passwordStrength === "weak") {
        expect(await landingPage.$passwordStrength().isDisplayed())
          .withContext(`Password strength should be strong`)
          .toBeTrue();
        expect(errorMessage)
          .toSatisfy(
            (msg) =>
              msg.includes("minimum length") ||
              msg.includes("different classes of characters")
          )
          .withContext(`Error message should be displayed`);
      } else if (passwordStrength === "medium") {
        expect(await landingPage.$passwordStrength().isDisplayed())
          .withContext(`Password strength should be medium`)
          .toBeTrue();
      } else {
        expect(await landingPage.$passwordStrength().isDisplayed())
          .withContext(`Password strength should be strong`)
          .toBeTrue();
      }
    }
  });

  it("Create an account for the user", async () => {
    await landingPage.createAccount(
      userData.first_name,
      userData.last_name,
      userData.password_,
      userData.confirm_password
    );
    expect(await landingPage.$successMessage().isDisplayed())
      .withContext("User is not registered")
      .toBeTrue();
  });

  it("User should sign out", async () => {
    await landingPage.userSignout();
    expect(await landingPage.$signoutMessage().isDisplayed())
      .withContext("User is not signed out")
      .toBeTrue();
  });

  it("User should sign in using existing credentials", async () => {
    await landingPage.userSignin(userData.password_);
    expect(await landingPage.$siginMessage().isDisplayed())
      .withContext("User is not signed in")
      .toBeTrue();
  });

  it("User should search for a product from men category at the navigation bar", async () => {
    await homePage.searchMenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  });

  it("User should search for a product from gear category at the navigation bar", async () => {
    await homePage.searchGearProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  });

  it("User should search for a product from women category at the navigation bar", async () => {
    await homePage.searchWomenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  });

  it("User should filter products according to style", async () => {
    for (filterOption of userData.filterOptionsListStyle) {
      await productsPage.selectFilterStyle(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext(`Product page should be displayed for the selected filter`)
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to size", async () => {
    for (filterOption of userData.filterOptionsSize) {
      await productsPage.selectFilterSize(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to climate", async () => {
    for (filterOption of userData.filterOptionsClimate) {
      await productsPage.selectFilterClimate(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to color", async () => {
    for (filterOption of userData.filterOptionsColor) {
      await productsPage.selectFilterColor(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to eco collection", async () => {
    await productsPage.selectFilterEcoCollection();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to erin recommends", async () => {
    await productsPage.selectFilterErinRecommends();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to material", async () => {
    for (filterOption of userData.filterOptionsMaterial) {
      await productsPage.selectFilterMaterial(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to new", async () => {
    await productsPage.selectFilterNew();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to pattern", async () => {
    for (filterOption of userData.filterOptionsPattern) {
      await productsPage.selectFilterPattern(filterOption);
      expect(await productsPage.$filterHeader().isDisplayed())
        .withContext("Product page should be displayed for the selected filter")
        .toBeTrue();
      await productsPage.clearFilter();
      expect(await productsPage.$clearFilterValidation().isDisplayed())
        .withContext(`Selected filter options should be cleared`)
        .toBeTrue();
    }
  });

  it("User should filter products according to performance fabric", async () => {
    await productsPage.selectFilterPerformanceFabric();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to price", async () => {
    await productsPage.selectFilterPrice();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to sale", async () => {
    await productsPage.selectFilterSale();
    expect(await productsPage.$filterHeader().isDisplayed())
      .withContext("Product page should be displayed for the selected filter")
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("User should filter products according to all the filter options", async () => {
    await productsPage.selectAllFilters();
    expect(await productsPage.$filtersChoosed().isDisplayed())
      .withContext(
        "Product page should be displayed for all the selected filter"
      )
      .toBeTrue();
    await productsPage.clearFilter();
    expect(await productsPage.$clearFilterValidation().isDisplayed())
      .withContext(`Selected filter options should be cleared`)
      .toBeTrue();
  });

  it("Verify the user can sort the products according to product name", async () => {
    isSorted = await productsPage.sortByNames();
    expect(isSorted)
      .withContext("Product names should be sorted in ascending order")
      .toBeTrue();
  });

  it("Verify the user can sort the products according to price", async () => {
    isSorted = await productsPage.sortByPrice();
    expect(isSorted)
      .withContext("Products should be sorted according to price")
      .toBeTrue();
  });

  it("Verify the user can sort the products according to position", async () => {
    productNames = await productsPage.sortByPosition();
    expect(productNames)
      .withContext("Products should be sorted according to position")
      .toEqual(userData.nameOfProducts);
  });

  it("Verify the functionality of the view mode: List view", async () => {
    value = await productsPage.setListView();
    expect(value)
      .withContext("Products should be viewed as List view")
      .toContain("active");
  });

  it("Verify the functionality of the view mode: Grid view", async () => {
    value = await productsPage.setGridView();
    expect(value)
      .withContext("Products should be viewed as Grid view")
      .toContain("active");
  });

  it("Verify the product details of a product present on the product page", async () => {
    nameAndPrice= await productsPage.validateProductPageDetails();
    expect(await productsPage.$sizeOptions(1).isDisplayed())
      .withContext("Size options should be displayed")
      .toBeTrue();
    expect(await productsPage.$colorOptions(1).isDisplayed())
      .withContext("Color options should be displayed")
      .toBeTrue();
  });

  it("verify the product details present on the product page", async()=>{
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

  it("Verify the details of a product present on the product details page is same as product page", async () => {
    productDetails= await productDetailsPage.validateProductDetailsPage();
    expect(productName)
      .withContext("Product names should be same")
      .toEqual(nameOfProduct);
    expect(productPrice)
      .withContext("Product prices should be same")
      .toEqual(priceOfProduct);
  });

    it("Verify the product details present on the product details page", async ()=>{
    expect(await productDetailsPage.$sizeOptions(1).isDisplayed())
      .withContext("Size options should be displayed")
      .toBeTrue();
    expect(await productDetailsPage.$colorsList(1).isDisplayed())
      .withContext("Color options should be displayed")
      .toBeTrue();
    });

    it("Verify the product details of the product on product details page", async()=>{
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
      .withContext("Products should be added to the cart")
      .toEqual(productQuantity);
  });

  it("Verify the product details on the cart popup", async()=>{
    detailsOfCartPopup=await cartPopupPage.validateCartPopup();
    expect(nameMiniCart)
      .withContext("Product name should be same")
      .toEqual(nameOfProduct);
    expect(priceMiniCart)
      .withContext("Product price should be same")
      .toEqual(priceOfProduct);
  })

  it("User should navigate to the cart page", async()=>{
    await cartPopupPage.moveToCartPage();
    expect(await cartPage.$cartHeader().isDisplayed())
      .withContext("Cart page should be loaded")
      .toBeTrue();
  })

  it("Verify the product details on the cart page", async()=>{
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

  it("User should navigate to the checkout page", async()=>{
    await cartPage.moveToCheckoutPage();
    expect(await cartPage.$checkoutHeader().isDisplayed())
      .withContext("User should be navigated to the checkout page")
      .toBeTrue();
  })

  it("User should enter shipping address", async()=>{
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

  it("User should place order and move to thankyou page", async()=>{
    await checkoutPage.placeOrder();
    expect(await checkoutPage.$thankyouPage().isDisplayed())
      .withContext("User should be navigated to the thankyou page")
      .toBeTrue();
  })

  it("User should navigate back to home page after completing checkout", async()=>{
    await checkoutPage.continueShopping();
    expect(await checkoutPage.$lumaIcon().isDisplayed())
      .withContext("User should be navigated to the thankyou page")
      .toBeTrue();
  })

  it("User should navigate to a product from home page", async()=>{
    await homePage.searchMenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  })

  it("User should validate product details and add it to the wishlist", async()=>{
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

  it("User should validate product details and add the product to the wishlist", async()=>{
    nameAndPrice= await productsPage.validateProductPageDetails();
    await productsPage.addToWishList();
    expect(await productsPage.$wishlistHeader().isDisplayed())
      .withContext("Wishlist page should be displayed")
      .toBeTrue();
  })

  it("Verify the product name and price on the wishlist page", async()=>{
    wishListnameAndPrice = await productsPage.wishListValidationOfProductTwo();
    expect(wishListnameAndPrice[0])
      .withContext("Name of the product should be same")
      .toEqual(nameAndPrice[0]);
    expect(wishListnameAndPrice[1])
      .withContext("Name of the product should be same")
      .toEqual(nameAndPrice[1]);

  })

  it("User should remove the product from wishlist", async()=>{
    await productsPage.removeWishlist();
    expect(await productsPage.$emptyMsg().isDisplayed())
      .withContext("Products should be removed from the wishlist")
      .toBeTrue();
  })

  it("User should search for a product to add it to the cart", async()=>{
    await homePage.searchWomenProduct();
    expect(await homePage.$productsPageHeader().isDisplayed())
      .withContext("Product page should be displayed")
      .toBeTrue();
  })

  it("User should validate product details and add the product to the wishlist", async()=>{
    await productsPage.addProductToCart();
    expect(await productDetailsPage.$selectOptionsMessage().isDisplayed())
      .withContext("Product should be added to the cart")
      .toBeTrue();
  })

 
  

 


});
