import { Injectable } from '@angular/core';

@Injectable()
export class LogInService {

    /**
     * function verify whether user exsist in database 
     */
    verification(login: string, password: string): Promise<boolean> {
        return Promise.resolve(true);
    }
}