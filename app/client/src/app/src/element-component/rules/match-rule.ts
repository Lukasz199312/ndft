import { I_ValueBox } from "../i-value-box";
import { FieldRule } from "./field-rule";
import { ElementComponent } from "../element-component";

export class MatchRule<T extends I_ValueBox> extends FieldRule<T> {

    public check(value: T) {
        if(this.whenMatchCallNext(value)) return;
        this.callRootRuleError(value);
    }

    private whenMatchCallNext(value: T): boolean {
        if (value.value == value.optional) {
            this.element.check(value)
            return true;
        }
        else return false;
    }

}