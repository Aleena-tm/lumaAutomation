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
    }

    // async scrollAndClick(locator){
    //     await locator.scrollIntoView({ block: 'center'});
    //     await locator.click();
    
    // }
}