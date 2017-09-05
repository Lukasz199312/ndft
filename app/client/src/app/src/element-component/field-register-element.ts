import { I_ValueBox } from "./i-value-box";
import { ElementComponent } from "./element-component";

export class FieldRegisterElement<T extends I_ValueBox> extends ElementComponent<T> {
    private confirmCallback: (value: T) => void;
    private interruptCallback: () => void;

    public interrupt(value: T, message?: string) {
        this.setMessage(message);
        this.interruptCallback();
    }
    public confirm(value: T) {
        this.setMessage('');
        this.confirmCallback(value);
    }

    public setInterrupt(callback:() => void) {
        this.interruptCallback = callback;
    }

    public setConfirm(callback:(value:T) => void) {
        this.confirmCallback = callback;
    }

}