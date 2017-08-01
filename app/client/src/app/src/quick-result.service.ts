import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuickResultService {
    constructor(private http: Http) { }

    public get<T>(path: string, value: string): Promise<T> {
        return this.http.get(path)
            .map((res: any) => {
                                console.log(res);
                let body = res.json();
                return body[value];
            })
            .toPromise()
            .catch(err => { throw err })
    }
}