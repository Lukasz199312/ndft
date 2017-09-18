import { I_ValueBox } from "../i-value-box";
import { FieldRule } from "../rules/field-rule";
import { IsAvailableService } from "../../is-available.service";
import { MessengerSubject } from "../../messenger/messenger-subject";
import { ElementComponent } from "../element-component";
import { FieldRegisterElement } from "../field-register-element";
import { FieldRuleService } from "../rules/field-rule-service";
import { OutSideFunction } from "../rules/outside-fuction-rule";
import { Syntax } from "../../helpers/syntax";
import { TranslateService } from "@ngx-translate/core";
import { EmptyRule } from "../rules/empty-rule";
import { MatchRule } from "../rules/match-rule";
import { FieldRegisterElementAsync } from "../field-register-element-async";
import { I_ValueBoxAsync } from "../i-value-box-async";
import { AsyncRule } from "../rules/async-rule";
import { EmptyRuleOptionalValue } from "../rules/empty-rule-optional-value";
import { LengthRule } from "../rules/length-rule";

interface FactoryResult {
    element: FieldRule<I_ValueBox>;
    root: FieldRegisterElement<I_ValueBox>;
}

interface FactoryResultAsync {
    element: FieldRule<I_ValueBox>;
    root: FieldRegisterElementAsync<I_ValueBoxAsync>;
}

export class FactoryFieldRules {
    getName(isAvailableService: IsAvailableService, translate: TranslateService): FactoryResultAsync {
        var root: FieldRegisterElementAsync<I_ValueBoxAsync>;
        var element: FieldRule<I_ValueBoxAsync>;

        root = new FieldRegisterElementAsync();
        element = new FieldRuleService(root, root, '', translate.get('Register.Name-Invalid-Exist-In-Database').toPromise())
            .set(isAvailableService, 'name');
        element = new OutSideFunction(element, root, '', translate.get('Register.Name-Wrong-Syntax').toPromise()).set(new Syntax().isName);
        element = new LengthRule(element, root, '', translate.get('Register.Name-Wrong-Syntax').toPromise()).set(3,32);
        element = new EmptyRule(element, root, null, null, false);
        element = new AsyncRule(element, root, null, null, false);

        return { element: element, root: root }
    }

    getEmail(isAvailableService: IsAvailableService, translate: TranslateService): FactoryResultAsync {
        var root: FieldRegisterElementAsync<I_ValueBoxAsync>;
        var element: FieldRule<I_ValueBoxAsync>;

        root = new FieldRegisterElementAsync();
        element = new FieldRuleService(root, root, '', translate.get('Register.Email-Invalid-Exist-In-Database').toPromise())
            .set(isAvailableService, 'email');
        element = new OutSideFunction(element, root, '', translate.get('Register.Email-Wrong-Syntax').toPromise()).set(new Syntax().isEmailAddress);
        element = new EmptyRule(element, root, null, null, false);
        element = new AsyncRule(element, root, null, null, false);

        return { element: element, root: root }
    }

    getRepeatEmail(isAvailableService: IsAvailableService, translate: TranslateService): FactoryResult {
        var root: FieldRegisterElement<I_ValueBox>;
        var element: FieldRule<I_ValueBox>;

        root = new FieldRegisterElement();
        element = new MatchRule(root, root, '', translate.get("Register.Email-Repeat-Match").toPromise());
        //element = new EmptyRuleOptionalValue(element, root, null, null, false);
        element = new EmptyRule(element, root, null, null, false);

        return { element: element, root: root }
    }

    getPassword(translate: TranslateService): FactoryResult {
        var root: FieldRegisterElement<I_ValueBox>;
        var element: FieldRule<I_ValueBox>;

        root = new FieldRegisterElement();
        element = new OutSideFunction(root, root, '', translate.get('Register.Password-Syntax').toPromise()).set(new Syntax().isPassword);
        element = new LengthRule(root, root, '', translate.get('Register.Password-Syntax').toPromise()).set(6,32);
        element = new OutSideFunction(element, root, '', translate.get('Register.Password-Syntax').toPromise()).set(new Syntax().isPassword);
        element = new EmptyRuleOptionalValue(element, root, null, null, false);
        element = new EmptyRule(element, root, null, null, false);

        return { element: element, root: root }
    }

    getRepeatPassword(translate: TranslateService): FactoryResult {
        var root: FieldRegisterElement<I_ValueBox>;
        var element: FieldRule<I_ValueBox>;

        root = new FieldRegisterElement();
        element = new MatchRule(root, root, '', translate.get("Register.Password-Match").toPromise());
        //element = new EmptyRuleOptionalValue(element, root, null, null, false);
        element = new EmptyRule(element, root, null, null, false);

        return { element: element, root: root }
    }
}