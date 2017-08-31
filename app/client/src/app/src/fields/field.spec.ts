import { I_ValueBox } from "./i-value-box";
import { Field } from "./field";
import { MatchRule } from "./rules/match-rule";
import { FieldRoot } from "./field-root";

class MockField<T extends I_ValueBox> extends FieldRoot<T>{
    private callback: (res: T) => void;
    public check(value: T, message?: string) {

    }

    public setCallback(callback: (value:T) => void) {
        this.callback = callback;
    }
}

describe('Field', () => {
    beforeAll(() => {
 
    })
});