import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/debounce';


@Injectable()
export class IsAvailableService {
    //name
    private nameSubject: Subject<string> = new Subject();
    private namePromise: Promise<boolean>
    //email
    private emailSubject: Subject<string> = new Subject();
    private emailPromise: Promise<boolean>

    constructor(private http: Http) {
        this.emailPromise = this.emailSubject
            .debounceTime(250)
            .distinctUntilChanged()
            .map(x => this.observableEmail(x))
            .flatMap(x => x)
            .toPromise();

        this.namePromise = this.nameSubject
            .debounceTime(250)
            .distinctUntilChanged()
            .map(x => this.observableEmail(x))
            .flatMap(x => x)
            .toPromise();
    }

    /**
     * sends to subject value and return promise
     * @param name 
     */

    public email(name: string): Promise<boolean> {
        this.emailSubject.next(name);
        return this.emailPromise;
    }

    /**
     * returns http response about does user email is available
     * @param name 
     */

    private observableEmail(name: string): Observable<boolean> {
        return this.http.get('api/user-email-available/' + name)
            .map((res: any) => {
                let body = res.json()
                return body.isAvailable;
            })
            .catch(err => { throw err })
    }

    /**
     * sends to subject value and return promise
     * @param name 
     */

    public name(name: string): Promise<boolean> {
        this.nameSubject.next(name);
        return this.namePromise;
    }

    /**
     * returns http response about does user name is available
     * @param name 
     */

    private observableName(name: string): Promise<boolean> {
        return this.http.get('api/user-name-available/' + name)
            .map((res: any) => {
                let body = res.json();
                return body.isAvailable;
            })
            .toPromise()
            .catch(err => { throw err });
    }
}