import { NextFunction, Request, Response, Router } from "express";
import { Database } from '../database/database';
import { I_Route } from "../public/typescript/i_route";
import * as express from "express";
import { RoutePermission } from "../permission/route-permission";
import { User } from "../user/user";

export class IndexRoute extends RoutePermission implements I_Route {
    public api: string = '/api/current-user';
    public router: Router;

    constructor() {
        super();
        this.router = express.Router();
        this.create();
    }

    public create() {
        this.router.get(this.api, (req: any, res, next) => {
            var user: User = this.sessionUserInit(req.session);

            res.send(JSON.stringify(user));
        });
    }

    /**
     * Load current user or return guest
     * @param session 
     */

    public sessionUserInit(session: any): User {
        if (!this.isUserSessionExist(session)) {
            session.user = this.createGuestUser();
            return session.user;
        }
        else return session.user;
    }

    /**
     * return true when user exist in session otherwise return false
     * @param session 
     */

    public isUserSessionExist(session: any): boolean {
        if (session.user === undefined) return false;
        return true;
    }

    /**
     * create guest user
     */

    public createGuestUser(): User {
        return new User('Guest', 'Guest');
    }

    public getName(): string {
        return "Home";
    }
}