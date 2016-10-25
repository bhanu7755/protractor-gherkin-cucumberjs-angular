import { element, by, protractor, ElementArrayFinder } from 'protractor';
import Promise = webdriver.promise.Promise;

export class LoginPageObject {

    private form;
    private passwordInput;
    private emailInput;
    private submitButton;
    private goToForgotPasswordLink;
    private goToRegisterLink;
    private title;

    constructor() {

        // get the container wrapper
        this.form = element(by.id('login-form'));
        this.title = element(by.id('login-title'));
        this.passwordInput = this.form.element(by.id('login-password'));
        this.emailInput = this.form.element(by.id('login-email'));
        this.submitButton = this.form.element(by.id('login-submit'));

        this.goToForgotPasswordLink = element(by.id('login-forgot-password-link'));
        this.goToRegisterLink = element(by.id('login-register-link'));

    }

    navigateToForgotPasswordPage(): Promise<void> {
        return this.goToForgotPasswordLink.click();
    }

    navigateToRegisterPage(): Promise<void> {
        return this.goToRegisterLink.click();
    }

    setEmail(value: string): Promise<void> {
        return this.emailInput.clear().sendKeys(value);
    }

    setPassword(value: string): Promise<void> {
        return this.passwordInput.clear().sendKeys(value);
    }

    getTitle(): Promise<string> {
        return this.title.getText();
    }

    submitForm(): Promise<void> {
        return this.submitButton.sendKeys(protractor.Key.ENTER);
    }

    formIsValid(): Promise<boolean> {
        return this.getAllErrorMessages().count().then(value => {
            return value === 0;
        });
    }

    private getAllErrorMessages(): ElementArrayFinder {
        return element.all(by.css('.error-group'));
    }
}
