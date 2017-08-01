import { Component, OnInit } from '@angular/core';
import { User } from "./user/user";
import { UserService } from "./user/user.service";
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, TranslateService]
})
export class AppComponent implements OnInit {
  public name='test';
  public title = 'Tour of Heroes';
  user: User;
param = {value: 'world'};
  public constructor(private userService: UserService, private translate: TranslateService) {
    this.translateInit();
    this.user = new User('', '');
  }
  private translateInit() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');
  }

  public isLogged(): boolean {
    if (this.user.group == "Guest") return false;
    else return true;
  }

  ngOnInit(): void {
    this.userService.getUser().then(user => {
      this.user = user;
    });
  }

}