import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { IsExistService } from '../../../src/is-exist.service';
import { SyntaxService } from '../../../src/syntax.service';
import { TranslateService } from '@ngx-translate/core';
import { Syntax } from './../../../src/helpers/syntax';

@Component({
    selector: 'register-modal',
    templateUrl: './register-modal.component.html',
    styleUrls: ['./register-modal.css'],
    providers: [IsExistService, SyntaxService]
})
export class RegisterModalComponent implements OnInit {

    public emailMsgExist = { value: '', msg: '' };
    public emailMsgNotMatch = { value: '', msg: '' };
    public emailMsgNotDefined = { value: '', msg: '' };
    public emailMsgSyntax = { value: '', msg: '' };
    public emailMsg: string;

    public passwordMsgNotMatch = { value: '', msg: '' };
    public passwordMsgSyntax = { value: '', msg: '' };
    public passwordMsg: string;


    public email: string = '';
    public repeatEmail: string = '';
    public password: string = '';

    constructor(private isExistService: IsExistService, private translate: TranslateService, private syntaxService: SyntaxService) { }
    /**
     * Set in18 translate for specified language
     */
    ngOnInit(): void {
        this.translate.get('Register.Email-Invalid-Exist-In-Database').toPromise().then(res => {
            this.emailMsgExist.msg = res + '. ';
        });

        this.translate.get("Register.Email-Repeat-Match").toPromise().then(res => {
            this.emailMsgNotMatch.msg = res + '. ';
        });

        this.translate.get("Register.Email-Must-Be-Defined").toPromise().then(res => {
            this.emailMsgNotDefined.msg = res + '. ';
        });

        this.translate.get("Register.Email-Wrong-Syntax").toPromise().then(res => {
            this.emailMsgSyntax.msg = res + '. ';
        });

        this.translate.get("Register.Password-Match").toPromise().then(res => {
            this.passwordMsgNotMatch.msg = res + '. ';
        });

        this.translate.get("Register.Password-Syntax").toPromise().then(res => {
            this.passwordMsgSyntax.msg = res + '. ';
        });
    }

    public diagnostic(object: object): string {
        return JSON.stringify(object);
    }

    /**
     * check does email is in database
     * @param element 
     * @param styleValid 
     * @param styleInvalid 
     */
    public checkName(element: HTMLInputElement, styleValid: string, styleInvalid: string) {
        var email = element.value;

        if (this.email == email) return;
        this.email = email;

        if (email == '') {
            this.removeStyle(element, styleValid, styleInvalid);
            return;
        }

        var syntaxResult = this.syntaxEmail(email);

        if (!syntaxResult) {
            element.classList.add(styleInvalid);
            return;
        }

        this.isExistService.email(email).then(res => {
            //Set error msg
            if (!res) {
                this.emailMsgExist.value = this.emailMsgExist.msg;
                this.setInvalidStyle(element, styleValid, styleInvalid);
            }
            else {
                this.emailMsgExist.value = '';
                this.setValidStyle(element, styleValid, styleInvalid);
            }

            this.updateEmailMsg();
        });
    }
    /**
     * check email syntax
     * @param email 
     */
    private syntaxEmail(email: string): boolean {
        var result = new Syntax().isEmailAddress(email);
        if (result) {
            this.emailMsgSyntax.value = '';
            this.updateEmailMsg();
            return true;
        }
        else {
            this.emailMsgSyntax.value = this.emailMsgSyntax.msg;
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
    public isEmailEqual(element: HTMLInputElement, styleValid: string, styleInvalid: string) {
        var email = element.value;
        if (email == '' || this.email == '') {
            this.removeStyle(element, styleValid, styleInvalid);
            return;
        }

        if (this.email == email) {
            this.emailMsgNotMatch.value = '';
            this.setValidStyle(element, styleValid, styleInvalid);
        }
        else {
            this.emailMsgNotMatch.value = this.emailMsgNotMatch.msg;
            this.setInvalidStyle(element, styleValid, styleInvalid);
        }

        this.repeatEmail = email;
        this.updateEmailMsg();
    }

    /**
     * check is password equal to repeat password
     * @param element 
     * @param styleValid 
     * @param styleInvalid 
     */

    public checkPassword(element: HTMLInputElement, styleValid: string, styleInvalid: string) {
        var password = element.value
        if (password == '') {
            this.removeStyle(element, styleValid, styleInvalid);
            return;
        }
        if (this.password == password) {
            this.passwordMsgNotMatch.value = '';
            this.setValidStyle(element, styleValid, styleInvalid);
        }
        else {
            this.passwordMsgNotMatch.value = this.passwordMsgNotMatch.msg;
            this.setInvalidStyle(element, styleValid, styleInvalid);
        }

        if (password == '' || this.password == '') this.passwordMsgNotMatch.value = '';

        this.updatePasswordMsg();
    }

    /**
     * check does password has valid syntax
     * @param element 
     * @param styleValid 
     * @param styleInvalid 
     */

    public passwordSyntax(element: HTMLInputElement, styleValid: string, styleInvalid: string) {
        var password = element.value;
        if (password == '') {
            this.removeStyle(element, styleValid, styleInvalid);
            return;
        }

        this.syntaxService.password(password).then(res => {
            if (res) {
                this.passwordMsgSyntax.value = '';
                this.setValidStyle(element, styleValid, styleInvalid);
            }
            else {
                this.passwordMsgSyntax.value = this.passwordMsgSyntax.msg;
                this.setInvalidStyle(element, styleValid, styleInvalid);
            }
            this.password = password;
            this.updatePasswordMsg();
        });
    }

    /**
     * update error email message
     */

    private updateEmailMsg() {
        this.emailMsg = this.emailMsgSyntax.value + this.emailMsgExist.value + this.emailMsgNotMatch.value;
    }

    /**
     * update error password message
     */

    private updatePasswordMsg() {
        this.passwordMsg = this.passwordMsgSyntax.value + this.passwordMsgNotMatch.value;
    }

    /**
     * reset errors message
     */

    public resetErrorMsg() {
        // Email group message
        this.emailMsgSyntax.value = '';
        this.emailMsgExist.value = '';
        this.emailMsgNotMatch.value = '';

        //password group message
        this.passwordMsgSyntax.value = '';
        this.passwordMsgNotMatch.value = '';

        //message error containers update
        this.updateEmailMsg();
        this.updatePasswordMsg();
    }

    /**
     * set css class to HTMLInputElement element
     * @param element 
     * @param styleValid 
     * @param styleInvalid 
     */

    public setValidStyle(element: HTMLInputElement, styleValid: string, styleInvalid: string) {
        element.classList.remove(styleInvalid);
        element.classList.add(styleValid);
    }

    /**
     * set css class to HTMLInputElement element
     * @param element 
     * @param styleValid 
     * @param styleInvalid 
     */

    public setInvalidStyle(element: HTMLInputElement, styleValid: string, styleInvalid: string) {
        element.classList.remove(styleValid);
        element.classList.add(styleInvalid);
    }

    /**
     * remove css class from HTMLInputElement element
     * @param element 
     * @param styleValid 
     * @param styleInvalid 
     */

    public removeStyle(element: HTMLInputElement, styleValid: string, styleInvalid: string) {
        element.classList.remove(styleValid);
        element.classList.remove(styleInvalid);
    }

    /**
     * remove css class from HTMLInputelement array elements
     * @param element 
     * @param styleValid 
     * @param styleInvalid 
     */

    public removeStyles(element: HTMLInputElement[], styleValid: string, styleInvalid: string) {
        element.forEach( el => {
            el.classList.remove(styleValid);
            el.classList.remove(styleInvalid);
        })
    }
}

// //our root app component
// import {Component, NgModule, ViewChild} from '@angular/core'
// import {BrowserModule} from '@angular/platform-browser'

// @Component({
//   selector: 'my-app',
//   template: `
//     <div>
//       <button (click)="clearSearch()">Clear</button>
//       <button (click)="setvalue()">Set Value</button>
//       <input type='text' id='loginInput' #abc/>
//     </div> 
//   `,
// })
// export class App {
//   searchValue:string = '';
//   @ViewChild('abc')abc: string;
//   constructor(){}
  
//   ngAfterViewInit(){
//     document.getElementById('loginInput').value = '123344565';
//   }
  
//   setvalue(){
//     document.getElementById('loginInput').value = '123';
//   }
//   clearSearch() {
//     console.log(this.abc.nativeElement.value);
//   }
// }

// @NgModule({
//   imports: [ BrowserModule ],
//   declarations: [ App ],
//   bootstrap: [ App ]
// })
// export class AppModule {
  
// }