import { I_ValueBox } from "./i-value-box";
import { ElementRoot } from "./element-root";
import { I_MessengerObserver } from "../messenger/i-messenger-observer";

export abstract class ElementComponent<T extends I_ValueBox> extends ElementRoot<T> implements I_MessengerObserver {
    public message: string = '';

    public abstract interrupt(value: T, message?: string);
    public abstract confirm(value: T);

    public check(value: T) {
        this.resetMessage();
        this.confirm(value);
    }

    public getMessage(): string {
        return this.message;
    }

    public resetMessage() {
        this.message = '';
    }
    
    protected setMessage(message: string) {
        this.message = message;
    }

}