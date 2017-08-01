import { I_Route } from "../public/typescript/i_route";
import { Router } from "@types/express";
import * as express from "express";
import { User } from "../user/user";

export class SessionRoute implements I_Route {
    public router: Router;

    public constructor() {
        this.router = express.Router();
        this.create();
    }

    public create() {
        this.getSession();
    }

    /**
     * return current session or return new when not exist
     */

    private getSession() {
        this.router.get('/api/session/current', (req: any, res, next) => {
            var session = (<any>req).session;
            if (session.user === undefined) {
                session.user = new User('Guest', 'Guest');
                return res.send(session.user);
            }
            res.send(session.user);
        });
    }


}