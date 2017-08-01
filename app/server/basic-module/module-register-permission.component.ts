import { SuperComponent } from './supercomponent';
import { Module } from './module';
import { DatabaseQueryComponent } from '../database/components/database.query.component';

export class ModuleRegisterPermissionComponent<T extends Module> extends SuperComponent<T>{

    public execute(data: any) {
        if(data.__RegisterMe === true)
        this.callback(data, this.parentComponent, this)

    }

    private RegisterComponent() {

    }
}