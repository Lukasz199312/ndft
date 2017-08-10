import userModel = require('../../app/server/database/models/user.model');

describe('AddUser', () => {
    
    it('should contains admin user create by helper', (done) => {
        userModel.model.findOne({name: 'admin'}, (err, user) => {
            if(err) throw Error(err);

            expect(user.name).toBe('admin');
            expect(user.email).toBe('admin@email.com');
            expect(user.isActive).toBeFalsy();
            expect(user.VerificationCode).toBeDefined();
            expect(user.expires).toBeDefined();
            expect(user.salt).toBeDefined()
            expect(user.password).toBeDefined();
            done();
        })
    })
});