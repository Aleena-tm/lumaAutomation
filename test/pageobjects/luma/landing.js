import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const credentialsFilePath = path.join(__dirname, '../../testData/credentials.json');
 
import Common from "../luma/common.js";
import userData from "../../testData/lumaData.json";
import credentialData from "../../testData/credentials.json";
// const userEmail= "";


class Landingpage extends Common {
  constructor() {
    super();
    this.userEmail= "";
    this.$createUserAccount = () => $(`(//a[text()="Create an Account"])[1]`);
    this.$enterMandatoryDetails = () => $(`//div[@id="email_address-error"]`);
    this.$errorMessageForPassword=()=> $(`//div[@id="password-error"]`);
    this.$passwordStrength=()=>$(`//span[@id="password-strength-meter-label"]`);
    this.$enterValidEmail = () => $(`//div[@for="email_address"]`);
    this.$signout = () => $(`(//button[@class="action switch"])[1]`);
    this.$selectSignout = () =>
      $(`(//div[@class="customer-menu"]//a[normalize-space()="Sign Out"])[1]`);
    this.$signoutMessage = () => $(`//span[text()="You are signed out"]`);
    this.$signin = () =>
      $(`//div[@class="panel header"]//a[normalize-space()="Sign In"]`);
    this.$siginButton = () =>
      $(`//fieldset[@class="fieldset login"]//span[text()="Sign In"]`);
    this.$siginMessage = () => $(`//div[@class="panel header"]`);

  }

  /**
   * To verify mandatory fileds
   */
  async toVerifycreateAccount() {
    await this.scrollAndClick(this.$createUserAccount());
    await this.scrollAndClick(this.$submit());
  }

  /**
   * 
   * @param {string} password 
   */
  async validatePassword(enterPassword) {
    let results = [];

    for (let password of userData.password_list) {
        await this.$enterDetails(enterPassword).setValue(password);
        let [errorMessageOfPassword, passwordStrengths] = await Promise.all([
            this.$errorMessageForPassword().getText(),
            this.$passwordStrength().getText()
        ]);
        results.push({ password, errorMessageOfPassword, passwordStrengths });
        await this.$enterDetails(enterPassword).clearValue();  
    }
    return results;
}


  /**
   * To verify valid email
   * @param {string} firstname
   * @param {string} lastname
   * @param {string} invalid_email
   */
  async toVerifyValidEmail(firstName, lastName, email) {
    await this.$enterDetails(firstName).setValue(userData.first_name);
    await this.$enterDetails(lastName).setValue(userData.last_name);
    await this.$enterDetails(email).setValue(userData.invalid_email);
    await this.scrollAndClick(this.$submit());
  }

  /**
   * To enter details of a user for creating account.
   * @param {string} firstname
   * @param {string} lastname
   * @param {string} password
   * @param {string} confirmPassword
   */
  async createAccount(firstName, lastName, email, password, confirmPassword) {
    let emailPrefix = Math.floor(Math.random() * 10000);
    this.userEmail = `tyul${emailPrefix}@gmail.com`;

    let credentials={
      userName: this.userEmail,
      passWord: userData.password_
    }
    fs.writeFileSync(credentialsFilePath, JSON.stringify(credentials, null, 2), 'utf-8');

    await this.$enterDetails(firstName).setValue(userData.first_name);
    await this.$enterDetails(lastName).setValue(userData.last_name);
    await this.$enterDetails(email).setValue(this.userEmail);
    await this.$enterDetails(password).setValue(userData.password_);
    await this.$enterDetails(confirmPassword).setValue(userData.confirm_password);
    await this.scrollAndClick(this.$submit());
    await this.$successMessage().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "User account is not created",
    });

    // return userEmail;
  }

  /**
   * To sign out the user
   */
  async userSignout() {
    await this.scrollAndClick(this.$signout());
    await this.scrollAndClick(this.$selectSignout());
    await this.$signoutMessage().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "User is not signed out",
    });
  }

  /**
   * To enter sigin credentailas
   * @param {string} password
   */
  async userSignin(username,passwordText) {
    
    await this.scrollAndClick(this.$signin());
    await this.$enterDetails(username).waitForDisplayed({timeout:5000, timeoutMsg:"Username filed shouls be displayed"});
    await this.$enterDetails(username).setValue(credentialData.userName);
    await this.$enterDetails(passwordText).waitForDisplayed({timeout:5000, timeoutMsg:"Username filed shouls be displayed"});
    await this.$enterDetails(passwordText).setValue(credentialData.passWord);
    await this.scrollAndClick(this.$siginButton());
    await this.$siginMessage().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "User is not signed in",
    });
  }
}

export default new Landingpage();
