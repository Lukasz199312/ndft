export class Syntax {
    public isEmailAddress(val): boolean {
        if (val.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
            return true;
        }
        else {
            return false;
        }

    }

    public isName(val: string) : boolean {
        if(val.match(/^[a-zA-Z0-9]* ?[a-zA-Z0-9]*$/)) {
            console.log('confirm')
            return true;
        }
        return false;
    }

    public isPassword(val: string): boolean {
        if (val.match(/^[a-zA-Z0-9!@#$%^&*()]+$/)) {
            console.log('reject')
            return true;
        }
        else {
            return false;
        }
    }
}