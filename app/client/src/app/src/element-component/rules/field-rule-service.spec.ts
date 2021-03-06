import { I_ValueBox } from "../i-value-box";
import { FieldRule } from "./field-rule";
import { ElementComponent } from "../element-component";
import { FieldRuleService } from "./field-rule-service";
import { I_RuleService } from "./i-rule-service";
import { MessengerSubject } from "../../messenger/messenger-subject";

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

describe('field rule service', () => {
    var root: ElementComponent<I_ValueBox>
    var element: FieldRule<I_ValueBox>;
    var mockService: MockService;

    beforeAll(() => {
        mockService = new MockService();

        root = new MockField();
        element = new MockRule(root, root, msg.first);
        element = new FieldRuleService(element, root, msg.second).set(mockService, 'confirm');
    });

    it('should call mockservice method through service', () => {
        spyOn(mockService, 'shellMethod').and.callThrough();
        spyOn(root, 'interrupt');
        spyOn(root, 'confirm')

        element.check({ value: 'Jasmine' });

        expect(mockService.shellMethod).toHaveBeenCalled();
        expect(root.interrupt).not.toHaveBeenCalled();
        expect(root.confirm).toHaveBeenCalled();
    })


    it('should call mockservice method through service', () => {
        spyOn(mockService, 'shellMethod').and.callThrough();
        spyOn(root, 'interrupt');
        spyOn(root, 'confirm')

        var interupt = new FieldRuleService(element, root, msg.second).set(mockService, 'reject');
        interupt.check({ value: 'Jasmine' });

        expect(mockService.shellMethod).toHaveBeenCalled();
        expect(root.interrupt).toHaveBeenCalled();
        expect(root.confirm).not.toHaveBeenCalled();
    });

});