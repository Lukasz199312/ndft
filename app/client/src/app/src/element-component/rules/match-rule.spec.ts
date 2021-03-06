
import { I_ValueBox } from "../i-value-box";
import { ElementComponent } from "../element-component";
import { ElementRoot } from "../element-root";
import { MatchRule } from "./match-rule";
import { FieldRule } from "./field-rule";

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

var rootfield: MockField<I_ValueBox>;
var field: ElementRoot<I_ValueBox>;
var matchField: ElementRoot<I_ValueBox>;

describe('match rule', () => {

    beforeEach(() => {
        rootfield = new MockField();
        field = new MockRule(rootfield, rootfield,'field rule error');
        matchField = new MatchRule(field, rootfield, 'values does not match');
    });

    it('should call confirm when parametrs match', () => {
        spyOn(rootfield, 'interrupt').and.callThrough();
        spyOn(rootfield, 'confirm').and.callThrough();
        spyOn(field, 'check').and.callThrough();

        matchField.check({optional: 'David', value: 'David'});

        expect(field.check).toHaveBeenCalled();
        expect(rootfield.confirm).toHaveBeenCalled();
        expect(rootfield.interrupt).not.toHaveBeenCalled();
    });

    it('should call interrupt when parametrs does not match', () => {
        spyOn(rootfield, 'interrupt').and.callThrough();
        spyOn(rootfield, 'confirm').and.callThrough();
        spyOn(field, 'check').and.callThrough();

        matchField.check({optional: 'David123', value: 'David'});

        expect(field.check).not.toHaveBeenCalled();
        expect(rootfield.confirm).not.toHaveBeenCalled();
        expect(rootfield.interrupt).toHaveBeenCalled();
        expect(rootfield.interrupt).toHaveBeenCalledWith({optional: 'David123', value: 'David' },'values does not match');
    });

});