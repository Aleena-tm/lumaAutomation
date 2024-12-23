import Common from "../luma/common.js";
import userData from "../../testData/lumaData.json";

class Checkoutpage extends Common{
    constructor(){
        super();
        this.$newAddress=()=>$(`//div[@class="new-address-popup"]//span[.="New Address"]`);
        this.$enterShippingDetails=data=>$(`(//input[@class="input-text"])[${data}]`);
        this.$next=()=>$(`//button[@type="submit"]/span[text()="Next"]`);
        this.$reviewAndPayments=()=>$(`//div[text()="Payment Method"]`);
        this.$viewCartDetails=()=>$(`//div[@class="block items-in-cart"]`);
        this.$nameOnCheckoutPage=()=>$(`//strong[@class="product-item-name"]`);
        this.$quantityOnCheckout=()=>$(`//div[@class="details-qty"]//span[@class="value"]`);
        this.$totalOnCheckout=()=>$(`//span[@class="cart-price"]/span`);
        this.$viewDetails=()=>$(`//div[@class="product options"]/span`);
        this.$sizeAndColorCheckout=data=>$(`(//dl[@class="item-options"]//dd[@class="values"])[${data}]`);
        this.$placeOrder=()=>$(`//span[text()="Place Order"]`);
        this.$thankyouPage=()=>$(`//h1[@class="page-title"]`);
        this.$orderDetails=()=>$(`//strong[text()="Order Total"]`);
        this.$shippingMethod=()=>$(`(//input[@class="radio"])[1]`);
        this.$shoppingContinue=()=>$(`//a//span[text()="Continue Shopping"]`);
        this.$shippingHeader=()=>$(`//div[text()="Shipping Address"]`);
        this.$orderNumber=()=>$(`//a[@class="order-number"]/strong`);
        this.$print=()=>$(`//a[@class="action print"]`);
        this.$popupCancel=()=>$('//button[@type="button"]/span[.="Cancel"]');
        this.$receiptOrderNumber=()=>$(`//h1[@class="page-title"]/span`);
        
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
        await this.$enterShippingDetails(userData.indexNumbers[4]).scrollIntoView();
        await this.$enterShippingDetails(userData.indexNumbers[4]).setValue(userData.address);
        await this.$enterShippingDetails(userData.indexNumbers[5]).setValue(userData.city);
        await this.clickElemenets(this.$selectStateAndCountry(userData.states[0]));
        await this.clickElemenets(this.$stateAndCountry(userData.stateAndCountry[0]));
        await this.$enterShippingDetails(userData.indexNumbers[6]).setValue(userData.zip);
        await this.clickElemenets(this.$selectStateAndCountry(userData.states[1]));
        await this.clickElemenets(this.$stateAndCountry(userData.stateAndCountry[1]));
        await this.$enterShippingDetails(userData.indexNumbers[7]).setValue(userData.phone);
        await browser.pause(3000);
        await this.scrollAndClick(this.$shippingMethod());
        await browser.pause(3000);
        await this.$next().waitForDisplayed({timeout: 10000, timeoutMsg: "Button is still not loaded"});
        await browser.pause(3000);
        await this.scrollAndClick(this.$next());
        await browser.pause(3000);
        await this.$spinner().waitForDisplayed({reverse:true});
        await this.$reviewAndPayments().waitForDisplayed({timeout:5000,timeoutMsg:"Review and payments should be visible"});

        }
        else{
        await this.$next().waitForDisplayed({timeout: 10000, timeoutMsg: "Element is not displayed after 10 seconds."})
        await this.scrollAndClick(this.$next());
        await this.$spinner().waitForDisplayed({reverse:true});
        await this.$reviewAndPayments().waitForDisplayed({timeout:5000,timeoutMsg:"Review and payments should be visible"});
        }
    }

     /**
     * To verify the shipping details of the product
     * @returns string
     */
     async verifyShippingDetails() {
        let cartDetails = this.$viewCartDetails();
        if (await cartDetails.isDisplayed()) {
            await this.scrollAndClick(cartDetails);
        }
        let shippingDetails = [];
        shippingDetails.push(await this.$nameOnCheckoutPage().getText());
        shippingDetails.push(parseInt(await this.$quantityOnCheckout().getText()));
        shippingDetails.push(await this.$totalOnCheckout().getText());
        
        return shippingDetails;
    }

    /**
     * To place order and validate the order number
     * @returns number
     */
    async placeOrder(){
        await this.scrollAndClick(this.$placeOrder());
        await this.$thankyouPage().waitForDisplayed({ timeout: 5000, timeoutMsg: "Thank you page should be displayed" });
        let orderNumberText = await this.$orderNumber().getText();
        let orderNumber = parseInt(orderNumberText);
        await this.$print().waitForDisplayed({timeout: 10000, timeoutMsg: "Thank you page should be displayed" });
        return orderNumber;
    }

    /**
     * To click on continue shopping
     */
    async continueShopping(){
        await this.scrollAndClick(this.$shoppingContinue());
    }

    /**
     * To move to payment page
     */
    async moveToPaymentPage(){
        await this.scrollAndClick(this.$next());
        await this.$spinner().waitForDisplayed({timeout:5000,reverse:true});
        await this.$reviewAndPayments().waitForDisplayed({timeout:10000, timeoutMsg:"Should load payment page"});
    }

    /**
     * To click on print rceipt option
     */
    async clickPrintReceipt(){
        await this.scrollAndClick(this.$print());
        // await this.$popupCancel().waitForDisplayed({timeout:10000, timeoutMsg:"Cancel button should be displayed"});
    }

    /**
     * To validate the order number present on the receipt
     * @returns number
     */
    async printReceipt(){
        // await this.$popupCancel().waitForDisplayed({timeout:3000, timeoutMsg:"Cancel button should be displayed"});
        // await this.$popupCancel().waitForClickable({timeout:3000, timeoutMsg:"Cancel button should be clickable"});
        // await this.clickElemenets(this.$popupCancel());
        await this.$receiptOrderNumber().waitForDisplayed({timeout:10000, timeoutMsg:"order number should be displayed"});
        let orderNumberText = await this.$receiptOrderNumber().getText();
        let orderNumber = orderNumberText.slice(orderNumberText.indexOf('#') + 2).trim();
        let numericOrderNumber = parseInt(orderNumber);
        return numericOrderNumber;
    }
    
    

}
export default new Checkoutpage();