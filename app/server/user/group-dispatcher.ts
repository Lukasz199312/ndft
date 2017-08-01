import UserGroupModel = require('../database/models/user-group.model');
import RouteModel = require('../database/models/route-model');
import { I_UserGroup } from "../database/models/i_user-group";

export class GroupDispatcher {
    /**
     * Create and add new group and add to database
     * @param grupName 
     * @param permission 
     * return true when operation end successful otherwise return false
     */

    public create(grupName: string, permissions: string[]): Promise<boolean> {
        var userGroupModel = new UserGroupModel({
            name: grupName,
            _permission: permissions
        });

        return new Promise((resolve) => {
            userGroupModel.save((err) => {
                if (err == null) resolve(true);
                resolve(false);
            });
        });

    }

    /**
     * Check is Group exist in database
     * @param groupName 
     * return false when group exist in db otherwise return false
     */

    public isExist(groupName: string): Promise<Boolean> {
        return new Promise((resolve) => {
            UserGroupModel.findOne({ name: groupName }, (err, doc) => {
                if (doc == null) resolve(false);
                resolve(true);
            });
        });
    }


    /**
     * Update group permission, return true when operation end successful otherwise return false
     * @param groupName 
     * @param permission 
     */

    public updatePermission(groupName, permissionId: string[]): Promise<boolean> {
        return new Promise((resolve) => {
            UserGroupModel.update({ name: groupName }, { $set: { _permission: permissionId } }, (err, raw) => {
                if (err != null || raw.nModified <= 0) resolve(false)
                resolve(true);

            });
        });
    }

    /**
     * Update groupName, return true when operation end successful otherwise return false
     * @param groupName 
     * @param newGroupName 
     */

    public updateGroupName(groupName, newGroupName): Promise<boolean> {
        return new Promise((resolve) => {
            UserGroupModel.update({ name: groupName }, { $set: { name: newGroupName } }, (err, raw) => {
                if (err != null || raw.nModified <= 0) resolve(false)
                resolve(true);
            });
        });
    }

    /**
     * return all groups from database
     */

    public getAll(): Promise<I_UserGroup[]> {
        return new Promise((resolve) => {
            UserGroupModel.find({}, (err, docs) => {
                if (err != null || docs.length <= 0) resolve(null);
                resolve(docs);
            });
        });
    }

    /**
     * remove group from database return return error when operation end failure
     * @param groupName 
     */

    public remove(groupName: String): Promise<any> {
        return new Promise((resolve) => {
            UserGroupModel.remove({ name: groupName }, (err) => {
                resolve(err)
            });
        });
    }

    /**
     * return user group document from database
     * @param groupName 
     */

    public get(groupName: string): Promise<I_UserGroup> {
        return new Promise(resolve => {
            UserGroupModel.findOne({ name: groupName }).populate('_permission').exec((err, doc) => {
                if (err) throw err;
                resolve(doc);
            });
        });
    }

    // public static checkPermission(group: I_UserGroup, route: string): boolean {
    //     if( group.permission.indexOf() )
    // }



}