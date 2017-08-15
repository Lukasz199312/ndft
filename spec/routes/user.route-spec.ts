import { Server } from '../server';
import { UserRoute } from '../../app/server/routes/user.route';
import { User } from '../../app/server/user/user';
import request = require('supertest');
var bodyParser = require('body-parser');

var server: Server;
describe('User route', () => {
    beforeAll(() => {
        server = Server.bootstrap();

        server.app.use(bodyParser.json());
        server.app.use(bodyParser.urlencoded({ extended: false }));

        server.app.use(new UserRoute().router);

    });

    it('/api/user : should return fail when email is undefined', (done) => {
        server.agent.post('/api/user')
            .send({ name: 'testName123', password: '121212121212', repeatPassword: '121212121212' })
            .expect(200, (err, res) => {
                expect(res.body.registerComplete).toBeFalsy();
                expect(res.body.message).toContain('Email is undefined');
                done();
            });

    });

    it('/api/user : should return fail when repeatPassword is undefined', (done) => {
        server.agent.post('/api/user')
            .send({ name: 'testName123', password: '121212121212' })
            .expect(200, (err, res) => {
                expect(res.body.registerComplete).toBeFalsy();
                expect(res.body.message).toContain('Repeat Password is undefined');
                done();
            });

    });

    it('/api/user : should return fail when password is undefined', (done) => {
        server.agent.post('/api/user')
            .send({ name: 'testName123' })
            .expect(200, (err, res) => {
                expect(res.body.registerComplete).toBeFalsy();
                expect(res.body.message).toContain('Password is undefined');
                done();
            });

    });

    it('/api/user : should return fail when name is undefined', (done) => {
        server.agent.post('/api/user')
            .send({ password: '121212121212', repeatPassword: '121212121212', email: 'daniel@os.pl' })
            .expect(200, (err, res) => {
                expect(res.body.registerComplete).toBeFalsy();
                expect(res.body.message).toContain('Name is undefined');
                done();
            });

    });

    it('/api/user : should return fail when password not equal to repeatPassword', (done) => {
        server.agent.post('/api/user')
            .send({ name: 'admin', password: '121212121212', repeatPassword: '12121212121233', email: 'daniel@os.pl' })
            .expect(200, (err, res) => {
                expect(res.body.registerComplete).toBeFalsy();
                expect(res.body.message).toContain('The password must be the same');
                done();
            });

    });

    it('/api/user : should return fail when email has wrong syntax', (done) => {
        server.agent.post('/api/user')
            .send({ name: 'admin', password: '121212121212', repeatPassword: '121212121212', email: 'daniell`' })
            .expect(200, (err, res) => {
                expect(res.body.registerComplete).toBeFalsy();
                expect(res.body.message).toContain('Invalid email address');
                done();
            });

    });

    it('/api/user : should return fail password has invalid length', (done) => {
        server.agent.post('/api/user')
            .send({ name: 'admin', password: '1212', repeatPassword: '1212', email: 'daniel@os.pl' })
            .expect(200, (err, res) => {
                expect(res.body.registerComplete).toBeFalsy();
                expect(res.body.message).toContain('Invalid password length');
                done();
            });

    });

    it('/api/user : should return fail when name exist in database', (done) => {
        server.agent.post('/api/user')
            .send({ name: 'admin', password: '121212121212', repeatPassword: '121212121212', email: 'daniel@os.pl' })
            .expect(200, (err, res) => {
                expect(res.body.registerComplete).toBeFalsy();
                expect(res.body.message).toContain('Username exist in database');
                done();
            });

    });

    it('/api/user : should return fail when email exist in database', (done) => {
        server.agent.post('/api/user')
            .send({ name: 'adminTest', password: '121212121212', repeatPassword: '121212121212', email: 'john@email.com' })
            .expect(200, (err, res) => {
                expect(res.body.registerComplete).toBeFalsy();
                expect(res.body.message).toContain('Email Address exist in database');
                done();
            });

    });

    it('/api/user : should return true after successful register', (done) => {
        server.agent.post('/api/user')
            .send({ name: 'adminTest', password: '121212121212', repeatPassword: '121212121212', email: 'john-test@email.com' })
            .expect(200, (err, res) => {
                expect(res.body.registerComplete).toBeTruthy();
                done();
            });

    });


    it('/api/user-name-available/ : should return true when name does not exist in database', (done) => {
        server.agent.get('/api/user-name-available/NoexistName')
            .expect(200, (err, res) => {
                expect(res.body.isAvailable).toBeTruthy();
                done();
            });

    });

    it('/api/user-name-available/:name : should return false when name exist in database', (done) => {
        server.agent.get('/api/user-name-available/admin')
            .expect(200, (err, res) => {
                expect(res.body.isAvailable).toBeFalsy();
                done();
            });

    });

    it('/api/user-email-available/:email : should return false when email exist in database', (done) => {
        server.agent.get('/api/user-email-available/thomas@email.com')
            .expect(200, (err, res) => {
                expect(res.body.isAvailable).toBeFalsy();
                done();
            });

    });

    it('/api/user-email-available/:email : should return true  when email does not  exist in database', (done) => {
        server.agent.get('/api/user-email-available/super@test.pl')
            .expect(200, (err, res) => {
                expect(res.body.isAvailable).toBeTruthy();
                done();
            });

    });

})