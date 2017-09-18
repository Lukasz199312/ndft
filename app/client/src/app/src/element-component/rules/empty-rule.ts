import { FieldRule } from "./field-rule";
import { I_ValueBox } from "../i-value-box";

export class EmptyRule<T extends I_ValueBox> extends FieldRule<T> {

    public check(value: T) {
        if(value.value == '' || value.value == null) this.callRootRuleError(value);
        else this.element.check(value);
    }

}