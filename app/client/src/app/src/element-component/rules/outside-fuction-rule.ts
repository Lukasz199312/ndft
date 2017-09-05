import { I_ValueBox } from "../i-value-box";
import { FieldRule } from "./field-rule";

export class OutSideFunction<T extends I_ValueBox> extends FieldRule<T> {
    private OutSideFunction: (value: string) => boolean;

    public check(value: T) {
        var result = this.OutSideFunction(value.value);
        if(result) {
            this.element.check(value);
            return;
        }
        this.callRootRuleError(value);
    }

    public set(outSide: (value: string) => boolean): OutSideFunction<T> {
        this.OutSideFunction = outSide;
        return this;
    }

}