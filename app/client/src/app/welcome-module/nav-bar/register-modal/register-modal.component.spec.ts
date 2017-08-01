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
        "Password-Syntax": "Password length must be between 6 - 32. Allow character a-Z, 0-9 and !@#$%^&*()"
    }
}

class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return Observable.of(translations);
    }

}

describe('Register Modal Component', () => {
    let comp: RegisterModalComponent;
    let fixture: ComponentFixture<RegisterModalComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let translate: TranslateService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterModalComponent],
            imports: [
                FormsModule,
                HttpModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader }
                })
            ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(RegisterModalComponent);
                translate = TestBed.get(TranslateService);
                comp = fixture.componentInstance;
                translate.setDefaultLang('en');
            })
    }));


    it('is defined', () => {
        expect(TranslateService).toBeDefined();
        expect(translate).toBeDefined();
        expect(translate instanceof TranslateService).toBeTruthy();
    });

    it('should be able to get translations', () => {
        // translations = {"TEST": "This is a test", "TEST2": "This is another test"};


        // this will request the translation from the backend because we use a static files loader for TranslateService
        translate.get('Register.Header').subscribe((res: string) => {
            expect(res).toEqual('Register in NDFT Project');
        });

        // this will request the translation from downloaded translations without making a request to the backend
        // translate.get('TEST2').subscribe((res: string) => {
        //     expect(res).toEqual('This is another test');
        // });
    });

    it('test', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(fixture.debugElement.query(By.css("#emailErrorID"))).toBeNull;
            console.log(fixture.debugElement.query(By.css("#emailErrorID")));
            fixture.debugElement.query(By.css("#inputEmailID")).nativeElement.value = "Darek";
            fixture.detectChanges();
            console.log(fixture.debugElement.query(By.css("#emailErrorID")));
        });
          console.log("a" + fixture.debugElement.query(By.css("#emailErrorID")));
    }));
})