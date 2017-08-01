import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "../assets/i18n/");
}

@NgModule({
    imports: [
        HttpModule
    ],
    exports: [TranslateModule]
})
export class AppTranslateModule { }