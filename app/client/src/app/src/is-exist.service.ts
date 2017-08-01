import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IsExistService {
    constructor(private http: Http) { }

    public email(name: string): Promise<boolean> {
        return this.http.get('api/user-email-available/' + name)
            .map((res: any) => {
                let body = res.json();
                return body.isAvailable;
            })
            .toPromise()
            .catch(err => { throw err })
    }
}