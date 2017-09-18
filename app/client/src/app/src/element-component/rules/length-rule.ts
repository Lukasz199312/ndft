import { FieldRule } from "./field-rule";
import { I_ValueBox } from "../i-value-box";

export class LengthRule<T extends I_ValueBox> extends FieldRule<T> {
    private min: number;
    private max: number;

    public check(value: T) {
        var length = value.value.length;
        if (this.min <= length && length <= this.max){
            this.element.check(value);
        }
        else this.callRootRuleError(value);
    }

    public set(min: number = 0, max: number = 0): LengthRule<T> {
        this.min = min;
        this.max = max;
        return this;
    }

}