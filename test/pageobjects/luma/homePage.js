import Common from "./common.js";
import lumaData from "../../testdata/lumaData.json";
import emailGenerator from "../../helpers/emailGenerator.js";

let userEmail;

class Homepage extends Common {
  constructor() {
    super();
    this.$createAccountPage = () =>
      $('//span[@data-ui-id="page-title-wrapper"]');
    this.$createAccount = () =>
      $('(//div[@class="panel header"]//a[text()="Create an Account"][1])');
    this.$enterDetails = data => $(`//input[@id="${data}"]`);
    this.$submit = () => $('//button[@title="Create an Account"]');
    this.$successMessage = () => $('//div[@data-ui-id="message-success"]');
    this.$actionbutton = () => $('(//button[@class="action switch"])[1]');
    this.$signOut = () =>
      $('(//div[@class="customer-menu"]//a[normalize-space()="Sign Out"])[1]');
    this.$signOutMessage = () => $('//span[text()="You are signed out"]');
    this.$signIn = () =>
      $('//div[@class="panel header"]//a[normalize-space()="Sign In"]');
    this.$signInButton = () => $('//button[@class="action login primary"]');
    this.$welcomeBanner = () =>
      $('//div[@class="panel header"]//li[@class="greet welcome"]');
  }

  /**
   * To click on create Account
   */
  async clickCreateAccount() {
    await this.$createAccount().click();
  }

  /**
   * /**
   * To Enter account details
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} password
   * @param {string} passwordConfirm
   */
  async enterAccountDetails(
    firstName,
    lastName,
    email,
    password,
    passwordConfirm
  ) {
    userEmail = emailGenerator.generateRandomEmail();
    await this.$enterDetails(firstName).setValue(lumaData.firstName);
    await this.$enterDetails(lastName).setValue(lumaData.lastName);
    await this.$enterDetails(email).setValue(userEmail);
    await this.$enterDetails(password).setValue(lumaData.password);
    await this.$enterDetails(passwordConfirm).setValue(
      lumaData.passwordConfirm
    );
    await this.$submit().click();
    await this.$successMessage().waitForDisplayed({
      timeOut: 5000,
      timeOutmsg: "User should be registered",
    });

    
  }

  async userSignOut() {
    await this.$actionbutton().click();
    await this.$signOut().click();
    await this.$signOutMessage().waitForDisplayed({ timeOut: 2000 });
  }

  async userSignIn(email, passWord) {
    await this.$signIn().click();
    await this.$enterDetails(email).setValue(userEmail);
    await this.$enterDetails(passWord).setValue(lumaData.password);
    await this.$signInButton().click();
    await this.$welcomeBanner().waitForDisplayed({ timeout: 5000 });
  }
}
export default new Homepage();
