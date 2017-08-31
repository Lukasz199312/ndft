import { MessengerSubject } from "./messenger-subject";
import { I_MessengerObserver } from "./i-messenger-observer";

class MockObserer implements I_MessengerObserver {
    private value:string;

    constructor(value: string) {
        this.value = value;
    }

    getMessage(): string {
        return this.value;
    }

}

var Message = {
    ob1: 'Ob1. ',
    ob2: 'Ob2. ',
    ob3: 'Ob3. '
}

describe('Messenger-Subject ', () => {
    var subject: MessengerSubject;
    var ob1: I_MessengerObserver;
    var ob2: I_MessengerObserver;
    var ob3: I_MessengerObserver;

    beforeAll(() => {
        subject = new MessengerSubject();
        ob1 = new MockObserer(Message.ob1);
        ob2 = new MockObserer(Message.ob2);
        ob3 = new MockObserer(Message.ob3);

        subject.add(ob1);
        subject.add(ob2);
        subject.add(ob3);
    });

    it('should contains specified string', () => {
        var resultMessage = subject.getMessage();
        expect(resultMessage).toContain(Message.ob1);
        expect(resultMessage).toContain(Message.ob2);
        expect(resultMessage).toContain(Message.ob3);
    });

    it('should remove ob2 element', () => {
        subject.remove(ob2);
        var resultMessage = subject.getMessage();

        expect(resultMessage).toContain(Message.ob1);
        expect(resultMessage).not.toContain(Message.ob2);
        expect(resultMessage).toContain(Message.ob3);
    })
})