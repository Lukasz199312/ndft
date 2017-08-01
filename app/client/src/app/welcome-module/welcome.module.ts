import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppWelcomeComponent } from "./app-welcome.component";
import { NavBarModule } from './nav-bar/nav-bar.module';
import { AppTranslateModule } from "../app-translate.module";

@NgModule({
    declarations: [
        AppWelcomeComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NavBarModule,
        AppTranslateModule
    ],
    exports: [
        AppWelcomeComponent
    ],
    providers: []
})
export class WelcomeModule { }
 