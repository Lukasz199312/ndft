import { ElementComponent } from "../element-component";
import { I_ValueBox } from "../i-value-box";
import { ElementRoot } from "../element-root";
import { I_MessengerObserver } from "../../messenger/i-messenger-observer";

export abstract class FieldRule<T extends I_ValueBox> extends ElementRoot<T> {
    protected element: ElementRoot<T>;
    protected message: string;
    protected root: ElementComponent<T>;

    constructor(element: ElementRoot<T>, root: ElementComponent<T>, message: string, asyncMessage?: Promise<string>, optionalParametrRequire = true) {
        super();
        this.element = element;
        this.root = root;

        if(optionalParametrRequire)
            this.ThrowErrorMissingOneParametr(message, asyncMessage);
        else message = '';

        if (asyncMessage == undefined) this.message = message;
        else this.setAsyncMessage(asyncMessage);
    }

    /**
     * interrupts the call chain and call root.interrupt(..) function
     * @param value 
     */

    protected callRootRuleError(value: T) {
        this.root.interrupt(value, this.message);
    }

    /**
     * One of the parameters must be defined
     * @param message 
     * @param asyncMessage 
     */
    private ThrowErrorMissingOneParametr(message: string, asyncMessage: Promise<string>) {
        if ( (message == undefined || message == '' || message == null)
            && (asyncMessage == undefined || asyncMessage == null)) throw new Error('message or asyncMessage must be defined')
    }

    private setAsyncMessage(asyncMessage: Promise<string>) {
        asyncMessage.then(res => {
            this.message = res;
        })
    }

    public resetMessage() {
        this.root.resetMessage();
    }

}