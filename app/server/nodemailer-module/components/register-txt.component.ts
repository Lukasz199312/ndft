import { Component } from '../../basic-module/component';
import { Module } from '../../basic-module/module';
import { SyntaxVerification } from '../../syntax-verification/syntax-verification';
import { MailerMessage } from "../mailer-message";

/**
 * Component adds to outData passwordVerificationMsg and passwordVerificationResult variables
 */

export class RegisterTxtComponent implements MailerMessage {
    public link: string;

    /**
     * set register link
     * @param link 
     */

    public setLink(link: string): void {
        this.link = link;
    }

    private getMsg(): string {
        return `<h1>Dziękujemy za rejstracje!</h1>
                <p>Ostatnim krokiem jaki został aby w pełni korzystać serwisu jest potwierdzenia procesu rejestracji. Możesz tego dokonać klikając w link: Link: <a href="`+ this.link + `">` + this.link + `</a> rejestracyjny wygasa po upływie 48h!</p>
                <p>Jeżeli nie rejestrowałeś/aś się w naszym serwisie prosimy o zignorowanie wiadomości.</p>
                <p>&nbsp;</p>
                <p><em>Ta wadomośc została wygenerowana atuomatycznie, prosimy na nią nie odpowiadać.</em></p>`
    }

    getSubject(): string {
        return 'Potwierdzenie rejestracji';
    }
    getMailMSG(): string {
        if (this.link == undefined || this.link == '' || this.link == null) throw new Error('Message link must be defined before send!');
        return this.getMsg();
    }

}