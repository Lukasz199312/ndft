export class DecodeHex {
    public static decode(value: string): string {
        var decoded = '';
        for(var i = 0; i< value.length; i += 2) {
            decoded += String.fromCharCode(parseInt(value.substr(i, 2), 16));
        }
        return decoded;
    }
}