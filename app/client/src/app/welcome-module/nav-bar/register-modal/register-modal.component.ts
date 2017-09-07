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
            console.log('akceptacja')
            this.nameValidClass = true;
            this.nameInvalidClass = false;
        });

        result.root.setInterrupt(() => {
            console.log('przerwanie')
            if(this.nameMessenger.getMessage() == '') {
                this.nameValidClass = false;
                this.nameInvalidClass = false;
                return;
            }
            this.nameValidClass = true;
            this.nameInvalidClass = true;
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

}
