import { FieldRule } from "./field-rule";
import { I_ValueBox } from "../i-value-box";

export class EmptyRuleOptionalValue<T extends I_ValueBox> extends FieldRule<T> {

    public check(value: T) {
        console.log('val: ' + value.optional);
        if(value.optional == '') this.callRootRuleError(value);
        else this.element.check(value);
    }

}