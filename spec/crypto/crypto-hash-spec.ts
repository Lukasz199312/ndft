import {CryptoHash} from '../../app/server/crypto/crypto-hash';

describe('Crypto hash', () => {
    it('should hash password', (done) => {
        CryptoHash.hashPassword('samplePass').then(data => {
            var pass1 = data.derivedKey;

            CryptoHash.hashPassword('samplePass', data.salt).then(data => {
                var pass2 = data.derivedKey;

                expect(pass1).toEqual(pass2);
                done();
            })
        })
    });
});