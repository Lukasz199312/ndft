import { Server } from "../server";
import userModel = require('../../app/server/database/models/user.model');
import { CryptoHash } from '../../app/server/crypto/crypto-hash';
import { AddUser } from '../../app/server/user/add-user';
import UserGroupModel = require('../../app/server/database/models/user-group.model');
import { RouteDispatcher, QueueSync } from '../../app/server/permission/route-dispatcher';

var mongoose = require('mongoose');

beforeAll((done) => {
    mongoose.connect('mongodb://localhost/test-ndft');

    var connection = mongoose.connection;
    mongoose.Promise = global.Promise;

    connection.on('error', console.error.bind(console, 'connection error: '));
    connection.once('open', () => {
        Server.bootstrap();

        var user1 = new AddUser().add('admin', 'adminpass123', 'admin@email.com', null, null);
        var user2 = new AddUser().add('John', 'qwerty1235', 'john@email.com', null, null);
        var user3 = new AddUser().add('Thomas', '123456', 'thomas@email.com', null, null);

        var routeDispatcher = new RouteDispatcher();

        routeDispatcher.add('/test/name/:data', makeRegExp('/test/name/:data'), "post");
        routeDispatcher.add('/test/name/:data', makeRegExp('/test/name/:data'), "get");
        routeDispatcher.add('/test/name/:data', makeRegExp('/test/name/:data'), "put");
        routeDispatcher.add('/test/page/:id/:value', makeRegExp('/test/name/:data'), "get");

        var resultRouter = routeDispatcher.registerAll();

        Promise.all([user1, user2, user3, resultRouter]).then(data => {
            done();
        });
    });
});

function makeRegExp(value: string): RegExp {
    value = value.replace(/:[^\/]+/g, '[^\\/]+');
    value = value.replace(/\/(?!])/g, '\\/');

    return new RegExp('^' + value + '$');
}

afterAll((done) => {
    mongoose.connection.db.dropDatabase((er, result) => {
        console.log("Dropping Database");
        done();
    });
});

