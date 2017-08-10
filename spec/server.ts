import request = require('supertest');
import req = require('request');
import express = require('express');
import http = require('http');
import cookieParser = require('cookie-parser');
import expressSession = require('express-session');

export class Server {
    public app: express.Application;
    public agent: request.SuperTest<request.Test>;
    public http: http.Server;

    public static bootstrap(): Server {
        var server = new Server();
        server.app = express();
        server.http = http.createServer(server.app);

        server.app.use(cookieParser());
        server.app.use(expressSession({
            secret: "zxSd98czw32SdzXfg441",
            resave: false,
            saveUninitialized: true,
        }));

        server.app.get('/resetSessionTest', (req, res) => {
            req.session.destroy(err => { throw Error(err) });
            res.send();
        });


        server.app.set('port', 5555);
        server.agent = request.agent(server.app);

        return server;
    }

    public resetSession(): Promise<boolean> {
        return new Promise((resolve) => {
            this.agent.get('/resetSessionTest').end((err) => {
                resolve(true);
            })
        })
    }
}