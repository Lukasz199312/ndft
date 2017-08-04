import { NextFunction, Request, Response, Router } from "express";
import { I_Route } from "../public/typescript/i_route";
import * as express from "express";
import { RoutePermission } from "../permission/route-permission";
import { CryptoHash } from "../crypto/crypto-hash";

import userModel = require('../database/models/user.model');
import { AddUser } from "../user/add-user";
import { SyntaxVerification } from "../syntax-verification/syntax-verification";
import { GetUser } from "../user/get-user";
import { DecodeHex } from '../src/decode-hex';

export class UserRoute extends RoutePermission implements I_Route {
    router: Router;

    constructor() {
        super();
        this.router = express.Router();
        this.create();

        //console.log(this.router.stack);
    }

    /**
     * * Create Routes
     */

    public create() {
        this.addUser();
        this.getUser();
        this.isNameAvailable();
        this.isEmailAvailable();
        this.passwordSyntax();
    }

    /**
     * * Add new user to database
     */

    private addUser() {
        this.router.post('/api/user', (req, res, next) => {
            var syntax = new SyntaxVerification();
            var getUser = new GetUser();
            console.log(req.body);
            var name = req.body.name;
            var password = req.body.password;
            var repeatPassword = req.body.repeatPassword;
            var email = req.body.email;

            if (name === undefined) return res.send({ registerComplete: false, message: 'Name is undefined' });
            if (password === undefined) return res.send({ registerComplete: false, message: 'Password is undefined' });
            if (repeatPassword === undefined) return res.send({ registerComplete: false, message: 'Password is undefined' });
            if (email === undefined) return res.send({ registerComplete: false, message: 'Email is undefined' });

            if (password != repeatPassword) return res.send({ registerComplete: false, message: 'The password must be the same' });

            if (!syntax.isEmailAddress(email)) return res.send({ registerComplete: false, message: 'Invalid email address' });
            if (!syntax.Length(6, 32, password)) return res.send({ registerComplete: false, message: 'Invalid password length' });
            if (!syntax.isAlphaNumeric(password)) return res.send({ registerComplete: false, message: 'Invalid password syntax' });

            getUser.by({ name: name }).then(resolve => {
                if (resolve) return res.send({ registerComplete: false, message: 'Username exist in database' });

                getUser.by({ email: email }).then(resolve => {
                    if (resolve) return res.send({ registerComplete: false, message: 'Email Address exist in database' });

                    new AddUser().add(name, password, email, { registerComplete: true }, { registerComplete: false }).then(
                        success => {
                            res.send(success);
                        },
                        error => {
                            res.send(error);
                        });
                });
            });
        });

        this.router.get('/api/user', (req, res, next) => {

        });
    }

    /**
    * * Get {isAvailable : true } when user name exist in database
    */

    private isNameAvailable() {
        this.router.get('/api/user-name-available/:name', (req, res, next) => {
            var name = req.params.name;

            new GetUser().by({ name: name }).then((resolve) => {

                if (resolve == null) return res.send({ isAvailable: true })
                return res.send({ isAvailable: false })

            })
        });
    }

    /**
     * Get {isAvailable : true } when user email address exist in database
     */

    private isEmailAvailable() {
        this.router.get('/api/user-email-available/:email', (req, res, next) => {
            var email = req.params.email;

            new GetUser().by({ email: email }).then((resolve) => {

                if (resolve == null) return res.send({ isAvailable: true })
                return res.send({ isAvailable: false });

            })
        });
    }

    private passwordSyntax() {
        this.router.get('/api/password-syntax/:password', (req, res, next) => {
            var password = DecodeHex.decode(req.params.password);
            var syntax = new SyntaxVerification();
            
            if (!syntax.Length(6, 32, password)) return res.send({ registerComplete: false, message: 'Invalid password length' });
            if (!syntax.isAlphaNumeric(password)) return res.send({ registerComplete: false, message: 'Invalid password syntax' });
            return res.send({ registerComplete: true, message: 'OK!' });
        });
    }

    /**
     * * Get User
     */

    private getUser() {
        this.router.get('/api/user/:id/:name', (req, res, next) => {
            res.send(req.params);
        });

    }

    getName(): string {
        throw new Error("Method not implemented.");
    }

}