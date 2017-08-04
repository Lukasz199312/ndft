import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, tick } from '@angular/core/testing';

import { RegisterModalComponent } from './register-modal.component';
import { TranslatePipe, TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { HttpLoaderFactory as HttpLoaderFactory } from "../../../app-translate.module";
import { HttpModule, Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { IsExistService } from '../../../src/is-exist.service';
import { SyntaxService } from '../../../src/syntax.service';
import { Observable } from "rxjs/Observable";

let translations: any = {
    "Register": {
        "Header": "Register in NDFT Project",
        "Register": "Register",
        "Email": "Email address",
        "Email-Placeholder": "Enter email",
        "Email-Repeat": "Repeat email address",
        "Email-Repeat-Match": "Emails does not match",
        "Email-Repeat-Placeholder": "Confirm email",
        "Email-Invalid-Exist-In-Database": "Email address is already in use",
        "Email-Must-Be-Defined": "Email must be defined",
        "Email-Wrong-Syntax": "This is not valid email adress",
        "Password": "Password",
        "Password-Match": "Password does not match",
        "Password-Placeholder": "Enter password",
        "Password-Repeat": "Repeat password",
        "Password-Repeat-Placeholder": "Confirm password",
        "Password-Syntax": "Password length must be between 6 - 32. Allow character a-Z, 0-9"
    }
}

class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return Observable.of(translations);
    }

}

class isExistServiceStub {
    email(value: string): Promise<boolean> {
        if (value == 'exist@email.pl') return Promise.resolve(false);
        return Promise.resolve(true);
    }
}

class SyntaxServiceStub {
    public value: boolean;

    password(password: string): Promise<boolean> {
        return Promise.resolve(this.value);
    }
}

describe('Register Modal Component', () => {
    let comp: RegisterModalComponent;
    let fixture: ComponentFixture<RegisterModalComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let translate: TranslateService;

    let emailInput: HTMLInputElement;
    let emailRepeatInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let passwordRepeatInput: HTMLInputElement;

    let errorEmailDiv: HTMLDivElement;
    let errorPasswordDiv: HTMLDivElement;

    let syntaxService: SyntaxServiceStub;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterModalComponent],
            imports: [
                FormsModule,
                HttpModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader }
                })
            ],
            providers: [
                { provide: IsExistService, useClass: isExistServiceStub },
                { provide: SyntaxService, useClass: SyntaxServiceStub }
            ]
        }).overrideComponent(RegisterModalComponent, {
            set: {
                providers: [
                    { provide: IsExistService, useClass: isExistServiceStub },
                    { provide: SyntaxService, useClass: SyntaxServiceStub }
                ]
            }
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(RegisterModalComponent);

                syntaxService = fixture.debugElement.injector.get(SyntaxService, SyntaxServiceStub);

                translate = TestBed.get(TranslateService);

                comp = fixture.componentInstance;

                translate.setDefaultLang('en');

                emailInput = fixture.debugElement.query(By.css('#input-email-id')).nativeElement;
                emailRepeatInput = fixture.debugElement.query(By.css('#input-repeat-email-id')).nativeElement;

                passwordInput = fixture.debugElement.query(By.css('#input-password-id')).nativeElement;
                passwordRepeatInput = fixture.debugElement.query(By.css('#input-repeat-password-id')).nativeElement;

                //console.log("AfterEach Value: " + syntaxService.value);
                syntaxService.value = true;

                // syntaxService =  fixture.debugElement.injector.get(SyntaxService);

                // errorEmailDiv = fixture.debugElement.query(By.css('#email-error-msg-id')).nativeElement;
                //errorPasswordDiv = fixture.debugElement.query(By.css('#password-error-msg-id')).nativeElement;
            })
    }));


    it('is defined', () => {
        syntaxService.value = true;
        expect(TranslateService).toBeDefined();
        expect(translate).toBeDefined();
        expect(translate instanceof TranslateService).toBeTruthy();
    });

    it('should be able to get translations', () => {
        translate.get('Register.Header').subscribe((res: string) => {
            expect(res).toEqual('Register in NDFT Project');
        });
    });

    it('should translate email placeholder', () => {
        fixture.detectChanges();
        expect(emailInput.getAttribute('placeholder')).toEqual(translations.Register['Email-Placeholder']);
    });

    it('should translate repeat email placeholder', () => {
        fixture.detectChanges();
        expect(emailRepeatInput.getAttribute('placeholder')).toEqual(translations.Register['Email-Repeat-Placeholder']);
    });

    it('should translate password placeholder', () => {
        fixture.detectChanges();
        expect(passwordInput.getAttribute('placeholder')).toEqual(translations.Register['Password-Placeholder']);
    });

    it('should translate password repeat placeholder', () => {
        fixture.detectChanges();
        expect(passwordRepeatInput.getAttribute('placeholder')).toEqual(translations.Register['Password-Repeat-Placeholder']);
    });

    it('should display Email address is already in use. when email exist in database', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            emailInput.value = "exist@email.pl"
            emailInput.dispatchEvent(new Event('blur'));
            fixture.detectChanges();
            
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#email-error-msg-id')).nativeElement.innerHTML).toContain(translations.Register['Email-Invalid-Exist-In-Database']);
            });
        });
    }));

    it('should display This is not valid email adress. when email has wrong syntax', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            emailInput.value = "ex#"
            emailInput.dispatchEvent(new Event('blur'));

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(fixture.debugElement.query(By.css('#email-error-msg-id')).nativeElement.innerHTML).toContain(translations.Register['Email-Wrong-Syntax']);
                expect(emailInput.classList.contains('invalid')).toBeTruthy();
            });
        });
    }));

    it('should display Emails does not match. when email does not fit', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            emailInput.value = "email@email.pl"
            emailInput.dispatchEvent(new Event('blur'));

            fixture.detectChanges();

            fixture.whenStable().then(() => {
                emailRepeatInput.value = "ex#1"
                emailRepeatInput.dispatchEvent(new Event('keyup'));

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(fixture.debugElement.query(By.css('#email-error-msg-id')).nativeElement.innerHTML).toContain(translations.Register['Email-Repeat-Match']);
                    expect(emailRepeatInput.classList.contains('invalid')).toBeTruthy();
                });

            })
        });
    }));

    it('should display Password does not match when password and repeat password not equal', async(() => {

        syntaxService.value = true;
        fixture.detectChanges();

        fixture.whenStable().then(() => {

            passwordInput.value = 'password1';
            passwordRepeatInput.value = 'password123';
            // syntaxService.value = true;

            passwordInput.dispatchEvent(new Event('blur'));

            fixture.detectChanges();

            fixture.whenStable().then(() => {

                passwordRepeatInput.dispatchEvent(new Event('keyup'));

                fixture.detectChanges();

                fixture.whenStable().then(() => {
                    expect(fixture.debugElement.query(By.css('#password-error-msg-id')).nativeElement.innerHTML).toContain(translations.Register['Password-Match']);
                    expect(passwordRepeatInput.classList.contains('invalid'));
                });
            });
        })
    }));

    it('should display password wring syntax', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            syntaxService.value = false;

            passwordInput.value = '`';

            passwordInput.dispatchEvent(new Event('blur'));

            fixture.detectChanges();

            fixture.whenStable().then(() => {
                fixture.detectChanges();;
                expect(fixture.debugElement.query(By.css('#password-error-msg-id')).nativeElement.innerHTML)
                    .toContain(translations.Register['Password-Syntax']);
            })

        })
    }));

    it('should display password multiple message', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {

            syntaxService.value = false;
            passwordInput.value = '`';

            passwordRepeatInput.value = 'wrong';
            passwordInput.dispatchEvent(new Event('blur'));
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                fixture.detectChanges();

                passwordRepeatInput.dispatchEvent(new Event('keyup'));
                fixture.detectChanges();

                fixture.whenStable().then(() => {
                    let div: HTMLDivElement = fixture.debugElement.query(By.css('#password-error-msg-id')).nativeElement;
                    expect(div.innerHTML).toContain(translations.Register['Password-Match']);
                    expect(div.innerHTML).toContain(translations.Register['Password-Syntax']);
                });
            })


        });
    }));

    it('should enabled register button', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            // Password Input

            syntaxService.value = true;
            passwordInput.value = 'password123';

            passwordInput.dispatchEvent(new Event('blur'));
            passwordInput.dispatchEvent(new Event('input'));

            fixture.detectChanges();

            fixture.whenStable().then(() => {
                // Password Repeat Email Input
    
                passwordRepeatInput.value = 'password123';
                passwordRepeatInput.dispatchEvent(new Event('keyup'));
                passwordRepeatInput.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                fixture.whenStable().then(() => {
   
                    //Email Input
                    emailInput.value = "correct@mail.pl";
                    emailInput.dispatchEvent(new Event('blur'));
                    emailInput.dispatchEvent(new Event('input'));
                    fixture.detectChanges();

                    fixture.whenStable().then(() => {
                        //Email Repeat Input

                        emailRepeatInput.value = "correct@mail.pl";
                        emailRepeatInput.dispatchEvent(new Event('keyup'));
                        emailRepeatInput.dispatchEvent(new Event('input'));
                        fixture.detectChanges();

                        fixture.whenStable().then(() => {

                            var registerButton: HTMLButtonElement = fixture.debugElement.query(By.css('#register-button-id')).nativeElement;
                            expect(registerButton.disabled).toBeFalsy();
                        });
                    });

                });
            });
        });
    }));
})