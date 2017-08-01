//import { User } from '../user/user';
import { Module } from './module';

/**
 * It is basic component abstract class
 */
export abstract class Component<T extends Module> extends Module {
    public parentComponent: T;

    protected ComponentName: string;

    constructor(parentComponent: T) {
        if(parentComponent == null) return;
        
        super(null);
        this.parentComponent = parentComponent;
        this.Root = parentComponent.Root;

    }


    /**
     * Fuction returns ComponentName
     */

     public getName(): string {
         if( this.checkIsNotNull() == false ) new Error("ComponentName can't be empty or null");
         return this.ComponentName;
     }

    /**
     *  Function is checks does ComponentName was declared 
     */

    private checkIsNotNull(): Boolean {
        if (this.ComponentName == null || this.ComponentName == "") return false;
    }

}   