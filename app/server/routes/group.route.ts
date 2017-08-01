import { NextFunction, Request, Response, Router } from "express";
import { I_Route } from "../public/typescript/i_route";
import * as express from "express";
import { GroupDispatcher } from "../user/group-dispatcher";

export class GroupRoute implements I_Route {
    router: Router;

    constructor() {
        this.router = express.Router();
        this.create();
    }

    public create() {
        this.add();
        this.update();
        this.remove();

    }

    /**
     * add group with specified permission to database
     */

    public add() {
        this.router.post('/api/group', (req, res, next) => {
            var groupDispatcher = new GroupDispatcher();

            var resposne = this.checkSyntax(req.body.name, req.body.permissions);
            if (resposne) return res.send(resposne);

            groupDispatcher.isExist(req.body.name).then(resolve => {
                if (resolve == true) return res.send({ Complete: false, message: 'Name of this group exist in databse' });

                groupDispatcher.create(req.body.name, req.body.permissions as string[]).then(result => {
                    if (result) return res.send({ Complete: true, message: '' });
                    return res.send({ Complete: false, message: 'Ops, something goes wrong :( !' });
                });
            });
        });
    }

    /**
     * uppdate group, replace old permissions table with new
     */
    public update() {
        this.router.put('/api/group', (req, res, next) => {
            var groupDispatcher = new GroupDispatcher();

            var name = req.body.name;
            var newName = req.body.newName;
            var permissions = req.body.permissions;

            if (name === undefined) {
                return res.send({ Complete: false, message: 'name is undefined ' });
            }
            if (permissions === undefined && newName === undefined) {
                return res.send({ Complete: false, message: 'permission or newName for group must be defined' });
            }

            groupDispatcher.isExist(name).then(resolve => {
                if (resolve == false) return res.send({ Complete: false, message: 'Name of this group does not exist in databse' });

                if (permissions) groupDispatcher.updatePermission(name, permissions as string[])
                if (newName) groupDispatcher.updateGroupName(name, newName);

                return res.send({ Complete: true });
            });

        });
    }

    /**
     * remove group
     */

    public remove() {
        this.router.delete('/api/group/:name', (req, res, next) => {
            var groupDispatcher = new GroupDispatcher();
            var name = req.params.name;

            if (name === undefined) return { Complete: false, message: 'name is undefined ' };

            groupDispatcher.remove(name).then( resolve => {
                if(resolve) return res.send({ Complete: false, message: 'Ops, something goes wrong :( !' });
                return res.send({ Complete: true });
            });

        });
    }

    /**
     * check is request has defined in body name and permissions[]
     * @param name 
     * @param permissions 
     */

    private checkSyntax(name: string, permissions: any): { Complete: boolean, message: string } {
        try {
            permissions = permissions as string[];
        }
        catch (err) {
            return { Complete: false, message: err };
        }

        if (name === undefined) return { Complete: false, message: 'name is undefined ' };
        if (permissions === undefined) return { Complete: false, message: 'permission is undefined' };
        return null;
    }

}