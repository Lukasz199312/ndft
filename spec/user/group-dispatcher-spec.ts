import UserGroupModel = require('../../app/server/database/models/user-group.model');
import { I_UserGroup } from "../../app/server/database/models/i_user-group";
import { GroupDispatcher } from '../../app/server/user/group-dispatcher';
import { RouteDispatcher, QueueSync } from '../../app/server/permission/route-dispatcher';

var groupDispatcher: GroupDispatcher;
describe('Group Disptacher', () => {
    beforeAll(() => {
        groupDispatcher = new GroupDispatcher();
    });

    it('schould create new group and return true', (done) => {
        groupDispatcher.create('testGroup', [
            RouteDispatcher.routePathToID('/test/name/:data', 'post'),
            RouteDispatcher.routePathToID('/test/name/:data', 'get'),
            RouteDispatcher.routePathToID('/test/page/:id/:value', 'get')
        ]).then((res) => {
            expect(res).toBeTruthy();
            done();
        });
    });

    it('schould return true when group esist in database', (done) => {
        groupDispatcher.isExist('testGroup').then((res) => {
            expect(res).toBeTruthy();
            done();
        });
    });

    it('schould return user group document', (done) => {
        groupDispatcher.get('testGroup').then((res) => {
            expect(res).not.toBeNull();
            done();
        });
    });

    it('schould not return user group document', (done) => {
        groupDispatcher.get('NOT_EXISTING_GROUP').then((res) => {
            expect(res).toBeNull();
            done();
        });
    });

    it('schould return false when group not esist in database', (done) => {
        groupDispatcher.isExist('NOT_EXISTING_GROUP').then((res) => {
            expect(res).toBeFalsy();
            done();
        });
    });

    it('should update group permission and return true', (done => {
        groupDispatcher.updatePermission('testGroup', [
            RouteDispatcher.routePathToID('/test/name/:data', 'put'),
        ]).then(result => {
            expect(result).toBeTruthy();
            groupDispatcher.get('testGroup').then(result => {
                expect(result._permission[0]._id).toEqual(RouteDispatcher.routePathToID('/test/name/:data', 'put'));
                done();
            });
        });
    }));

    it('should update group Name and return true', (done) => {
        groupDispatcher.updateGroupName('testGroup', 'UpdatedTestGroup').then((res) => {
            expect(res).toBeTruthy();
            done();
        })
    });

    it('should not update group name and return false', (done) => {
        groupDispatcher.updateGroupName('testGroup', 'UpdatedTestGroup').then((res) => {
            expect(res).toBeFalsy();
            done();
        })
    });

    it('should return 2 groups', (done) => {
        groupDispatcher.create('MyNewTestGrup', [
            '5953efdd13320311ac36b97f',
            '5953efdd13320311ac36b97c']).then((val) => {
                groupDispatcher.getAll().then((array) => {
                    expect(array.length).toBeGreaterThanOrEqual(2);
                    done();
                });
            });
    });

    it('should remove group and return null when operation was end successful', (done) => {
        groupDispatcher.remove('UpdatedTestGroup').then((err) => {
            expect(err).toBeNull();
            groupDispatcher.getAll().then(array => {
                expect(array.length).toBe(1);
                expect(array[0].name).toBe('MyNewTestGrup');
                groupDispatcher.get(array[0].name).then(result => {
                    expect(result).not.toBeNull();
                    done();
                })
            });
        });
    });
})