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
        this.root.check(value);
    }

}

var rootfield: MockField<I_ValueBox>;
var field: ElementRoot<I_ValueBox>;

describe('match rule', () => {

    beforeEach(() => {
        rootfield = new MockField();
        field = new MockRule(rootfield, rootfield,'field rule error');
    });

    it('should throw error when none optional parametrs it was not set', () => {
        expect(() => {
            new MatchRule(null,null,null);
        }).toThrowError('message or asyncMessage must be defined');

        expect(() => {
            new MatchRule(null,null, '');
        }).toThrowError('message or asyncMessage must be defined');

        expect(() => {
            new MatchRule(null,null, '', Promise.resolve('test string'));
        }).not.toThrowError('message or asyncMessage must be defined');
        
        expect(() => {
            new MatchRule(null,null, '', null, false);
        }).not.toThrowError('message or asyncMessage must be defined');

    });
});