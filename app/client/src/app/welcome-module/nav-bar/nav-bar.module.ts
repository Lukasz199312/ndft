import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavBarComponent } from './nav-bar.component';
import { RegisterModalComponent } from './register-modal/register-modal.component'
import { LoginFormComponent } from './login-form/login-form.component';
import { AppTranslateModule } from "../../app-translate.module";


@NgModule({
    imports:      [CommonModule, AppTranslateModule, FormsModule],
    declarations: [NavBarComponent, LoginFormComponent, RegisterModalComponent],
    exports:      [CommonModule, NavBarComponent, LoginFormComponent]
})
export class NavBarModule { }