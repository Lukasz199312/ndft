import { Module } from './module'
import { I_Permission } from './i_permission';
import { User } from "../user/user";


export class ActionPermissionModule extends Module implements I_Permission {
    private callback: (doc) => void;
    public name: string;

    constructor() {
        super(null);

        this.applyCallback(function (data) { });
    }

    public execute(data: any) {
        console.log("EXECUtE LAST!!!!!!");
        this.callback(data);
    }

    public applyCallback(callback: (doc) => void) {
        this.callback = callback;
    }

    /**
     * check if user has access to component
     */

    public checkPermission(user: User): boolean {
        var result = 11;
        if (result == -1) return false;
        return true;
    }

    /**
     * return component name
     */

    public getName(): string {
        return this.name;
    }
}