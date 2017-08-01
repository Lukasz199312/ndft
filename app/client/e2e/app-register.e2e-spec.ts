import { ClientPage } from './app-register.po';
import * as en from './../src/assets/i18n/en';
import { browser, element, by } from 'protractor';

describe('client App - register', () => {
  let page: ClientPage;
  var translate: any = (<any>en).Register;

  beforeAll(() => {
    page = new ClientPage();
    page.navigateTo();
  });

  it('should display navbar for no logged user ', () => {
    expect(page.getNavbarelement().isDisplayed());
  });

  it('should display register link', () => {
    expect(page.getRegisterLink().isDisplayed());
  })

  it('should open register modal after click on register link', () => {
    page.getRegisterLink().click();
    expect(page.getRegisterModal().isDisplayed());
  })

  it('should translate text', (done) => {
    page.getRegisterModal().getAttribute('innerHTML').then((HTML) => {
      expect(HTML).not.toContain("{ { 'Register.");
      expect(HTML).toContain(translate.Header)
      done();
    });
  })
  /**
   * Checking input *email*
   */
  it('should type "wrongEmail"', (done) => {
    page.getInputEmail().sendKeys("wrongEmail").then(() => {
      page.getInputEmail().getAttribute("value").then((text) => {
        expect(text).toEqual("wrongEmail");
        done();
      });
    });
  })

  it('should deselect input email and show error with wrong sytax', (done) => {
    page.getRegisterModal().click().then(() => {
      page.getErrorEmailMsg().isDisplayed().then((res) => {
        expect(res).toBeTruthy();
        page.getErrorEmailMsg().getAttribute("innerHTML").then((text) => {
          expect(text).toContain(translate['Email-Wrong-Syntax']);
          done();
        });
      });
    });
  })

  it('should show error when email is used, after type used email test@test.pl', (done) => {
    page.getInputEmail().clear().then(() => {
      page.getInputEmail().sendKeys("test@test.pl").then(() => {
        page.getInputRepatEmail().click().then(() => {
          page.getErrorEmailMsg().getAttribute("innerHTML").then((value) => {
            expect(value).toContain(translate['Email-Invalid-Exist-In-Database']);
            done();
          });
        });
      });
    });
  })

  it('should show errors email is used and email does not match after type test@test.pl', (done) => {
    page.getInputRepatEmail().sendKeys("test@test123.pl").then(() => {
      page.getInputEmail().click().then(() => {
        page.getErrorEmailMsg().getAttribute("innerHTML").then((value) => {
          expect(value).toContain(translate['Email-Invalid-Exist-In-Database']);
          expect(value).toContain(translate['Email-Repeat-Match']);
          done();
        });
      })
    });
  })
  /**
   * check password
   */
  it('should show invalid password syntax error message ', (done) => {
    page.getInputPassword().sendKeys("q").then(() => {
      page.getInputRepeatPassword().click().then(() => {
        page.getErrorPasswordMsg().getAttribute('innerHTML').then((value) => {

          //innerHTML return !@#$%^&amp;*() instead !@#$%^&*()'on the end, so we check only first 20 chracter
          expect(value).toContain((<string>translate['Password-Syntax']).substring(0, 20));
          done();
        });
      });
    });
  })

  it('should show password does not match message', (done) => {
    page.getInputPassword().clear().then(() => {
      page.getInputPassword().sendKeys("nopess123").then(() => {
        page.getInputRepeatPassword().sendKeys('nopes1').then(() => {
          page.getErrorPasswordMsg().getAttribute('innerHTML').then((value) => {
            //innerHTML return !@#$%^&amp;*() instead !@#$%^&*()'on the end, so we check only first 20 chracter
            expect(value).toContain(translate['Password-Match']);
            done();
          });
        });
      });
    });
  })

  /**
   * check close button
   */

  it('should close modal window', (done) => {
    page.getCloseButton().click().then(() => {
      page.getRegisterModal().isDisplayed().then((value) => {
        expect(value).toBeFalsy();
        done();
      })
    });
  });

  it('should close modal window', (done) => {
    page.getRegisterLink().click().then(() => {
      page.getRegisterModal().isDisplayed().then((value) => {
        expect(value).toBeTruthy();
        done();
      })
    })
  });


  /**
   * check that the buttons are empty
   */

  it('email input should be empty', (done) => {
    page.getInputEmail().getAttribute('value').then((value) => {
      expect(value).toEqual('');
      done();
    });
  });

});