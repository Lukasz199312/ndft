import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

interface User {
    name: string,
    email: string,
    password: string,
    repeatPassword: string
}

@Injectable()
export class RegisterService {
    constructor(private http: Http) {}

    public register(user: User) {
        this.http.post('/api/user', user, {
            headers: new Headers({ 'Content-type': 'application/json' })
        })
        .toPromise()
        .then((val) => console.log(val));
    }
}