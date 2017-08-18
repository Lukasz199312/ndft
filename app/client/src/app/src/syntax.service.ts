import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ToHex } from './helpers/to-hex';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SyntaxService {

    private passwordSubject: Subject<string>;
    private passwordPromise: Promise<boolean>;

    constructor(private http: Http) {
        this.passwordPromise = this.passwordSubject
            .debounceTime(250)
            .map(x => this.observableIsPassword(x))
            .flatMap(x => x)
            .toPromise();

    }

    /**
     * sends to subject value and return promise
     * @param password 
     */

    public isPassword(password: string): Promise<boolean> {
        this.passwordSubject.next(password);
        return this.passwordPromise;
    }

    /**
     *  returns http response about does password has valid syntax
     * @param password 
     */
    private observableIsPassword(password: string): Observable<boolean> {
        password = ToHex.convert(password).flatt();
        return this.http.get('/api/password-syntax/' + password)
            .map((res: any) => {
                let body = res.json();
                return body.registerComplete;
            })
            .catch(err => { throw err })
    }

}