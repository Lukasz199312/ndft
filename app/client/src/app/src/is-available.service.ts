import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as Rx from 'rxjs';


@Injectable()
export class IsAvailableService {
    //name
    private nameSubject: Rx.Subject<any> = new Rx.Subject();
    private callbackName: (value: boolean) => void

    //email
    private emailSubject: Rx.Subject<string> = new Rx.Subject();
    private callbackEmail: (value: boolean) => void

    constructor(private http: Http) {
        // Name Value
        var nameObservable = this.nameSubject
        .debounce(() => Rx.Observable.timer(300))
        .distinctUntilChanged()
        .map(x => this.observableName(x))
        .flatMap(x => x)

        nameObservable.subscribe( value => {
            this.callbackName(value);
        });

        // Email Value
        var emailObservable = this.emailSubject
        .debounce(() => Rx.Observable.timer(300))
        .map(x => this.observableEmail(x))
        .flatMap(x => x)

        emailObservable.subscribe( value => {
            this.callbackEmail(value);
        });
    }


    /**
     * sends to subject value and return promise
     * @param name 
     */

    public name(name: string, callback: (value: boolean) => void ): void {
        this.callbackName = callback;
        this.nameSubject.next(name);
    }

    /**
     * returns http response about does user name is available
     * @param name 
     */

    private observableName(name: string): Rx.Observable<boolean> {
        return this.http.get('api/user-name-available/' + name)
            .map((res: any) => {
                let body = res.json();
                return body.isAvailable;
            })
            .catch(err => { throw err });
    }

    /**
     * sends to subject value and return promise
     * @param name 
     */

    public email(email: string, callback: (value: boolean) => void ): void {
       // console.log("send value" + email)
        this.callbackEmail = callback;
        this.emailSubject.next(email);
    }

    /**
     * returns http response about does user email is available
     * @param name 
     */

    private observableEmail(name: string): Rx.Observable<boolean> {
        return this.http.get('api/user-email-available/' + name)
            .map((res: any) => {
                let body = res.json()
                return body.isAvailable;
            })
            .catch(err => { throw err })
    }

}