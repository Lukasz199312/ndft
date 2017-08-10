export class TranslateMSG {
    private value: string = '';
    private msg: string = '';

    public initialize (msg: string) {
        this.msg = msg;
    }

    public set() {
        this.value = this.msg;
    }

    public get(): string {
        return this.value;
    }

    public reset() {
        this.value = '';
    }
}