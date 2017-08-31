import { I_MessengerObserver } from "./i-messenger-observer";

export class MessengerSubject {
    private observers: I_MessengerObserver[] = [];

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
            result += el.getMessage();
        });

        return result;
    }
}