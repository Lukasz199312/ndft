import { Component } from '@angular/core';
import { LogInService } from "./login-in.service";

@Component({
    //moduleId: module.id,
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    providers: [LogInService]
})

export class LoginFormComponent { 
    public login: string;
    public password: string;
    public errorMSG: boolean = false;

    public constructor(private logInService: LogInService) {}

    public LogIn() {
       this.logInService.verification(this.login, this.password).then((serverRespone) =>  {
        this.errorMSG = !serverRespone;
       });
    }
}