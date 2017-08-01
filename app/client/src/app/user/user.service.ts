import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from "./user";

@Injectable()
export class UserService {

    public constructor(private http: Http) {}

    public getUser(): Promise<any> {
        //return Promise.resolve(new User("uknow", "Guest"));
        return this.http.get('/api/session/current').toPromise()
                                    .then((response) => response.json() as User);
    }
}