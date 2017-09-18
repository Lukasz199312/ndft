import { ElementComponent } from "./element-component";
import { I_ValueBoxAsync } from "./i-value-box-async";

export class FieldRegisterElementAsync<T extends I_ValueBoxAsync> extends ElementComponent<T> {
    private confirmCallback: (value: T) => void;
    private interruptCallback: () => void;
    private callID: number = 0;

    public interrupt(value: T, message?: string) {
        if(value.callID ==  undefined) throw new Error('value.callID is undefined do you forget add AsyncRule?')
        if(this.getCallID() > value.callID) return;

        this.setMessage(message);
        this.interruptCallback();
    }
    public confirm(value: T) {
        if(value.callID ==  undefined) throw new Error('value.callID is undefined do you forget add AsyncRule?')
        if(this.getCallID() > value.callID) return;

        this.setMessage('');
        this.confirmCallback(value);
    }

    public setInterrupt(callback: () => void) {
        this.interruptCallback = callback;
    }

    public setConfirm(callback: (value: T) => void) {
        this.confirmCallback = callback;
    }

    public increaseCallID() {
        this.callID += 1;
    }

    public getCallID(): number {
        return this.callID;
    }

}