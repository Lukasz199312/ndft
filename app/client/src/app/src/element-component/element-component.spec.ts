import { I_ValueBox } from "./i-value-box";
import { ElementComponent } from "./element-component";
import { MatchRule } from "./rules/match-rule";
import { ElementRoot } from "./element-root";
import { MessengerSubject } from "../messenger/messenger-subject";
import { FieldRule } from "./rules/field-rule";

class MockField<T extends I_ValueBox> extends ElementComponent<T> {

    public onError: (value: T) => void;
    public onPositive: (value: T) => void;

    public interrupt(value: T, message: string) {
        this.setMessage(message);
    }
    public confirm(value: T) {

    }

}

class MockRule<T extends I_ValueBox> extends FieldRule<T> {
    public check(value: T) {
        if (value.value != null) {
            this.element.check(value)
            return;
        }

        this.callRootRuleError(value)
    }

}

class MockRuleCallInterruptOnly<T extends I_ValueBox> extends FieldRule<T> {
    public check(value: T) {
        this.callRootRuleError(value)
    }

}

function AsyncReturnMessage(message: string, time: number): Promise<string> {
    return new Promise(res => {
        setTimeout(function () {
            res(message);
        }, time);
    })
}

describe('Element component', () => {
    var messenger: MessengerSubject;
    var rootField: MockField<I_ValueBox>;
    var matchMessage: string = 'Match does not match';
    var field: ElementRoot<I_ValueBox>

    beforeAll(() => {
        messenger = new MessengerSubject();
        rootField = new MockField();
        field = new MatchRule(rootField, rootField, matchMessage);

        messenger.add(rootField);
    })

    it('Field should return message through messenger when fail', () => {
        field.check({ value: 'Discord', optional: '123456' });
        messenger.update();
        expect(messenger.msg).toEqual(matchMessage);
    });

    it('Field should does not return message through messenger when confirm', () => {
        field.check({ value: 'Discord', optional: 'Discord' });
        messenger.update();
        expect(messenger.msg).not.toEqual(matchMessage);
        expect(messenger.msg).toEqual('');
    });
});
