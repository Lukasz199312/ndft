import { GetUser } from '../../app/server/user/get-user';

describe('GetUser', () => {
    it('should get John account by name', (done) => {
        new GetUser().by({ name: 'john' }).then((resolve) => {
            expect(resolve).not.toBeNull();
            done();
        });
    });

    it('should get John account by email', (done) => {
        new GetUser().by({ email: 'john@email.com' }).then((resolve) => {
            expect(resolve).not.toBeNull();
            done();
        });
    });
})