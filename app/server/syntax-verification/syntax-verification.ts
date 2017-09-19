export class SyntaxVerification {
    public isName(val: string) : boolean {
        if(val.match(/^[a-zA-Z0-9]* ?[a-zA-Z0-9]*$/)) {
            return true;
        }
        return false;
    }

    public emailVerification(_email): {msg:string, result:boolean} {
        //data validation email
        if (this.Length(4, 32, _email)) {
            if (this.isEmailAddress(_email)) {
                return { msg: "EMAIL_CORRECT", result: true };

            } else {
                return { msg: "INVALID_EMAIL", result: false };
            }
        } else {
            console.log("Email length must be 4 - 32");
            return { msg: "INVALID_EMAIL_LENGTH", result: false };
        }
    }

    public passwordVerification(password, passwordConfirm) {
        //data validation password
        if (password == passwordConfirm) {
            if (this.Length(6, 32, password)) {
                if (this.isAlphaNumeric(password)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public Length(min, max, data) {
        if (min <= data.length && data.length <= max) {
            return true;
        }
        else {
            return false;
        }
    }

    public isAlphaNumeric(val) {
        if (val.match(/^[a-zA-Z0-9!@#$%^&*()]+$/)) {
            return true;
        }
        else {
            return false;
        }
    }

    public isEmailAddress(val):boolean {
        if (val.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
            return true;
        }
        else {
            return false;
        }

    }

    public isOnlyDigital(val) {
        if (val.match(/^[0-9]+$/)) { return true; }
        else { return false; }
    }
}

///^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/