import { Field } from "../field";
import { I_ValueBox } from "../i-value-box";
import { FieldRoot } from "../field-root";
import { I_MessengerObserver } from "../../messenger/i-messenger-observer";

export abstract class FieldRule<T extends I_ValueBox> extends FieldRoot<T> implements I_MessengerObserver {
    protected field: FieldRoot<T>;
    protected message: string;
    protected root: Field<T>;

    constructor(field: FieldRoot<T>, root: Field<T>, message: string) {
        super();
        this.field = field;
        this.root = root;
        this.message = message;
    }

    public getMessage(): string {
        return this.message;
    }

    protected callRootRuleError(value: T) {
        this.root.interrupt(value, this.message);
    }
}