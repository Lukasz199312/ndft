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

import * as Rx from 'rxjs';
import { Http } from '@angular/http';
import { FieldRuleDirective } from "../../../directives/attribute-directive/field-rule-directive";
import { FieldRegisterElement } from "../../../src/element-component/field-register-element";
import { I_ValueBox } from "../../../src/element-component/i-value-box";
import { ElementComponent } from "../../../src/element-component/element-component";
import { OutSideFunction } from "../../../src/element-component/rules/outside-fuction-rule";
import { ElementRoot } from "../../../src/element-component/element-root";
import { MessengerSubject } from "../../../src/messenger/messenger-subject";
import { FieldRuleService } from "../../../src/element-component/rules/field-rule-service";
import { EmptyRule } from "../../../src/element-component/rules/empty-rule";
import { FactoryFieldRules } from "../../../src/element-component/factory-field-rules/factory-field-rules";


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

    public nameElement: ElementRoot<I_ValueBox>;
    public nameMessenger: MessengerSubject;

    @ViewChild('nameInput') nameInput: NgModel;

    @ViewChild('emailInput') emailInput: NgModel;
    @ViewChild('emailRepeatInput') emailRepeatInput: NgModel;

    @ViewChild('passwordInput') passwordInput: NgModel;
    @ViewChild('passwordRepeatInput') passwordRepeatInput: NgModel;

    constructor(private isAvailableService: IsAvailableService, private translate: TranslateService,
        private syntaxService: SyntaxService, private registerService: RegisterService) { }

    //*****************************************************************************************************  **/
    /**
     * Set in18 translate for specified language
     */

    ngOnInit(): void {

        var factoryFieldRules = new FactoryFieldRules();
        var result = factoryFieldRules.getName(this.isAvailableService, this.translate);

        result.root.setConfirm(value => {
            console.log(this.nameMessenger.getMessage());
        });

        result.root.setInterrupt(() => {
            console.log('istnieje w bazie');
            console.log(this.nameMessenger.getMessage());
        });

        this.nameElement = result.element;

        this.nameMessenger = new MessengerSubject();
        this.nameMessenger.add(result.root);

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
    }
    //*****************************************************************************************************  **/



    //*****************************************************************************************************  **/

    public checkName() {
        this.nameElement.check({ value: this.nameInput.value });
    }

    /**
     * check whether is name empty
     */

    private isNameEmpty(): boolean {
        if (this.nameInput.value == '') return true;
        return false;
    }

    /**
     * reset all name Message for Name Field
     */

    private resetAllNameMSG(): void {
        this.nameMsgExist.reset();
        this.nameMsgSyntax.reset();
    }

    /**
    * check name syntax, set appropriate message and return true if it is correct
    * @param name 
    */

    private setNameMsgSyntax(): boolean {
        var result = new Syntax().isName(this.nameInput.value);
        if (result) {
            this.nameMsgSyntax.reset();
            return true;
        }
        else {
            this.nameMsgSyntax.set();
            return false;
        }
    }

    /**
     * sets or unset email message error, based on Available Service Email result
     * @param name 
     */

    private setNameMsgExistValueAndUpdateNameMSG(): void {
        this.isAvailableService.name(this.nameInput.value, (res => {
            if (res) {
                this.nameMsgExist.reset();
                this.nameValidClass = true;
            }
            else {
                this.nameMsgExist.set();
                this.nameValidClass = false;
            }

            this.updateNameMsg();
        }));
    }

    //*****************************************************************************************************  **/
    /**
     * does check that does email address has correct syntax
     */

    public checkEmail() {
        var email = this.emailInput.value;

        if (this.isEmailEmpty() == false) {
            this.setNotMatchMessage();

            var result = this.setMessageSyntax(email)

            if (result) {
                this.setEmailMsgExistValueAndUpdateEmailMSG(email);
                //Break it, to dont call updateEmailMsg, it will be call in setMsgExistValueAndUpdateEmailMSG
                return;
            }
        }
        else {
            this.resetEmailMsg();
            this.resetEmailClass()
        }

        this.updateEmailMsg();
    }

    /**
     * check is email empty and return value
     */
    private isEmailEmpty(): boolean {
        if (this.emailInput.value == '') {
            return true;
        }
        return false;
    }

    /**
     * when email and repeat email are equal then reset emailMsgNotMatch message, otherwise it sets 
     */

    private setNotMatchMessage(): void {
        if (this.isEmailEqual()) {
            this.emailMsgNotMatch.reset();
        }
        else if (this.isRepeatEmailEmpty() == false) this.emailMsgNotMatch.set();
    }

    /**
     * checks does email equal to repeat email return true if it is otherwise return false
     * @param element 
     * @param styleValid 
     * @param styleInvalid 
     */

    private isEmailEqual(): boolean {
        if (this.emailRepeatInput.value == this.emailInput.value) return true;
        else return false;
    }

    /**
     * check is repeat email field empty
     */

    private isRepeatEmailEmpty(): Boolean {
        if (this.repeatEmail == '') return true;
        else return false;
    }

    /**
     * sets or unset email message error based on syntax result
     * @param email 
     */

    private setMessageSyntax(email: string): boolean {
        if (this.checkSyntaxEmail(email)) {
            this.emailMsgSyntax.reset();
            return true;
        }
        else {
            this.emailMsgSyntax.set();
            return false;
        }
    }

    /**
     * check email syntax, return true if it is correct
     * @param email 
     */

    private checkSyntaxEmail(email: string): boolean {
        var result = new Syntax().isEmailAddress(email);

        if (result) return true;
        else return false;

    }

    /**
     * sets or unset email message error, based on Available Service Email result
     * @param name 
     */

    private setEmailMsgExistValueAndUpdateEmailMSG(name: string) {
        this.isAvailableService.email(name, res => {
            if (res) {
                this.emailMsgExist.reset();
                this.emailValidClass = true;
            }
            else {
                this.emailMsgExist.set();
                this.emailValidClass = false;
            }

            this.updateEmailMsg();
        });
    }

    /**
     * reset email message
     */
    private resetEmailMsg() {
        this.emailMsgSyntax.reset();
        this.emailMsgExist.reset();
        this.emailMsgNotMatch.reset();
    }

    /**
     * reset email classes
     */

    private resetEmailClass() {
        this.emailInvalidClass = false;
        this.emailValidClass = false;
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

    //*****************************************************************************************************  **/

    public checkRepeatEmail() {
        if (this.isEmailEqualToRepeatEmail() == false) {
            this.emailMsgNotMatch.set();
            this.emailRepeatValidClass = true;
        }
        else {
            this.emailMsgNotMatch.reset();
            this.emailRepeatValidClass = false;
        }

        this.updateEmailMsg();
    }

    private isEmailEqualToRepeatEmail() {
        if (this.emailInput.value == this.emailRepeatInput.value) return true;
        else return false;
    }

    //*****************************************************************************************************  **/

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
