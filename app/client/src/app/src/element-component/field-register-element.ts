import { I_ValueBox } from "./i-value-box";
import { ElementComponent } from "./element-component";

export class FieldRegisterElement<T extends I_ValueBox> extends ElementComponent<T> {
    private confirmCallback: (value: T) => void;
    private interruptCallback: (message?: string) => void;

    public interrupt(value: T, message?: string) {
        this.setMessage(message);
        this.interruptCallback(message);
    }
    public confirm(value: T) {
        this.setMessage('');
        this.confirmCallback(value);
    }

    public setInterrupt(callback:(message?: string) => void) {
        this.interruptCallback = callback;
    }

    public setConfirm(callback:(value:T) => void) {
        this.confirmCallback = callback;
    }

}