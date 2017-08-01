'use strict';
import * as node from 'crypto';

interface I_HashResult {
    derivedKey: string,
    salt: string
}

export class CryptoHash {
    private static passwordSalt = '';

    /**
     * Generate hex value and return it as string
     * @param length default value is '32'
     * @param algorithm default value is 'hex'
     */

    public static randomHex(length: number = 32, algorithm: string = "hex"): string {
        return node.randomBytes(length).toString(algorithm);
    }

    /**
     * Async hash specified value and return it as string
     * @param value 
     */

    public static hashPassword(password: string, salt?): Promise<I_HashResult> {
        if(salt === undefined) salt = this.randomHex(32, 'base64');

        return new Promise((resolve, reject) => {
            node.pbkdf2(password, salt, 100000, 128, 'sha512', (err, derivedKey) => {
                if(err) throw err;
                resolve({derivedKey: derivedKey.toString('base64'), salt: salt})
            })
        });
    }
}











