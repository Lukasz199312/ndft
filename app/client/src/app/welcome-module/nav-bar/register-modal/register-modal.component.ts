import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { IsAvailableService } from '../../../src/is-available.service';
import { SyntaxService } from '../../../src/syntax.service';
import { TranslateService } from '@ngx-translate/core';
import { Syntax } from './../../../src/helpers/syntax';
import { RegisterService } from "./register.service";

import { NgClass } from '@angular/common';
import { TranslateMSG } from "../../../src/translate-msg";


import { Observable } from 'rxjs/observable';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/debounce';
// import 'rxjs/add/operator/filter';

import * as Rx from 'rxjs';
import { Http } from '@angular/http';


@Component({
    selector: 'register-modal',
    templateUrl: './register-modal.component.html',
    styleUrls: ['./register-modal.css'],
    providers: [IsAvailableService, SyntaxService, RegisterService]
})
export class RegisterModalComponent implements OnInit {

    public nameMsgExist: TranslateMSG = new TranslateMSG();
    public nameMsgSyntax: TranslateMSG = new TranslateMSG();

    public nameMsg: string = '';
    public isNameComplete: boolean = false;

    public emailMsgExist: TranslateMSG = new TranslateMSG();
    public emailMsgNotMatch: TranslateMSG = new TranslateMSG();
    public emailMsgNotDefined: TranslateMSG = new TranslateMSG();;
    public emailMsgSyntax: TranslateMSG = new TranslateMSG();;


    public emailMsg: string = '';
    public isEmailComplete: boolean = false;

    public passwordMsgNotMatch: TranslateMSG = new TranslateMSG();
    public passwordMsgSyntax: TranslateMSG = new TranslateMSG();

    public passwordMsg: string = '';
    public isPasswordComplete: boolean = false;

    public email: string = '';
    public repeatEmail: string = '';
    public password: string = '';
    public repeatPassword: string = '';

    public nameValidClass: boolean = false;
    public nameInvalidClass: boolean = false;

    public emailValidClass: boolean = false;
    public emailInvalidClass: boolean = false;

    public emailRepeatValidClass: boolean = false;
    public emailRepeatInvalidClass: boolean = false;

    public passwordValidClass: boolean = false;
    public passwordInvalidClass: boolean = false;

    public passwordRepeatValidClass: boolean = false;
    public passwordRepeatInvalidClass: boolean = false;

    @ViewChild('nameInput') nameInput: NgModel;

    @ViewChild('emailInput') emailInput: NgModel;
    @ViewChild('emailRepeatInput') emailRepeatInput: NgModel;

    @ViewChild('passwordInput') passwordInput: NgModel;
    @ViewChild('passwordRepeatInput') passwordRepeatInput: NgModel;


    constructor(private isAvailableService: IsAvailableService, private translate: TranslateService,
        private syntaxService: SyntaxService, private registerService: RegisterService) { }
    /**
     * Set in18 translate for specified language
     */
    ngOnInit(): void {
        this.translate.get('Register.Name-Invalid-Exist-In-Database').toPromise().then(res => {
            this.nameMsgExist.initialize(res + '. ');
        });

        this.translate.get('Register.Name-Wrong-Syntax').toPromise().then(res => {
            this.nameMsgSyntax.initialize(res + '. ');
        });

        this.translate.get('Register.Email-Invalid-Exist-In-Database').toPromise().then(res => {
            this.emailMsgExist.initialize(res + '. ');
        });

        this.translate.get("Register.Email-Repeat-Match").toPromise().then(res => {
            this.emailMsgNotMatch.initialize(res + '. ');
        });

        this.translate.get("Register.Email-Must-Be-Defined").toPromise().then(res => {
            this.emailMsgNotDefined.initialize(res + '. ');
        });

        this.translate.get("Register.Email-Wrong-Syntax").toPromise().then(res => {
            this.emailMsgSyntax.initialize(res + '. ');
        });

        this.translate.get("Register.Password-Match").toPromise().then(res => {
            this.passwordMsgNotMatch.initialize(res + '. ');
        });

        this.translate.get("Register.Password-Syntax").toPromise().then(res => {
            this.passwordMsgSyntax.initialize(res + '. ');
        });

        //DELETE

        var subject = new Rx.Subject();



        subject.subscribe(x => {
            console.log('val ' + x);
        })


        setTimeout(function () {
            subject.next('John');
        }, 1000);

        setTimeout(function () {
            subject.next('Smith');
        }, 2000);

        setTimeout(function () {
            subject.next('Alste');
        }, 2500);


        // var stream2 = Rx.Observable.from([[110, 120, 130, 140], [50, 200, 160]]).flatMap((x, i) => {
        //     return x;
        // }).subscribe(x => {
        //     console.log(x);
        // })
        // console.log(stream2);
    }

    public diagnostic(object: object): string {
        return JSON.stringify(object);
    }

    public checkName() {
        var name = this.nameInput.value;
        if (this.nameInput.value == '') {

            this.nameMsgExist.reset();
            this.nameMsgSyntax.reset();

            this.nameValidClass = false;

            this.updateNameMsg();
            return;
        }

        var syntaxResult = this.syntaxName(this.nameInput.value);

        if (syntaxResult) {

            this.isAvailableService.name(this.nameInput.value).then((res) => {
                if (name != this.nameInput.value) return;
                if (res) {
                    this.nameMsgExist.reset();
                    this.nameValidClass = true;
                }
                else {
                    this.nameMsgExist.set();
                    this.nameValidClass = false;
                }

                this.updateNameMsg();
            })
        }
    }

    /**
     * 
     */
    public checkEmail() {
        if (this.email != this.emailInput.value) {
            if (this.isEmailEmpty() == false) {
                this.isEmailEqual();
                var syntaxResult = this.syntaxEmail(this.email);

                if (syntaxResult) {
                    this.isAvailableService.email(this.email).then(res => {

                        if (res)
                            this.emailMsgExist.reset();

                        else
                            this.emailMsgExist.set();

                        this.updateEmailMsg();
                    });
                    this.isEmailComplete = true
                }
                else this.isEmailComplete = true;

            }
        }
    }
    /**
     * check is email empty
     */
    private isEmailEmpty(): boolean {
        this.email = this.emailInput.value;
        if (this.email == '') {
            this.resetEmailMsg();
            this.isEmailComplete = false;
            return true;
        }
        return false;
    }

    /**
     * check name syntax, return true if it is correct
     * @param name 
     */

    private syntaxName(name: string): boolean {
        var result = new Syntax().isName(name);
        if (result) {
            this.nameMsgSyntax.reset();
            this.updateNameMsg();
            return true;
        }
        else {
            this.nameMsgSyntax.set();
            this.updateNameMsg();
            return false;
        }
    }


    /**
     * check email syntax, return true if it is correct
     * @param email 
     */
    private syntaxEmail(email: string): boolean {
        var result = new Syntax().isEmailAddress(email);
        if (result) {
            this.emailMsgSyntax.reset();
            this.updateEmailMsg();
            return true;
        }
        else {
            this.emailMsgSyntax.set();
            this.updateEmailMsg();
            return false;
        }
    }

    /**
     * checks does email equal to repeat email
     * @param element 
     * @param styleValid 
     * @param styleInvalid 
     */
    public isEmailEqual() {
        this.repeatEmail = this.emailRepeatInput.value;

        if (this.repeatEmail == '') {
            this.emailMsgNotMatch.reset();
            this.updateEmailMsg();

            return;
        }
        if (this.email == '') return;

        if (this.repeatEmail == this.emailInput.value)
            this.emailMsgNotMatch.reset();
        else
            this.emailMsgNotMatch.set();

        this.updateEmailMsg();
    }


    /**
     * check is password equal to repeat password
     * @param element 
     * @param styleValid 
     * @param styleInvalid 
     */

    public passwordEqual() {
        var value = this.passwordRepeatInput.value;

        if (value != '') {
            if (value == this.passwordInput.value) {
                this.passwordMsgNotMatch.reset();
            }
            else this.passwordMsgNotMatch.set();
        }
        else {
            this.passwordMsgNotMatch.reset();
        }

        this.updatePasswordMsg();
    }

    /**
     * check does password has valid syntax
     * @param element 
     * @param styleValid 
     * @param styleInvalid 
     */

    public passwordSyntax() {
        var password = this.passwordInput.value;
        this.passwordEqual();
        if (password != '') {
            this.syntaxService.isPassword(password).then((res) => {
                if (res) this.passwordMsgSyntax.reset();
                else this.passwordMsgSyntax.set();
                this.updatePasswordMsg();
                this.isPasswordComplete = true;
            })
        }
        else {
            this.passwordMsgSyntax.reset();
            this.isPasswordComplete = false;
        }
        this.updatePasswordMsg();
    }

    /**
     * update error email message
     */

    private updateEmailMsg() {
        this.emailMsg = this.emailMsgSyntax.get() + this.emailMsgExist.get() + this.emailMsgNotMatch.get();

        if (this.emailMsg == '') this.emailInvalidClass = false;
        else this.emailInvalidClass = true;

        if (this.emailMsgNotMatch.get() == '') this.emailRepeatInvalidClass = false;
        else this.emailRepeatInvalidClass = true;
    }

    /**
     * update name message
     */

    private updateNameMsg() {
        this.nameMsg = this.nameMsgSyntax.get() + this.nameMsgExist.get();

        if (this.nameMsg == '') this.nameInvalidClass = false;
        else this.nameInvalidClass = true;
    }

    /**
     * update error password message
     */

    private updatePasswordMsg() {
        this.passwordMsg = this.passwordMsgSyntax.get() + this.passwordMsgNotMatch.get();

        if (this.passwordMsg == '') this.passwordInvalidClass = false;
        else this.passwordInvalidClass = true;

        if (this.passwordMsgNotMatch.get() == '') this.passwordRepeatInvalidClass = false;
        else this.passwordRepeatInvalidClass = true;
    }

    /**
     * reset errors message
     */

    public resetErrorMsg() {
        this.resetEmailMsg();
        this.resetPasswordMsg();

    }
    /**
     * reset email message
     */
    private resetEmailMsg() {
        this.emailMsgSyntax.reset();
        this.emailMsgExist.reset();
        this.emailMsgNotMatch.reset();

        this.updateEmailMsg();
    }

    /**
     * reset password message
     */
    private resetPasswordMsg() {
        this.passwordMsgSyntax.reset();
        this.passwordMsgNotMatch.reset();

        this.updatePasswordMsg();
    }

    public registerUser() {

        // this.registerService.register({email: 'lolas@os.pl', name: 'gachHuj', password: '123456', repeatPassword: '123456'});
    }


    /**
     * remove css class from HTMLInputelement array elements
     * @param element 
     * @param styleValid 
     * @param styleInvalid 
     */

    public removeStyles(element: HTMLInputElement[], styleValid: string, styleInvalid: string) {
        element.forEach(el => {
            el.classList.remove(styleValid);
            el.classList.remove(styleInvalid);
        })
    }

}

