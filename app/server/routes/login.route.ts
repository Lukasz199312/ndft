import { Router } from "express";
import { I_Route } from "../public/typescript/i_route";
import * as express from "express";
import { User } from "../user/user";

export class LoginRoute implements I_Route{
    router : Router;

    constructor() {
        this.router = express.Router();
        this.create();
    }

    public create() {
        this.router.get('/login', function(req, res, next) {


        });
    }

}