import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, tick } from '@angular/core/testing';

import { RegisterModalComponent } from './register-modal.component';
import { TranslatePipe, TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { HttpLoaderFactory as HttpLoaderFactory } from "../../../app-translate.module";
import { HttpModule, Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { IsAvailableService } from '../../../src/is-available.service';
import { SyntaxService } from '../../../src/syntax.service';
import { Observable } from "rxjs/Observable";
import { RegisterService } from "./register.service";
import { I_RuleService } from "../../../src/element-component/rules/i-rule-service";

let translations: any = {
    "Register": {
        "Header": "Register in NDFT Project",
        "Register": "Register",
        "Name": "User Name",
        "Name-Placeholder": "Enter user name",
        "Name-Invalid-Exist-In-Database": "User name is already in use",
        "Name-Wrong-Syntax": "This is not valid user name. Allow character a-Z, 0-9 and one [space] example: John, John09, John Smith",
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

class isAvailableServiceStub implements I_RuleService{

    shellMethod(value: string, method: string, callback: (res: boolean) => void) {
        switch (method) {
            case "name":
                this.name(value, callback);
                break;
            case "email":
                this.email(value, callback);
                break;
            default:
                throw new Error(method + ' name does not exist in function switch');
        }
    }

    email(value: string, callback: (value: boolean) => void): void {
        if (value == 'exist@email.pl')  callback(false);
        else callback(true);
    }

    name(value: string, callback: (value: boolean) => void): void {
        if (value == 'exist')  callback(false);
        else callback(true);
    }
}

class SyntaxServiceStub {
    public value: boolean;

    isPassword(password: string): Promise<boolean> {
        return Promise.resolve(this.value);
    }
}

interface User {
    name: string,
    email: string,
    password: string,
    repeatPassword: string
}

class RegisterServiceStub {
    public returnReult: boolean;

    register(user: User): Promise<boolean> {
        return Promise.resolve(this.returnReult);
    }
}

describe('Register Modal Component', () => {
    let comp: RegisterModalComponent;
    let fixture: ComponentFixture<RegisterModalComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let translate: TranslateService;

    let nameInput: HTMLInputElement;
    let emailInput: HTMLInputElement;
    let emailRepeatInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let passwordRepeatInput: HTMLInputElement;

    let errorEmailDiv: HTMLDivElement;
    let errorPasswordDiv: HTMLDivElement;

    let registerService: RegisterServiceStub;


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
                { provide: IsAvailableService, useClass: isAvailableServiceStub },
                { provide: RegisterService, useClass: RegisterServiceStub }
            ]
        }).overrideComponent(RegisterModalComponent, {
            set: {
                providers: [
                    { provide: IsAvailableService, useClass: isAvailableServiceStub },
                    { provide: RegisterService, useClass: RegisterServiceStub }
                ]
            }
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(RegisterModalComponent);
                registerService = fixture.debugElement.injector.get(RegisterService, RegisterServiceStub);

                translate = TestBed.get(TranslateService);

                comp = fixture.componentInstance;

                translate.setDefaultLang('en');

                nameInput = fixture.debugElement.query(By.css('#input-name-id')).nativeElement;

                emailInput = fixture.debugElement.query(By.css('#input-email-id')).nativeElement;
                emailRepeatInput = fixture.debugElement.query(By.css('#input-repeat-email-id')).nativeElement;

                passwordInput = fixture.debugElement.query(By.css('#input-password-id')).nativeElement;
                passwordRepeatInput = fixture.debugElement.query(By.css('#input-repeat-password-id')).nativeElement;

            })
    }));

    it('is defined', () => {
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
        expect(nameInput.getAttribute('placeholder')).toEqual(translations.Register['Name-Placeholder']);
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
    // Name Test
    it('should dont display error and set valid style after insert John Smith', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            nameInput.value = 'John Smith';
            nameInput.dispatchEvent(new Event('input'));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#name-error-msg-id'))).toBeNull();
                expect(comp.nameMessenger.msg).toBe('');
                expect(nameInput.classList.contains('valid')).toBeTruthy();
            })
        });
    }))

    it('should dont display error and set valid style after insert Johnt09', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            nameInput.value = 'Johnt09';
            nameInput.dispatchEvent(new Event('input'));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#name-error-msg-id'))).toBeNull();
                expect(nameInput.classList.contains('valid')).toBeTruthy();
            })
        });
    }))

    it('should dont display error and set valid style after insert 0009', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            nameInput.value = 'Johnt09';
            nameInput.dispatchEvent(new Event('input'));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#name-error-msg-id'))).toBeNull();
                expect(nameInput.classList.contains('valid')).toBeTruthy();
            })
        });
    }))

    it('should display error and set invalid class after insert John Smith Solo', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            nameInput.value = 'John Smith Solo';
            nameInput.dispatchEvent(new Event('input'));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(nameInput.classList.contains('invalid')).toBeTruthy();
                expect(fixture.debugElement.query(By.css('#name-error-msg-id')).nativeElement.innerHTML).toContain(translations.Register['Name-Wrong-Syntax']);
            })
        });
    }))

    it('should display error and set invalid class after insert John Smith`', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            nameInput.value = 'John Smith`';
            nameInput.dispatchEvent(new Event('input'));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(nameInput.classList.contains('invalid')).toBeTruthy();
                expect(fixture.debugElement.query(By.css('#name-error-msg-id')).nativeElement.innerHTML).toContain(translations.Register['Name-Wrong-Syntax']);
            })
        });
    }))

    it('should display error and set invalid class after insert John Smi!th`', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            nameInput.value = 'John Smith`';
            nameInput.dispatchEvent(new Event('input'));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(nameInput.classList.contains('invalid')).toBeTruthy();
                expect(fixture.debugElement.query(By.css('#name-error-msg-id')).nativeElement.innerHTML).toContain(translations.Register['Name-Wrong-Syntax']);
            })
        });
    }))

    it('should display Name is already use. when name exist in database', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            nameInput.value = 'exist';
            nameInput.dispatchEvent(new Event('input'));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#name-error-msg-id')).nativeElement.innerHTML).toContain(translations.Register['Name-Invalid-Exist-In-Database']);

            })
        });
    }));
    // Email Test
    it('should display Email address is already in use. when email exist in database', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            emailInput.value = "exist@email.pl"
            emailInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#email-error-msg-id')).nativeElement.innerHTML).toContain(translations.Register['Email-Invalid-Exist-In-Database']);
                expect(emailInput.classList.contains('invalid')).toBeTruthy();
            });
        });
    }));

    it('should display This is not valid email adress. when email has wrong syntax', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            emailInput.value = "ex#"
            emailInput.dispatchEvent(new Event('input'));

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(fixture.debugElement.query(By.css('#email-error-msg-id')).nativeElement.innerHTML).toContain(translations.Register['Email-Wrong-Syntax']);
                expect(emailInput.classList.contains('invalid')).toBeTruthy();
            });
        });
    }));

    it('should set multiple message', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            emailInput.value = "ex#"
            emailRepeatInput.value = "wrrr";

            emailInput.dispatchEvent(new Event('input'));
            emailRepeatInput.dispatchEvent(new Event('input'));

            fixture.detectChanges();
            fixture.whenStable().then(() => {

                expect(fixture.debugElement.query(By.css('#email-error-msg-id')).nativeElement.innerHTML)
                    .toContain(translations.Register['Email-Wrong-Syntax']);
                    
                expect(fixture.debugElement.query(By.css('#email-error-msg-id')).nativeElement.innerHTML)
                    .toContain(translations.Register['Email-Repeat-Match']);

                expect(emailInput.classList.contains('invalid')).toBeTruthy();
                expect(emailRepeatInput.classList.contains('invalid')).toBeTruthy();
            });
        });
    }));

    it('should display Emails does not match. when email does not fit', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            emailInput.value = "email@email.pl"
            emailInput.dispatchEvent(new Event('input'));

            fixture.detectChanges();

            fixture.whenStable().then(() => {
                emailRepeatInput.value = "ex#1"
                emailRepeatInput.dispatchEvent(new Event('input'));

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(fixture.debugElement.query(By.css('#email-error-msg-id')).nativeElement.innerHTML).toContain(translations.Register['Email-Repeat-Match']);
                    expect(emailRepeatInput.classList.contains('invalid')).toBeTruthy();
                });

            })
        });
    }));
    // Password Test

    it('should display Password does not match when password and repeat password not equal', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {

            passwordInput.value = 'password1';
            passwordRepeatInput.value = 'password123';
            // syntaxService.value = true;

            passwordInput.dispatchEvent(new Event('input'));

            fixture.detectChanges();

            fixture.whenStable().then(() => {

                passwordRepeatInput.dispatchEvent(new Event('input'));

                fixture.detectChanges();

                fixture.whenStable().then(() => {
                    expect(fixture.debugElement.query(By.css('#password-error-msg-id')).nativeElement.innerHTML).toContain(translations.Register['Password-Match']);

                    expect(passwordInput.classList.contains('invalid'));
                    expect(passwordRepeatInput.classList.contains('invalid'));
                });
            });
        })
    }));

    it('should dont display password wrong syntax', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            passwordInput.value = 'a@#$%^&*()';
            passwordInput.dispatchEvent(new Event('input'));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#password-error-msg-id'))).toBeNull();
                expect(passwordRepeatInput.classList.contains('valid'));
            })

        })
    }));

    it('should display password wrong syntax', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            passwordInput.value = '``````` ``` ``';
            passwordInput.dispatchEvent(new Event('input'));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#password-error-msg-id')).nativeElement.innerHTML)
                    .toContain(translations.Register['Password-Syntax']);
                expect(passwordRepeatInput.classList.contains('invalid'));
            })

        })
    }));

    it('should display password wrong syntax after type pas 123', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            passwordInput.value = 'pas 123';

            passwordInput.dispatchEvent(new Event('input'));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#password-error-msg-id')).nativeElement.innerHTML)
                    .toContain(translations.Register['Password-Syntax']);
                expect(passwordRepeatInput.classList.contains('invalid'));
            })

        })
    }));

    it('should display password multiple message', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            passwordInput.value = '`';

            passwordRepeatInput.value = 'wrong';
            passwordInput.dispatchEvent(new Event('input'));

            fixture.whenStable().then(() => {
                fixture.detectChanges();

                passwordRepeatInput.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                fixture.whenStable().then(() => {
                    let div: HTMLDivElement = fixture.debugElement.query(By.css('#password-error-msg-id')).nativeElement;
                    expect(div.innerHTML).toContain(translations.Register['Password-Match']);
                    expect(div.innerHTML).toContain(translations.Register['Password-Syntax']);

                    expect(passwordInput.classList.contains('invalid'));
                    expect(passwordRepeatInput.classList.contains('invalid'));

                });
            })


        });
    }));

    //button
    it('should enabled register button', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {

            nameInput.value = "adminek123";
            nameInput.dispatchEvent(new Event('input'));

            fixture.whenStable().then(() => {
                // Password Input
                passwordInput.value = 'password123';

                passwordInput.dispatchEvent(new Event('input'));

                fixture.detectChanges();

                fixture.whenStable().then(() => {
                    // Password Repeat Email Input

                    passwordRepeatInput.value = 'password123';
                    passwordRepeatInput.dispatchEvent(new Event('input'));
                    fixture.detectChanges();

                    fixture.whenStable().then(() => {

                        //Email Input
                        emailInput.value = "correct@mail.pl";
                        emailInput.dispatchEvent(new Event('input'));
                        fixture.detectChanges();

                        fixture.whenStable().then(() => {
                            //Email Repeat Input

                            emailRepeatInput.value = "correct@mail.pl";
                            emailRepeatInput.dispatchEvent(new Event('input'));
                            fixture.detectChanges();

                            fixture.whenStable().then(() => {

                                var registerButton: HTMLButtonElement = fixture.debugElement.query(By.css('#register-button-id')).nativeElement;
                                expect(registerButton.disabled).toBeFalsy();

                                expect(nameInput.classList.contains('valid'));

                                expect(emailInput.classList.contains('valid'));
                                expect(emailRepeatInput.classList.contains('valid'));

                                expect(passwordInput.classList.contains('valid'));
                                expect(passwordRepeatInput.classList.contains('valid'));
                            });
                        });

                    });
                });
            });
        })
    }));
})
