import { CryptoHash } from "../crypto/crypto-hash";
import userModel = require('../database/models/user.model');

export class AddUser {

    /**
     * add user to database return promise with specified error and success result
     * @param name 
     * @param password 
     * @param email 
     */

    public add(name: string, password: string, email: string, successResult: any, errorResult: any): Promise<any> {
        return new Promise((resolve, reject) => {
            var verificationCode = CryptoHash.randomHex(128);

            this.generateHashPassword(password).then(data => {
                var user = this.createUserModel(name, data.derivedKey, data.salt, email, verificationCode);

                user.save((err, prod) => {
                    if(err) reject(errorResult);
                    resolve(successResult);
                });
            })
        });
    }

    /**
     * generate user model
     * @param name 
     * @param derivedKey 
     * @param salt 
     * @param email 
     * @param VerificationCode 
     */

    private createUserModel(name: string, derivedKey: string, salt: string, email: string, VerificationCode: string): userModel.I_UserModel {
        var user = new userModel.model({
            name: name.toLocaleLowerCase(),
            displayName: name,
            password: derivedKey,
            salt: salt,
            email: email.toLocaleLowerCase(),
            VerificationCode: VerificationCode
        });

        return user;
    }

    /**
     * hash password and return promise with 'hash' and 'salt'
     * @param password 
     */

    private generateHashPassword(password: string): Promise<{ derivedKey: string, salt: string }> {
        return new Promise((resolve, reject) => {
            CryptoHash.hashPassword(password).then(data => {
                resolve(data);
            });
        });
    }
}