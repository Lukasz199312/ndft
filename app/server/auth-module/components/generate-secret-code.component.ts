import { Component } from '../../basic-module/component';
import { Module } from '../../basic-module/module';
import { SyntaxVerification } from '../../syntax-verification/syntax-verification';
import * as node from 'crypto';
/**
 * Component adds to outData VerificationCode which has random generate Bytes variables
 */

export class GenerateSecretCodeComponent<T extends Module> extends Component<T> {

    public execute(data: any) {
        data.VerificationCode = node.randomBytes(32).toString("hex");
        this.parentComponent.execute(data);
    }


}