import { I_ValueBox } from "./i-value-box";

export abstract class FieldRoot<T extends I_ValueBox>{
    public abstract check(value: T);
}