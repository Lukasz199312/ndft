import { IndexRoute } from "./routes/index.route";
import { UserRoute } from './routes/user.route';
import { Database } from './database/database';
import { GroupRoute } from './routes/group.route';
import { Salt } from "./salt";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as ExpressSession from 'express-session';

//ToDelete
import { EmailSyntaxVerificationComponent } from './auth-module/components/email-syntax-verification.component';
import { PasswordSyntaxVerification } from './auth-module/components/password-syntax-verification.component';
import { PassMD5Component } from './auth-module/components/pass-md5.component';
import { NameSyntaxVerification } from './auth-module/components/name-syntax-verification.component';
import { Component } from './basic-module/component';
import { Test } from './test';
import { MongooseModel } from './database/models/mongoose-model';
import { Module } from './basic-module/module';
import { DatabaseQueryComponent } from './database/components/database.query.component';
import { NodemailerModule } from './nodemailer-module/nodemailer.module';
import { RegisterTxtComponent } from './nodemailer-module/components/register-txt.component';
import * as node from 'crypto';
import { User } from "./user/user";
import { LoginRoute } from "./routes/login.route";


import { AuthDatabaseConfig } from "./database/auth-database.config";
import { GroupDispatcher } from "./user/group-dispatcher";
import { CryptoHash } from "./crypto/crypto-hash";
import { RouteDispatcher } from "./permission/route-dispatcher";
import { I_Route } from "./public/typescript/i_route";
import { SessionRoute } from "./routes/session.route";

import mongoose = require("mongoose");

export class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.db_Connect(this.routes());

        var res = new GroupDispatcher().create("Moderator", ['5952bf2a2e88e00eb4560099', '5952bf2a2e88e00eb4560099']);
        res.then(res => {
            new GroupDispatcher().get('Moderator').then(res2 => {
                console.log("Value res: " + res2);
            })
        })
    }

    public static bootstrap(): Server {
        return new Server();

    }

    public config() {
        // view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');

        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.set("true proxy", 1);

        this.app.use(ExpressSession({
            secret: "zxSd98czw32SdzXfg441",
            resave: false,
            saveUninitialized: true,
        }));

        Salt.password = "ps3XczGron%$@1sdX";
        Salt.secretCode = "xk#$dsfd5T#@okyb#4x5*)!d,adx";

        this.app.get('/test', function (req, res, next) {
            let sess: any = req.session;

            if (sess.views) {
                sess.views++;
                res.setHeader('Content-Type', 'text/html');
                res.write('<p>views: ' + sess.views + '</p>');
                res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
                res.end();
            } else {
                sess.views = 1;
                res.end('welcome to the session demo. refresh!: ' + sess.views);
            }

        });
    }

    public routes() {
        var routeDispatcher = new RouteDispatcher();

        this.app.use((req, res, next) => {
          
            next();
        });

        this.app.use((req, res, next) => {
            console.log(req.originalUrl);
            var result = routeDispatcher.parse(req.originalUrl, req.method.toLowerCase());
            if(result == null) return res.send({complete: false, message: "Unavailable Route"});
            next();
        });

        this.addRoute(new UserRoute(), routeDispatcher);
        this.addRoute(new GroupRoute(), routeDispatcher);
        this.addRoute(new SessionRoute(), routeDispatcher);

        routeDispatcher.registerAll().then (() => {
            console.log(RouteDispatcher.routePathToID('/api/user-name-available/:name','get'));
        })
    }

    public db_Connect(callback?: any) {
        mongoose.connect(AuthDatabaseConfig.getNoAuthorizationAdress(), { useMongoClient: true});

        var connection = mongoose.connection;
        mongoose.Promise = global.Promise;


        connection.on('error', console.error.bind(console, 'connection error: '));
        connection.once('open', () => {
            if (callback !== undefined) callback();
        });

    }

    public addRoute(route: I_Route, routeDispatcher: RouteDispatcher) {
        this.app.use(route.router);
        route.router.stack.forEach(el => {
            routeDispatcher.add(el.route.path, el.regexp, el.route.stack[0].method);
        })
    }

}