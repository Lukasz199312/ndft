import { I_ValueBox } from "./i-value-box";
import { ElementComponent } from "./element-component";
import { MatchRule } from "./rules/match-rule";
import { ElementRoot } from "./element-root";
import { MessengerSubject } from "../messenger/messenger-subject";

class MockField<T extends I_ValueBox> extends ElementComponent<T> {

    public onError: (value: T) => void;
    public onPositive: (value: T) => void;

    public interrupt(value: T, message: string) {
        this.setMessage(message);
    }
    public confirm(value: T) {
        
    }

}

var messenger: MessengerSubject;
var rootField: MockField<I_ValueBox>;
var matchMessage: string = 'Match does not match';
var field: ElementRoot<I_ValueBox>

fdescribe('Field', () => {
    beforeAll(() => {
        messenger = new MessengerSubject();
        rootField = new MockField();
        field = new MatchRule(rootField, rootField, matchMessage);

        messenger.add(rootField);
    })

    it('Field should return message through messenger when fail', () => {
        field.check({ value: 'Discord', optional: '123456' });
        expect(messenger.getMessage()).toEqual(matchMessage);
    });

    it('Field should does not return message through messenger when confirm', () => {
        field.check({ value: 'Discord', optional: 'Discord' });
        expect(messenger.getMessage()).not.toEqual(matchMessage);
        expect(messenger.getMessage()).toEqual('');
    });
});