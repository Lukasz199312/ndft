import { I_ValueBox } from "./i-value-box";

export abstract class ElementRoot<T extends I_ValueBox>{
    public abstract check(value: T);
    public abstract  resetMessage();
}