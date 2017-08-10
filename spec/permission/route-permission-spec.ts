import { RoutePermission } from '../../app/server/permission/route-permission';
class TestRoute extends RoutePermission {
    getName(): string {
        return 'testPermission';
    }

    public check(groupPermission: string[], individualName?: string): boolean {
        return this.checkAccess(groupPermission, individualName);
    }

}

var testRoute: TestRoute;

describe('RoutePermission', () => {
    beforeAll(() => {
        testRoute = new TestRoute();
    });

    it('should return ture when group has access to route', () => {
        expect(testRoute.check(['Elvis', 'Thomas', 'testPermission'])).toBeTruthy();
    });

    it('should return false when group has not access to route', () => {
        expect(testRoute.check(['Elvis', 'Thomas', 'Jane'])).toBeFalsy();
    });

    it('should return ture when group has access to route with individual name', () => {
        expect(testRoute.check(['Elvis', 'Thomas', 'Doroti'], 'Thomas')).toBeTruthy();
    });

    it('should return false when group has not access to route with individual name', () => {
        expect(testRoute.check(['Elvis', 'Thomas', 'testPermission'], 'Lee')).toBeFalsy();
    });

})