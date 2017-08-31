import { ElementComponent } from "../element-component";
import { I_ValueBox } from "../i-value-box";
import { ElementRoot } from "../element-root";
import { I_MessengerObserver } from "../../messenger/i-messenger-observer";

export abstract class FieldRule<T extends I_ValueBox> extends ElementRoot<T> {
    protected field: ElementRoot<T>;
    protected message: string;
    protected root: ElementComponent<T>;

    constructor(field: ElementRoot<T>, root: ElementComponent<T>, message: string) {
        super();
        this.field = field;
        this.root = root;
        this.message = message;
    }

    protected callRootRuleError(value: T) {
        this.root.interrupt(value, this.message);
    }
}