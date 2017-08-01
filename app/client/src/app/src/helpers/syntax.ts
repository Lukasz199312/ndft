export class Syntax {
    public isEmailAddress(val): boolean {
        if (val.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
            return true;
        }
        else {
            return false;
        }

    }
}