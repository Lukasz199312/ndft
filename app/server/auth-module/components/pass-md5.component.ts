import { SuperComponent } from '../../basic-module/supercomponent';
import { Module } from '../../basic-module/module';

const md5 = require("md5");

/**
 * Component hash specified variable with md5, it can use  with addCallback((data,next, optionalData)
 */

export class PassMD5Component<T extends Module> extends SuperComponent<T> {

    public execute(data: any) {
        //data.password = md5(this.SALT_PASSWORD + data.password);
        this.callback(data, this.parentComponent, this)

    }

    public Hash(data, objectName:string, SALT_PASSWORD = "") {
        data[objectName] = md5(SALT_PASSWORD + data[objectName]);
        return data;
    }


}