import Common from "../luma/common.js";
import userData from "../../testData/lumaData.json";

class ProductDetailsPage extends Common{
    constructor(){
        super();
        this.$productNameTitle=()=>$(`//h1[@class="page-title"]/span`);
        this.$productPrice=()=>$(`//div[@class="product-info-price"]//span[@class="price"]`);
        this.$colorsList=(data)=>$(`(//div[contains(@class,"swatch-attribute-options")])[${data}]`);
        this.$errorMessage=()=>$(`(//div[@class="mage-error"])[last()]`);
        this.$size=(data)=>$(`//div[.="${data}"]`);
        this.$color=(data)=>$(`//div[@option-label="${data}"]`);
        this.$quantity=()=>$(`//input[@type="number"]`);
        this.$cartNumber=()=>$(`//span[@class="counter-number" and text()="3"]`);
        this.$addToCartButton=()=>$(`//button[@id="product-addtocart-button"]`);
        this.$selectOptionsMessage=()=>$(`//div[@data-ui-id="message-notice"]`);
    }

    /**
     * To validate the product details present on the product details page.
     * @returns string
     */
    async validateProductDetailsPage() {
      await this.scrollAndClick(this.$productName(1));
      await this.$productNameTitle().waitForDisplayed({ timeout: 5000, timeoutMsg: "Product details page should be loaded" });
      let [name, price] = await Promise.all([
          this.$productNameTitle().getText(),
          this.$productPrice().getText()
      ]);
      await this.$addToCartButton().waitForDisplayed({ timeout: 5000, timeoutMsg: "Add to cart should be loaded" });
      return [name, price];
    }
  

    /**
     * To click on Add to cart
     */
    async validateAddToCart(){
      await this.scrollAndClick(this.$addToCartButton());
    }

    /**
     * To add products to the cart
     * @returns number
     */
    async addProductToCart(){
      await this.scrollAndClick(this.$size(userData.sizes[1]));
      await this.scrollAndClick(this.$color(userData.colors[1]));
      await this.$quantity().setValue(userData.quantities[1]);
      await this.clickElemenets(this.$addToCartButton());
      await this.$cartNumber().waitForDisplayed({timeout:5000, timeoutMsg:"Cart number should be displayed"});
      await this.$cartNumber().scrollIntoView();
      let quantity = parseInt(await this.$cartNumber().getText());
      return quantity;
    }

}
export default new ProductDetailsPage;