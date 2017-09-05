import { I_ValueBox } from "../i-value-box";
import { ElementComponent } from "../element-component";
import { FieldRule } from "./field-rule";
import { ElementRoot } from "../element-root";
import { EmptyRule } from "./empty-rule";
import { MessengerSubject } from "../../messenger/messenger-subject";

class MockField<T extends I_ValueBox> extends ElementComponent<T> {

    public onError: (value: T) => void;
    public onPositive: (value: T) => void;

    public interrupt(value: T, message: string) {
        
    }
    public confirm(value: T) {
        // this.onPositive(value);
    }

}

class MockRule<T extends I_ValueBox> extends FieldRule<T> {
    public check(value: T) {
        if (value.value == null) return;
        this.root.check(value);
    }

}

var rootfield: MockField<I_ValueBox>;
var field: ElementRoot<I_ValueBox>;
var field2: ElementRoot<I_ValueBox>;

describe('Empty Rule', () => {
    beforeAll(() => {
        rootfield = new MockField();
        field = new MockRule(rootfield, rootfield, null, null, false);
        field2 = new EmptyRule(field, rootfield, null, null, false);
    });

    it('should interrupt when value is empty', () => {
        spyOn(rootfield, 'confirm');
        spyOn(rootfield, 'interrupt');
        spyOn(field, 'check').and.callThrough();

        var messenger = new MessengerSubject();
        messenger.add(rootfield);

        field2.check({ value: '' });

        expect(rootfield.confirm).not.toHaveBeenCalled();
        expect(rootfield.interrupt).toHaveBeenCalled();
        expect(field.check).not.toHaveBeenCalled();
        expect(messenger.getMessage()).toBe('');
    });

    it('should confirm when value is not empty', () => {
        spyOn(rootfield, 'confirm');
        spyOn(rootfield, 'interrupt');
        spyOn(field, 'check').and.callThrough();

        field2.check({ value: 'NoEmpty' });

        expect(rootfield.confirm).toHaveBeenCalled();
        expect(rootfield.interrupt).not.toHaveBeenCalled();
        expect(field.check).toHaveBeenCalled();
    });
})