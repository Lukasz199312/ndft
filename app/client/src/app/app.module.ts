import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { UserModule } from './user/user-module';

import { AppComponent } from './app.component';
import { WelcomeModule } from './welcome-module/welcome.module';
import { AppTranslateModule } from "./app-translate.module";
import { HttpLoaderFactory as HttpLoaderFactory } from "./app-translate.module";
import { TranslatePipe, TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TestComponent } from "./test.component";


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WelcomeModule,
    AppTranslateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
