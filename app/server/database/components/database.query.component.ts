import { SuperComponent } from '../../basic-module/supercomponent';
import { Module } from '../../basic-module/module';

export class DatabaseQueryComponent<T extends Module> extends SuperComponent<T> {
    private _model;

    public execute(data: any) {
        this.outData = data;

        this.callback(data, this.parentComponent, this._model, );
    }

    public addModel(model: any): DatabaseQueryComponent<T> {
        this._model = model;
        return this;
    }




}