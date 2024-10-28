import Common from "../luma/common.js";
import userData from "../../testData/lumaData.json";

class Homepage extends Common{
    constructor(){
        super();
        this.$category=(data)=>$(`//span[text()="${data}"]`);
        this.$subCategory=(data)=>$(`//li[contains(@class,"${data}")]`);
        this.$product=(data)=>$(`//li[contains(@class,"${data}")]`);
        this.$productsPageHeader=()=>$(`//span[@data-ui-id="page-title-wrapper"]`);
    }

    /**
     * To search for a product for women
     */
    async searchWomenProduct(){
        await this.hover(this.$category(userData.categoryWomen));
        await this.hover(this.$subCategory(userData.top));
        await this.clickElemenets(this.$product(userData.jacket));
    }

    /**
     * To search for a product for men
     */
    async searchMenProduct(){
        await this.hover(this.$category(userData.categoryMen));
        await this.hover(this.$subCategory(userData.bottom));
        await this.clickElemenets(this.$product(userData.pant));
        
    }

    /**
     * To search for a product from gear category
     */
    async searchGearProduct(){
        await this.hover(this.$category(userData.categoryGear));
        await this.clickElemenets(this.$product(userData.bag));
        
    }

}

export default new Homepage;