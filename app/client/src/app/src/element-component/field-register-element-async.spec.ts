import { I_ValueBox } from "./i-value-box";
import { ElementComponent } from "./element-component";
import { FieldRule } from "./rules/field-rule";
import { I_RuleService } from "./rules/i-rule-service";
import { FieldRuleService } from "./rules/field-rule-service";
import { MessengerSubject } from "../messenger/messenger-subject";
import { FieldRegisterElementAsync } from "./field-register-element-async";
import { I_ValueBoxAsync } from "./i-value-box-async";
import { AsyncRule } from "./rules/async-rule";

const timeOutTime: number = 200;
class MockClass {
    public mockFunction(value: string): boolean {
        if (value == '') return false;
        return true;
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
    shellMethod(value: string, method: string, callback: (res: boolean) => void) {
        setTimeout(() => {
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
        }, timeOutTime);
    }

}

var msg = {
    first: 'this is first message',
    second: 'this is second message',
    third: 'this is third message'
}


describe('Field register element async', () => {
    var root: FieldRegisterElementAsync<I_ValueBoxAsync>;
    var element: FieldRule<I_ValueBoxAsync>;
    var messengerSubject: MessengerSubject;
    var mockServiceTimeout: MockServiceTimeout;

    beforeAll(() => {
        mockServiceTimeout = new MockServiceTimeout();
        messengerSubject = new MessengerSubject();

        root = new FieldRegisterElementAsync();
        element = new FieldRuleService(root, root, msg.first).set(mockServiceTimeout, 'confirm');
        element = new MockRule(element, root, msg.second);

        messengerSubject.add(root);

        root.setConfirm((val) => {

        });

        root.setInterrupt(() => {

        });
    });

    it('should interrup mock field element', () => {
        element.check({ value: null, callID: 0 });
        expect(messengerSubject.getMessage()).not.toBe('');
    });

    it('should desynchronization rules dont set error message after rule fail', (done) => {
        spyOn(root, 'confirm').and.callThrough();
        spyOn(root, 'interrupt').and.callThrough();

        var callFunc = {
            test: () => {}
        }

        spyOn(callFunc,'test');

        root.setConfirm((val) => {
            callFunc.test();
        });

        setTimeout(function() {
            expect(root.interrupt).toHaveBeenCalled();
            expect(callFunc.test).toHaveBeenCalled();
            done();
        }, timeOutTime + 50);

        expect(messengerSubject.getMessage()).not.toBe('');

        element.check({ value: 'Jasmine', callID: 0 });
        element.check({ value: null, callID: 0 });
    });

    it('should synchronization rules after added AsyncRule', (done) => {
        spyOn(root, 'confirm').and.callThrough();
        spyOn(root, 'interrupt').and.callThrough();

        var callFunc = {
            test: () => {}
        }

        spyOn(callFunc,'test');

        root.setConfirm((val) => {
            callFunc.test();
        });
        
        setTimeout(function() {
            expect(root.interrupt).toHaveBeenCalled();
            expect(callFunc.test).not.toHaveBeenCalled();
            done();
        }, timeOutTime + 50);

        root.setInterrupt(() => {
            expect(root.getCallID()).toBe(2);
            expect(root.confirm).not.toHaveBeenCalled();
        });
        element = new AsyncRule(element, root, null, null, false);

        expect(messengerSubject.getMessage()).toBe('');


        element.check({ value: 'Jasmine' });
        element.check({ value: null });
    });


});