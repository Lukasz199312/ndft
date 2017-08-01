import { Component } from '../../basic-module/component';
import { Module } from '../../basic-module/module';
import { SyntaxVerification } from '../../syntax-verification/syntax-verification';

/**
 * Component adds to outData passwordVerificationMsg which it can have following values
 *  * Correct_Length
 *  * Correct_Verification_Password
 *  * Incorrect_Words
 *  * Incorrect_Length
 *  * Password_DOESNT_EQUAL
 * 
 * passwordVerificationResult variables return true or false
 */

export class PasswordSyntaxVerification<T extends Module> extends Component<T> {

    private Roules: any = {
        Length_Min: 5,
        Length_Max: 32
    }

    constructor(component) {
        super(component);

        this.ComponentName = "PasswordSyntaxVerification";
    }

    public execute(data: any) {
        this.outData = data;

        this.isNormalPasword();
        this.parentComponent.execute(data);
    }

    /**
     * Check is password has corrent syntax
     */

    private isNormalPasword() {
        var syntaxVerification = new SyntaxVerification();

        if (this.outData.password == this.outData.passwordConfirm) {
            if (syntaxVerification.Length(this.Roules.Length_Min, this.Roules.Length_Max, this.outData.password)) {

                this.outData.passwordVerificationMsg = "Correct_Length";
                this.outData.passwordVerificationResult = false;

                if (syntaxVerification.isAlphaNumeric(this.outData.password)) {
                    this.outData.passwordVerificationMsg = "Correct_Verification_Password";
                    this.outData.passwordVerificationResult = true;
                }
                else {
                    this.outData.passwordVerificationMsg = "Incorrect_Words";
                    this.outData.passwordVerificationResult = false;
                }
            } else {

                this.outData.passwordVerificationMsg = "Incorrect_Length";
                this.outData.passwordVerificationResult = false;
            }
        }
        else {
            this.outData.passwordVerificationMsg = "Password_DOESNT_EQUAL";
            this.outData.passwordVerificationResult = false;
        }
    }
}