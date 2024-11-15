import Common from "../luma/common.js";
import userData from "../../testData/lumaData.json";

class Landingpage extends Common {
  constructor() {
    super();
    this.userEmail = null;
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
    await this.$enterMandatoryDetails().waitForDisplayed({timeout:5000, timeoutMsg: "Header should be displayed"});
  }

  /**
   * 
   * @param {string} password 
   */
  async validatePassword(passwordtext) {
    let results = []; 
    for (let password of userData.password_list) {
      await this.$enterDetails(passwordtext).setValue(password);
      let [errorMessageOfPassword, passwordStrengths] = await Promise.all([
        this.$errorMessageForPassword().getText(),
        this.$passwordStrength().getText(),
      ]);
      await this.$enterDetails(passwordtext).clearValue();
      results.push({errorMessageOfPassword, passwordStrengths });
    }
    return results; 
  }
  


  /**
   * To verify valid email
   * @param {string} firstname
   * @param {string} lastname
   * @param {string} invalid_email
   */
  async toVerifyValidEmail(firstname, lastname, email) {
    await this.$enterDetails(firstname).setValue(userData.first_name);
    await this.$enterDetails(lastname).setValue(userData.last_name);
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
  async createAccount(firstname, lastname, email, password, confirmPassword) {
    let emailPrefix = Math.floor(Math.random() * 10000);
    this.userEmail = `exj${emailPrefix}@gmail.com`;

    await this.$enterDetails(firstname).setValue(userData.first_name);
    await this.$enterDetails(lastname).setValue(userData.last_name);
    await this.$enterDetails(email).setValue(this.userEmail);
    await this.$enterDetails(password).setValue(userData.password_);
    await this.$enterDetails(confirmPassword).setValue(userData.confirm_password);
    await this.scrollAndClick(this.$submit());
    await this.$successMessage().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "User account is not created",
    });

    return this.userEmail;
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
  async userSignin(password) {
    const emailAddress = this.userEmail;

    await this.scrollAndClick(this.$signin());
    await this.$enterDetails(userData.email_sigin).setValue(emailAddress);
    await this.$enterDetails(userData.password_sigin).setValue(password);
    await this.scrollAndClick(this.$siginButton());
    await this.$siginMessage().waitForDisplayed({
      timeout: 3000,
      timeoutMsg: "User is not signed in",
    });
  }
}

export default new Landingpage();
