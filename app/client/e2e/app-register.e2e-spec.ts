import { ClientPage } from './app-register.po';
import * as en from './../src/assets/i18n/en';
import { browser, element, by, protractor, ElementFinder } from 'protractor';

var until = protractor.ExpectedConditions;
var defaultWaitTime: number = 5000;

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

  it('should not display register modal before open register link', (done) => {
    page.getRegisterModal().isDisplayed().then((value) => {
      expect(value).toBeFalsy();
      done();
    })
  });

  it('should open register modal after click on register link', (done) => {

    page.getRegisterLink().click().then(() => {
      waitForAppear(page.getRegisterModal()).then((result) => {
        expect(result).toBeTruthy();
        expect(page.getRegisterModal().isDisplayed().then((val) => { done() }));
      });
    });
  })


  it('should translate text', (done) => {
    page.getRegisterModal().getAttribute('innerHTML').then((HTML) => {
      expect(HTML).not.toContain("{ { 'Register.");
      expect(HTML).toContain(translate.Header)
      done();
    });
  })
  /**
   * cheecking input name
   */
  it('should type John Smith', (done) => {
    page.getInputName().sendKeys("John Smith").then(() => {
      page.getInputName().getAttribute("value").then((text) => {
        expect(text).toEqual("John Smith");
        done();
      });
    });
  })

  it('should type John Smith 007', (done) => {
    page.getInputName().clear().then(() => {
      page.getInputName().sendKeys("John Smith 007").then(() => {

        page.getInputName().getAttribute("value").then((text) => {

          expect(text).toEqual("John Smith 007");
          page.getInputName().getAttribute('class').then((valueClass) => {

            expect(valueClass).toContain('invalid');
            page.getErrorNameMsg().getAttribute('innerHTML').then((errorMSG) => {
              expect(errorMSG).toContain(translate['Name-Wrong-Syntax']);
              done();
            })
          })
        });
      });
    })
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
            //innerHTML return (...) !@#$%^&amp;*() instead (...) !@#$%^&*()'on the end, so we check only first 20 chracter
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
      waitForDisappear(page.getRegisterModal()).then(res => {
        expect(res).toBeTruthy();
        done();
      })
    });


  });

  it('should open modal window', (done) => {
    page.getRegisterLink().click().then(() => {
      waitForAppear(page.getRegisterModal()).then((res) => {
        expect(res).toBeTruthy();
        
        page.getRegisterModal().isDisplayed().then((value) => {
          expect(value).toBeTruthy();
          done();
        })
      })

    })
  });

  /**
   * check that the inputs are empty and dont have set valid or invalid form
   */
  it('name input should be empty', (done) => {
      page.getInputName().getAttribute("value").then((value) => {
        expect(value).toEqual('');
        done();
      });
  });


  it('email input should be empty', (done) => {
    page.getInputEmail().getAttribute('value').then((value) => {
      expect(value).toEqual('');
      done();
    });
  });

  it('repeate email input should be empty', (done) => {
    page.getInputRepatEmail().getAttribute('value').then((value) => {
      expect(value).toEqual('');
      done();
    });
  });

  it('password input should be empty', (done) => {
    page.getInputPassword().getAttribute('value').then((value) => {
      expect(value).toEqual('');
      done();
    });
  });

  it('email input should be empty', (done) => {
    page.getInputRepeatPassword().getAttribute('value').then((value) => {
      expect(value).toEqual('');
      done();
    });
  });


  /**
   * valid, invalid 
   */

  it('name input should be empty', (done) => {
    page.getInputName().getAttribute('class').then((value) => {
      expect(value).not.toMatch(/ valid /g);
      expect(value).not.toMatch(/ invalid /g);

      done();
    });
  });

  it('email input should be empty', (done) => {
    page.getInputEmail().getAttribute('class').then((value) => {
      expect(value).not.toMatch(/ valid /g);
      expect(value).not.toMatch(/ invalid /g);

      done();
    });
  });

  it('repeate email input should be empty', (done) => {
    page.getInputRepatEmail().getAttribute('class').then((value) => {
      expect(value).not.toMatch(/ valid /g);
      expect(value).not.toMatch(/ invalid /g);

      done();
    });
  });

  it('password input should be empty', (done) => {
    page.getInputPassword().getAttribute('class').then((value) => {
      expect(value).not.toMatch(/ valid /g);
      expect(value).not.toMatch(/ invalid /g);

      done();
    });
  });

  it('email input should be empty', (done) => {
    page.getInputRepeatPassword().getAttribute('class').then((value) => {
      expect(value).not.toMatch(/ valid /g);
      expect(value).not.toMatch(/ invalid /g);

      done();
    });
  });



  /**
   * check register button
   */

  it('button should be disabled', (done) => {
    page.getRegisterButton().getAttribute('disabled').then((value) => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('button should be not disabled after fill all inputs', (done) => {
    page.getInputEmail().sendKeys('testmail@test.pl');
    page.getInputRepatEmail().sendKeys('testmail@test.pl');

    page.getInputPassword().sendKeys('password123X');
    page.getInputRepeatPassword().sendKeys('password123X');

    page.getRegisterButton().getAttribute('disalbed').then((value) => {
      expect(value).toBeFalsy();
      done();
    });
  });

});

function waitForAppear(ele: ElementFinder, wait = defaultWaitTime, message = "Element taking too long to appear in the DOM") {
  return browser.wait(until.visibilityOf(ele), 5000, message)
}

function waitForDisappear(ele: ElementFinder, wait = defaultWaitTime, message = "Element taking too long to disappear in the DOM") {
  return browser.wait(until.invisibilityOf(ele), wait, message);
}