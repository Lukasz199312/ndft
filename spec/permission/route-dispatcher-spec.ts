import { RouteDispatcher, QueueSync } from '../../app/server/permission/route-dispatcher';
import routeModel = require('../../app/server/database/models/route-model');
import { GroupDispatcher } from '../../app/server/user/group-dispatcher';

var routeDispatcher: RouteDispatcher;

var arrays = [
    { route: '/api/user/:id/:name', method: 'post' },
    { route: '/api/user/:id/:name', method: 'post' },
    { route: '/api/user/:id/:name', method: 'get' },
    { route: '/api/user/:id/:name/delete', method: 'post' },
    { route: '/api/user/:id/:name/update', method: 'post' },
    { route: '/api/user/:id/:name/syntax', method: 'put' },
    { route: '/api/page/:id', method: 'post' },
    { route: '/api/page/:id', method: 'delete' },
    { route: '/api/page/:id', method: 'put' },
];

function makeRegExp(value: string): RegExp {
    value = value.replace(/:[^\/]+/g, '[^\\/]+');
    value = value.replace(/\/(?!])/g, '\\/');

    return new RegExp('^' + value + '$');
}

describe('Route Dispatcher', () => {

    beforeAll((done) => {
        routeDispatcher = new RouteDispatcher();

        arrays.forEach(el => {
            routeDispatcher.add(el.route, makeRegExp(el.route), el.method);
        });

        routeDispatcher.registerAll().then(res => {
            routeModel.model.find({}, (err, routes) => {
                done();
            });
        });

    });


    it('should add to database all unique routes', (done) => {
        routeModel.model.find({}, (err, routes) => {
            //remove 4 added in helper. -1 because array index = n-1
            expect(RouteDispatcher.routes.length - 5).toEqual(arrays.length -1);
            done();
        });
    });

    it('should correcrt parse routes', () => {
        arrays.forEach(el => {
            expect(el.route).toEqual(routeDispatcher.parse(el.route, el.method));
        });
    });

    it('should correcrt parse routes - Manual Test', () => {
        expect(routeDispatcher.parse('/api/user/1/johan', 'post')).toEqual('/api/user/:id/:name');
        expect(routeDispatcher.parse('/api/user/1/johan', 'get')).toEqual('/api/user/:id/:name');
        expect(routeDispatcher.parse('/api/user/23/test/delete', 'post')).toEqual('/api/user/:id/:name/delete');
        expect(routeDispatcher.parse('/api/page/1', 'post')).toEqual('/api/page/:id');
        expect(routeDispatcher.parse('/api/page/2', 'delete')).toEqual('/api/page/:id');
    });

    it('should return null during parsing mismatched route', () => {
        expect(routeDispatcher.parse('/api/user/1/johan', 'put')).toBeNull();
        expect(routeDispatcher.parse('/api/user/1/johan/1', 'get')).toBeNull();
        expect(routeDispatcher.parse('/api/user/23/test/delete', 'delete')).toBeNull();
        expect(routeDispatcher.parse('/api/page/1', 'get')).toBeNull();
        expect(routeDispatcher.parse('/api/page/22/delete', 'delete')).toBeNull();
    });

});