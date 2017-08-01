import { Module } from '../basic-module/module';

import * as nodemailer from 'nodemailer';
import * as smtp from 'nodemailer-smtp-transport';

export class NodemailerModule extends Module {
    transporter: nodemailer.Transporter;

    public mailOptions;

    constructor() {
        super(null);
        this.mailOptions = {
            from: 'sampletest@gmail.com',
            to: 'lukasz199312@gmail.com',
            subject: '',
            text: '',
            html: '',
            service: 'Gmail'

        };

        this.transporter = nodemailer.createTransport(smtp({
            service: this.mailOptions.service,
            auth: {
                user: 'd3ftpcode@gmail.com',
                pass: 'zAqwSxcDe'
            }
        }));

    }

    public sendMail() {
        this.transporter.sendMail({
            from: this.mailOptions.from,
            to: this.mailOptions.to,
            subject: this.mailOptions.service,
            html: this.mailOptions.html,
            text: this.mailOptions.text
        });
    }

    public execute(data: any) {
        this.mailOptions.subject = data.mailSubject;
        this.mailOptions.html = data.mailMsg;

        this.sendMail();
    }


}
