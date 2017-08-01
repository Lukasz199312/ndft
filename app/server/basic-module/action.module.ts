import { Module } from './module'
import { I_Permission } from './i_permission';

export class ActionModule extends Module  {
    private callback: (doc) => void;

    constructor() {
        super(null);

        this.applyCallback(function (data) { });
    }

    public execute(data: any) {
        this.callback(data);
    }

    public applyCallback(callback: (doc) => void  ) {
        this.callback = callback;
        
    }
}