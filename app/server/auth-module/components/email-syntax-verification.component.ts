import { Component } from '../../basic-module/component';
import { Module } from '../../basic-module/module';
import { SyntaxVerification } from '../../syntax-verification/syntax-verification';

/**
 * Component adds to outData SyntaxVerificationEmail variable
 */

export class EmailSyntaxVerificationComponent<T extends Module> extends Component<T> {
    private Roules: any = {
        Length_Min: 4,
        Length_Max: 32
    }

    constructor(component) {
        super(component);

        this.ComponentName = "EmailSyntaxVerificationComponent";
    }

    public execute(data: any) {
        this.outData = data;

        this.isNormalEmailAdress();
        this.parentComponent.execute(data);
    }

    /**
     * Check is email has correct syntax
     */

    private isNormalEmailAdress(): any {
        var syntaxVerification = new SyntaxVerification();
        var userData = this.outData;

        //if(userData.email === undefined) throw Error("email is not definied, set in execute as  parametr {email: sample@email.com}");

        if (syntaxVerification.isEmailAddress(userData.email)) {
            if( syntaxVerification.Length(this.Roules.Length_Min, this.Roules.Length_Max, userData.email) )
                 return userData.SyntaxVerificationEmail = true;
        }
        
        return userData.SyntaxVerificationEmail = false;

    }
}