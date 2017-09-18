import { I_MessengerObserver } from "./i-messenger-observer";

export class MessengerSubject {
    public msg: string = '';
    private observers: I_MessengerObserver[] = [];
    private selector: string = '';

    
    public add(observer: I_MessengerObserver) {
        this.observers.push(observer);
    }

    public remove(observer: I_MessengerObserver) {
        var resultIndex = this.observers.indexOf(observer);
        if(resultIndex == -1) throw new Error("Object does not exist");
        this.observers.splice(resultIndex, 1);
    }

    public getMessage(): string {
        var result: string = ''
        this.observers.forEach(el => {
            if(el.getMessage() != '')
              result += el.getMessage() + this.selector;
        });
        return result;
    }

    public update() {
        this.msg = this.getMessage();
    }

    public setSelecter(selector: string) {
        this.selector = selector;
    }

    public reset() {
        this.msg = '';
    }
}