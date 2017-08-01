import { browser, element, by } from 'protractor';

export class ClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.className('text-center')).getText();
  }

  getNavbarelement() {
    return element(by.id("navbar-no-loggedID"));
  }

  getRegisterLink() {
    return element(by.id("register-link-id"));
  }

  getRegisterModal() {
    return element(by.id("register-modal-id"));
  }

  getInputEmail() {
    return element(by.id("input-email-id"));
  }

  getInputRepatEmail() {
    return element(by.id("input-repeat-email-id"));
  }

  getErrorEmailMsg() {
    return element(by.id("email-error-msg-id"));
  }

  getInputPassword() {
    return element(by.id("input-password-id"));
  }

  getInputRepeatPassword() {
    return element(by.id("input-repeat-password-id"));
  }

  getErrorPasswordMsg() {
    return element(by.id("password-error-msg-id"));
  }

  getCloseButton() {
    return element(by.className('btn-warning'));
  }

}
