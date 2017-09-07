import { I_ValueBox } from "./i-value-box";
import { ElementComponent } from "./element-component";
import { FieldRule } from "./rules/field-rule";
import { I_RuleService } from "./rules/i-rule-service";
import { FieldRuleService } from "./rules/field-rule-service";
import { MessengerSubject } from "../messenger/messenger-subject";

class MockClass {
    public mockFunction(value: string): boolean {
        if (value == '') return false;
        return true;
    }
}

class MockField<T extends I_ValueBox> extends ElementComponent<T> {

    public onError: (value: T) => void;
    public onPositive: (value: T) => void;

    public interrupt(value: T, message: string) {
        this.setMessage(message);
    }
    public confirm(value: T) {
    }

}

class MockRule<T extends I_ValueBox> extends FieldRule<T> {
    public check(value: T) {
        if (value.value == null) {
            this.callRootRuleError(value);
            return;
        }
        this.element.check(value);
    }

}

class MockService implements I_RuleService {

    shellMethod(value: string, method: string, callback: (res: boolean) => void) {
        switch (method) {
            case 'confirm': {
                callback(true);
                break;
            }
            case 'reject': {
                callback(false);
                break;
            }
        }
    }

}

class MockServiceTimeout implements I_RuleService {
    callback: (done: any) => void;
    done: any;

    shellMethod(value: string, method: string, callback: (res: boolean) => void) {
        setTimeout(() => {
            switch (method) {
                case 'confirm': {
                    callback(true);
                    this.callback(this.done);
                    break;
                }
                case 'reject': {
                    callback(false);
                    this.callback(this.done);
                    break;
                }
            }
        }, 100);
    }

}

var msg = {
    first: 'this is first message',
    second: 'this is second message',
    third: 'this is third message'
}


fdescribe('field rule service synchronization', () => {
    var root: ElementComponent<I_ValueBox>
    var element: FieldRule<I_ValueBox>;
    var elementService: FieldRuleService<I_ValueBox>;
    var mockServiceTimeout: MockServiceTimeout;
    var messengerSubject: MessengerSubject;

    beforeAll(() => {
        mockServiceTimeout = new MockServiceTimeout();
        messengerSubject = new MessengerSubject();

        root = new MockField();
        elementService = new FieldRuleService(root, root, msg.second).set(mockServiceTimeout, 'confirm');
        element = new MockRule(elementService, root, msg.first);

        messengerSubject.add(root);
    });

    it('should interrup mock field element', () => {
        element.check({ value: null });
        expect(messengerSubject.getMessage()).not.toBe('');
    })

    it('should desynchronization rules dont set error message after rule fail', (done) => {
        expect(messengerSubject.getMessage()).not.toBe('');

        mockServiceTimeout.done = done;
        mockServiceTimeout.callback = (done) => {
            expect(messengerSubject.getMessage()).toBe('');
            done();
        }
        element.check({ value: 'Jasmine' });
        element.check({ value: null });
    })


});