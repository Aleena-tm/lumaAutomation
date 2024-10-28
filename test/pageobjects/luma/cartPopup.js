import Common from "../luma/common.js";


class Cartpopup extends Common{
    constructor(){
        super();
        this.$cartPopup=()=>$(`//div[@data-block="minicart"]`);
        this.$productNameInCartPopup=()=>$(`//strong[@class="product-item-name"]//a`);
        this.$productPriceInCartPopup=()=>$(`//span[@class="minicart-price"]`);
        this.$subtotal=()=>$(`//div[@class="subtotal"]//span[@class="price"]`);
        this.$viewCart=()=>$(`//span[.="View and Edit Cart"]`);
    }

    /**
     * To validate the product details in mini cart
     * @returns string
     */
    async validateCartPopup(){
            let cartDetails=[];
            await this.scrollAndClick(this.$cartPopup());
             cartDetails = await Promise.all([
                this.$productNameInCartPopup().getText(),
                this.$productPriceInCartPopup().getText(),
                this.$subtotal().getText()
            ]);
            return cartDetails; 
        }

    /**
     * To move to cart page.
     */
    async moveToCartPage(){
        await this.scrollAndClick(this.$viewCart());
    }
}
 export default new Cartpopup();