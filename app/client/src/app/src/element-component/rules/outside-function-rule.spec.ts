import { I_ValueBox } from "../i-value-box";
import { ElementComponent } from "../element-component";
import { FieldRule } from "./field-rule";
import { OutSideFunction } from "./outside-fuction-rule";

class MockClass {
    public mockFunction(value: string): boolean {
        if(value == '') return false;
        return true;
    }
}

class MockField<T extends I_ValueBox> extends ElementComponent<T> {
    
        public onError: (value: T) => void;
        public onPositive: (value: T) => void;
    
        public interrupt(value: T, message: string) {
            return message;
        }
        public confirm(value: T) {
           // this.onPositive(value);
        }
    
    }
    
    class MockRule<T extends I_ValueBox> extends FieldRule<T> {
        public check(value: T) {
            if(value.value == null) return;
            this.element.check(value);
        }
    
    }

    var msg = {
        first: 'this is first message',
        second: 'this is second message',
        third: 'this is third message'
    }

describe('Outside function rule', () => {
    var rootElement: MockField<I_ValueBox>;
    var elementRule: FieldRule<I_ValueBox>;
    var mockedClass: MockClass;

    beforeAll(() => {
        mockedClass = new MockClass();
        rootElement = new MockField();
        elementRule = new MockRule(rootElement, rootElement, msg.first);
        elementRule = new MockRule(elementRule, rootElement, msg.second);
        elementRule = new OutSideFunction(elementRule, rootElement, msg.third).set(mockedClass.mockFunction);
    });

    it('should call mockFunction', () => {
        spyOn(rootElement, 'confirm');
        elementRule.check({value: 'David', optional: 'Robinson'});
        expect(rootElement.confirm).toHaveBeenCalled();
    });

    it('should not call mockFunction', () => {
        spyOn(rootElement, 'confirm');
        elementRule.check({value: '', optional: 'Robinson'});
        expect(rootElement.confirm).not.toHaveBeenCalled();
    });


})