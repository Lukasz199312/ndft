import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ToHex } from './helpers/to-hex';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SyntaxService {
    constructor(private http: Http) { }

    public password(password: string): Promise<boolean> {
        password = ToHex.convert(password).flatt();
        return this.http.get('/api/password-syntax/' + password)
            .map((res: any) => {
                let body = res.json();
                return body.registerComplete;
            })
            .toPromise()
            .catch(err => { throw err })
    }
}