import { Component } from '../../basic-module/component';
import { Module } from '../../basic-module/module';
import { SyntaxVerification } from '../../syntax-verification/syntax-verification';

/**
 * Component adds to outData passwordVerificationMsg and passwordVerificationResult variables
 */

export class RegisterTxtComponent<T extends Module> extends Component<T> {
    public link: string;

    public execute(data: any) {
        data.mailMsg = this.getMsg();
        data.mailSubject = "Potwierdzenie rejestracji";

        this.parentComponent.execute(data);
    }

    public setLink(link: string): RegisterTxtComponent<T> {
        this.link = link;
        return this;
    }

    private getMsg(): string {
        return `<h1>Dziękujemy za rejstracje!</h1>
<p>Ostatnim krokiem jaki został aby w pełni korzystać serwisu jest potwierdzenia procesu rejestracji. Możesz tego dokonać klikając w link: Link: <a href="`+ this.link + `">` + this.link + `</a> rejestracyjny wygasa po upływie 48h!</p>
<p>Jeżeli nie rejestrowałeś/aś się w naszym serwisie prosimy o zignorowanie wiadomości.</p>
<p>&nbsp;</p>
<p><em>Ta wadomośc została wygenerowana atuomatycznie, prosimy na nią nie odpowiadać.</em></p>`
    }

}