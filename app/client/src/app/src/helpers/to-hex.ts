export class HexArray {
    private value: string[];
    
    constructor(value: string[]) {
        this.value = value;
    }

    public get(): string[] {
        return this.value;
    }

    public flatt(): string {
        return this.value.reduce((sum, value) => {
            return sum += value;
        });
    }
}

export class ToHex {
    static convert(value: string): HexArray {
        let hexString = [];
        for (var i = 0; i < value.length; i++) {
            hexString.push(value.charCodeAt(i).toString(16));
        }
        return new HexArray(hexString);
    }
}