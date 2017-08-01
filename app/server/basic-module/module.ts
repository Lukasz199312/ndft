//import { User } from '../user/user';
import { Component } from './component';
/**
 * It is basic module structure
 */
export abstract class Module {
    public outData: any;
    public Root: Module;

    protected user:any;

    constructor(user) {
        this.user = user;
    }

    /**
     * setUser method changes user uses by components
     */

    public setUser(user:any): Module {
        this.user = user;
        return this;
    }

    /**
     * 
     * @param data - data adds to fucntion
     */

    public abstract execute(data: any);
    


}