import { Server } from '../server';
import { IndexRoute } from '../../app/server/routes/index.route';
import { User } from '../../app/server/user/user';
import request = require('supertest');

var server: Server;
describe('index route', () => {

    beforeAll(() => {
        server = Server.bootstrap();
        server.app.use(new IndexRoute().router);
    })

    it('should get json object with current user information', (done) => {
        server.agent.get('/api/current-user').expect(JSON.stringify(new User('Guest', 'Guest'))).end((err, ress) => {
            err == null ? done() : done.fail(err);
        })
    });




});
