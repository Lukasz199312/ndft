import { Component } from '../../basic-module/component';
import { Module } from '../../basic-module/module';
import { SyntaxVerification } from '../../syntax-verification/syntax-verification';

/**
 * Component adds to outData namedVerificationMsg which it can have following values
 *  * Correct_Verification_Name
 *  * Incorrect_Verification_Name
 *  *Incorrect_Length
 * 
 * nameVerificationResult variables return true or false
 */

export class NameSyntaxVerification<T extends Module> extends Component<T> {

    private Roules: any = {
        Length_Min: 3,
        Length_Max: 32
    }

    constructor(component) {
        super(component);

        this.ComponentName = "NameSyntaxVerification";
    }

    public execute(data: any) {
        this.outData = data;

        this.isNormalPasword();
        this.parentComponent.execute(data);
    }

    /**
     * Check is name has corrent syntax
     */

    private isNormalPasword() {
        var syntaxVerification = new SyntaxVerification();

        if (syntaxVerification.Length(this.Roules.Length_Min, this.Roules.Length_Max, this.outData.name)) {

            if (syntaxVerification.isAlphaNumeric(this.outData.name)) {
                this.outData.nameVerificationMsg = "Correct_Verification_Name";
                this.outData.nameVerificationResult = true;
            } else {
                this.outData.nameVerificationMsg = "Incorrect_Verification_Name";
                this.outData.nameVerificationResult = false;
            }
        } else {
            this.outData.nameVerificationMsg = "Incorrect_Length";
            this.outData.nameVerificationResult = false;
        }

    }
}