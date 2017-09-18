import { Component, OnInit, ViewChild, ApplicationRef } from '@angular/core';
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
import { I_ValueBoxAsync } from "../../../src/element-component/i-value-box-async";
import { FieldRegisterElementAsync } from "../../../src/element-component/field-register-element-async";

interface StyleClass {
    valid: boolean;
    invalid: boolean;
}


@Component({
    selector: 'register-modal',
    templateUrl: './register-modal.component.html',
    styleUrls: ['./register-modal.css'],
    providers: [IsAvailableService, SyntaxService, RegisterService]
})
export class RegisterModalComponent implements OnInit {

    public nameStyleClass: StyleClass = this.createStyleObject();
    public emailStyleClass: StyleClass = this.createStyleObject();
    public emailRepeatStyleClass: StyleClass = this.createStyleObject();
    public passwordStyleClass: StyleClass = this.createStyleObject();
    public passwordRepeatStyleClass: StyleClass = this.createStyleObject();

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

    public nameElement: ElementRoot<I_ValueBoxAsync>;
    public emailElement: ElementRoot<I_ValueBoxAsync>;
    public emailRepeatElement: ElementRoot<I_ValueBox>;
    public passwordElement: ElementRoot<I_ValueBox>;
    public passwordRepeatElement: ElementRoot<I_ValueBox>;

    public nameMessenger: MessengerSubject = new MessengerSubject();
    public emailMessenger: MessengerSubject = new MessengerSubject();
    public passwordMessenger: MessengerSubject = new MessengerSubject();

    public msg;

    private factoryFieldRules: FactoryFieldRules = new FactoryFieldRules();

    @ViewChild('nameInput') nameInput: NgModel;

    @ViewChild('emailInput') emailInput: NgModel;
    @ViewChild('emailRepeatInput') emailRepeatInput: NgModel;

    @ViewChild('passwordInput') passwordInput: NgModel;
    @ViewChild('passwordRepeatInput') passwordRepeatInput: NgModel;

    @ViewChild('closeBtn') closeBtn: any;

    constructor(private isAvailableService: IsAvailableService, private translate: TranslateService, private registerService: RegisterService, private ref: ApplicationRef) { }

    //*****************************************************************************************************  **/
    /**
     * Set in18 translate for specified language
     */

    ngOnInit(): void {
        this.nameMessenger.setSelecter('. ');
        this.emailMessenger.setSelecter('. ');
        this.passwordMessenger.setSelecter('. ');

        this.createRuleNameField();
        this.createRuleEmailField();
        this.createRepeatEmailField();
        this.createPasswordField();
        this.createRepeatPasswordField();

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

    public checkName() {
        this.nameElement.check({ value: this.nameInput.value });
    }

    public checkEmail() {
        this.emailElement.check({ value: this.emailInput.value });
    }

    public checkRepeatEmail() {
        this.emailRepeatElement.check({ value: this.emailRepeatInput.value, optional: this.emailInput.value });
    }

    public checkPassword() {
        this.passwordElement.check({ value: this.passwordInput.value });
    }

    public checkRepeatPassword() {
        this.passwordRepeatElement.check({ value: this.passwordRepeatInput.value, optional: this.passwordInput.value });
    }

    public registerUser() {
        this.registerService.register({
            name: this.nameInput.value,
            email: this.emailInput.value,
            password: this.passwordInput.value,
            repeatPassword: this.passwordRepeatInput.value
        });
    }

    public resetAllField() {
        this.nameInput.reset('');
        this.emailInput.reset('');
        this.emailRepeatInput.reset('');
        this.passwordInput.reset('');
        this.passwordRepeatInput.reset('');
    }

    public clearAllStyle() {
        this.nameStyleClass.invalid = false;
        this.nameStyleClass.valid = false;

        this.emailStyleClass.invalid = false;
        this.emailStyleClass.valid = false;

        this.emailRepeatStyleClass.invalid = false;
        this.emailRepeatStyleClass.valid = false;

        this.passwordStyleClass.invalid = false;
        this.passwordStyleClass.valid = false;

        this.passwordRepeatStyleClass.invalid = false;
        this.passwordRepeatStyleClass.valid = false;
    }

    public resetAllMsg() {
        this.nameMessenger.reset();
        this.emailMessenger.reset();
        this.passwordMessenger.reset();

        this.nameElement.resetMessage();
        this.emailElement.resetMessage();
        this.emailRepeatElement.resetMessage();
        this.passwordElement.resetMessage();
        this.passwordRepeatElement.resetMessage();
    }

    
    public closeModal() {
        this.closeBtn.nativeElement.click();
    }

    private createStyleObject(): StyleClass {
        return { invalid: false, valid: false }
    }

    /**
     * Name Field
     */

    private createRuleNameField() {
        var result = this.factoryFieldRules.getName(this.isAvailableService, this.translate);

        this.setAsyncConfirmCallback(result.root, this.nameStyleClass, this.nameMessenger);
        this.setAsyncInterruptCallback(result.root, this.nameStyleClass, this.nameMessenger);

        this.nameElement = result.element;
        this.nameMessenger.add(result.root);
    }

    /**
     * Email Field
     */

    private createRuleEmailField() {
        var result = this.factoryFieldRules.getEmail(this.isAvailableService, this.translate);

        this.setAsyncConfirmCallback(result.root, this.emailStyleClass, this.emailMessenger);
        this.setAsyncInterruptCallback(result.root, this.emailStyleClass, this.emailMessenger);

        this.emailElement = result.element;
        this.emailMessenger.add(result.root);
    }

    /**
     * Email Repeat Field
     */

    private createRepeatEmailField() {
        var result = this.factoryFieldRules.getRepeatEmail(this.isAvailableService, this.translate);

        this.setConfirmCallback(result.root, this.emailRepeatStyleClass, this.emailMessenger);
        this.setInterruptCallback(result.root, this.emailRepeatStyleClass, this.emailMessenger);

        this.emailRepeatElement = result.element;
        this.emailMessenger.add(result.root);
    }

    /**
     * Password Field
     */

    private createPasswordField() {
        var result = this.factoryFieldRules.getPassword(this.translate);

        this.setConfirmCallback(result.root, this.passwordStyleClass, this.passwordMessenger);
        this.setInterruptCallback(result.root, this.passwordStyleClass, this.passwordMessenger);

        this.passwordElement = result.element;
        this.passwordMessenger.add(result.root);
    }

    /**
     * Repeat Password Field
     */

    private createRepeatPasswordField() {
        var result = this.factoryFieldRules.getRepeatPassword(this.translate);

        this.setConfirmCallback(result.root, this.passwordRepeatStyleClass, this.passwordMessenger);
        this.setInterruptCallback(result.root, this.passwordRepeatStyleClass, this.passwordMessenger);

        this.passwordRepeatElement = result.element;
        this.passwordMessenger.add(result.root);
    }

    /**
     * Async Callbacks for field
     */

    private setAsyncConfirmCallback(rootElement: FieldRegisterElementAsync<I_ValueBoxAsync>, styleClass: StyleClass, messenger: MessengerSubject) {
        rootElement.setConfirm(value => {
            messenger.update();
            styleClass.valid = true;
            styleClass.invalid = false;
        });
    }

    private setAsyncInterruptCallback(rootElement: FieldRegisterElementAsync<I_ValueBoxAsync>, styleClass: StyleClass, messenger: MessengerSubject) {
        rootElement.setInterrupt(() => {
            messenger.update();
            if (messenger.msg == '') {
                styleClass.valid = false;
                styleClass.invalid = false;
                return;
            }
            styleClass.valid = true;
            styleClass.invalid = true;
        });
    }

    /**
     * Normal Callback for field 
     */
    private setConfirmCallback(rootElement: FieldRegisterElement<I_ValueBox>, styleClass: StyleClass, messenger: MessengerSubject) {
        rootElement.setConfirm(value => {
            messenger.update();
            styleClass.valid = true;
            styleClass.invalid = false;
        });
    }

    private setInterruptCallback(rootElement: FieldRegisterElement<I_ValueBox>, styleClass: StyleClass, messenger: MessengerSubject) {
        rootElement.setInterrupt((msg) => {
            messenger.update();

            if (msg == '' || undefined) {
                styleClass.valid = false;
                styleClass.invalid = false;
                return;
            }
            styleClass.valid = true;
            styleClass.invalid = true;
        });
    }

}
