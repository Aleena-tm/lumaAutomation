import Common from "../luma/common.js";
import userData from "../../testData/lumaData.json";

class Checkoutpage extends Common{
    constructor(){
        super();
        this.$checkoutHeader=()=>$(`//div[.="Shipping Address"]`);
        this.$newAddress=()=>$(`//div[@class="new-address-popup"]//span[.="New Address"]`);
        this.$enterShippingDetails=data=>$(`(//input[@class="input-text"])[${data}]`);
        this.$selectStateAndCountry=data=>$(`//select[@name="${data}"]`);
        this.$stateAndCountry=data=>$(`//option[.="${data}"]`);
        this.$next=()=>$(`//button[@type="submit"]/span[.="Next"]`);
        this.$reviewAndPayments=()=>$(`//ul[@class="opc-progress-bar"]//span[.="Review & Payments"]`);
        this.$nameOnCheckoutPage=()=>$(`//div[@class="product-item-name-block"]/strong`);
        this.$quantityOnCheckout=()=>$(`//div[@class="product-item-name-block"]//span[@class="value"]`);
        this.$totalOnCheckout=()=>$(`//div[@class="subtotal"]//span[@class="price"]`);
        this.$viewDetails=()=>$(`//div[@class="product options"]`);
        this.$sizeAndColorCheckout=data=>$(`(//dl[@class="item-options"]//dd[@class="values"])[${data}]`);
        this.$thankyouPage=()=>$(`//span[.="Thank you for your purchase!"]`);
    }

    /**
     * To enter shipping details of the user.
     */
    async enterShippingDetails()
    {
        let newAddressElement = this.$newAddress();
        if (!(await newAddressElement.isDisplayed())) {
        await this.$enterShippingDetails(userData.indexNumbers[2]).setValue(userData.first_name);
        await this.$enterShippingDetails(userData.indexNumbers[3]).setValue(userData.last_name);
        await this.$enterShippingDetails(userData.indexNumbers[4]).setValue(userData.address);
        await this.$enterShippingDetails(userData.indexNumbers[5]).setValue(userData.city);
        await this.clickElemenets(this.$selectStateAndCountry(userData.states[0]));
        await this.clickElemenets(this.$stateAndCountry(userData.stateAndCountry[0]));
        await this.$enterShippingDetails(userData.indexNumbers[6]).setValue(userData.zip);
        await this.clickElemenets(this.$selectStateAndCountry(userData.states[1]));
        await this.clickElemenets(this.$stateAndCountry(userData.stateAndCountry[1]));
        await this.$enterShippingDetails(userData.indexNumbers[7]).setValue(userData.phone);
        await this.scrollAndClick(this.$next());
        await this.$reviewAndPayments().waitForDisplayed({timeout:5000,timeoutMsg:"Review and payments should be visible"});
        }
        await this.scrollAndClick(this.$next());
        await this.$reviewAndPayments().waitForDisplayed({timeout:5000,timeoutMsg:"Review and payments should be visible"});
    }
    /**
     * To verify the shipping details of the product
     * @returns string
     */
    async verifyShippingDetails() {
        let shippingPageDetails = await Promise.all([
            this.$nameOnCheckoutPage().getText(),
            this.$quantityOnCheckout().getText(),
            // await this.scrollAndClick(this.$viewDetails()),
            // this.$totalOnCheckout().getText(), 
            // this.$sizeAndColorCheckout(userData.indexNumbers[0]).getText(),
            // this.$sizeAndColorCheckout(userData.indexNumbers[1]).getText(),
        ]);
        // await this.$thankyouPage().waitForDisplayed({ timeout: 5000, timeoutMsg: "Thank you page should be present" });
        console.log(shippingPageDetails);
        return shippingPageDetails;
    }
    
}
export default new Checkoutpage();