
export abstract class RoutePermission {

    /**
     * return permission name for all route
     */

    abstract getName(): string;

    /**
     * return permission name for route, when individualName is set, method overrides return value with specified name
     * @param individualName 
     */

    private getPermissionName(individualName?: string): string {
        if (individualName !== undefined) return individualName;
        return this.getName();
    }

    /**
     * check is user has access to this route 
     */

    protected checkAccess(groupPermission: string[], individualName?: string): boolean {
        var name = this.getPermissionName(individualName);

        var result = groupPermission.find((val) => val == name);
        if (result === undefined) return false;
        return true;
    }
}