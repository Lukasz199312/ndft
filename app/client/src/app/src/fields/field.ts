import { I_ValueBox } from "./i-value-box";
import { FieldRoot } from "./field-root";

export abstract class Field<T extends I_ValueBox> extends FieldRoot<T>{
    public abstract interrupt(value: T, message?: string);
    public abstract confirm(value: T);

    public check(value: T) {
        this.confirm(value);
    }
}