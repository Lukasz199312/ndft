import { I_ValueBox } from "../i-value-box";
import { FieldRule } from "./field-rule";
import { I_RuleService } from "./i-rule-service";

export class FieldRuleService<T extends I_ValueBox> extends FieldRule<T> {
    private service: I_RuleService;
    private method: string;

    public check(value: T) {
        this.service.shellMethod(value.value, this.method, res => {
            if (res) {
                this.element.check(value);
            }
            else {
                this.callRootRuleError(value);
            }
        })
    }

    public set(service: I_RuleService, method: string): FieldRuleService<T> {
        this.service = service;
        this.method = method;
        return this;
    }


}