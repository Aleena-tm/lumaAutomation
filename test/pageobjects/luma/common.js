export default class Common{
    constructor(){
        this.$pageHeader=()=> $(`//a[@class="logo"]`);

    }
    /**
     * To load the URL
     */

    async loadPage(){
        await browser.maximizeWindow();
        await browser.url('https://magento.softwaretestingboard.com/');
        // await this.$lumaIcon().waitForDisplayed({timeout:5000, timeoutMsg:"Luma icon should be displayed"});
    }
    
    /**
     * To click an element
     * @param {string} locator 
     */
    async clickElemenets(locator){
        await locator.click();
    }

    /**
     * To scroll and click a locator
     * @param {string} locator 
     */
    async scrollAndClick(locator){
        await locator.scrollIntoView();
        // await locator.waitForClickable({timeout: 5000, timeoutMsg: "Button is still not loaded"});
        await locator.click();
    }

    /**
     * To hover over a locator
     * @param {string} locator 
     */
    async hover(locator){
        await locator.moveTo();
    }
    
    
}