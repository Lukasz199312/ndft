import { FieldRule } from "./field-rule";
import { I_ValueBoxAsync } from "../i-value-box-async";
import { ElementRoot } from "../element-root";
import { ElementComponent } from "../element-component";
import { FieldRegisterElementAsync } from "../field-register-element-async";

export class AsyncRule<T extends I_ValueBoxAsync> extends FieldRule<T> {

    public check(value: T) {
        var root = this.castRootElement();

        root.increaseCallID();
        value.callID = root.getCallID();

        this.check(value);
    }

    private castRootElement(): FieldRegisterElementAsync<T> {
        return (<FieldRegisterElementAsync<T>>this.root);
    }

    

}