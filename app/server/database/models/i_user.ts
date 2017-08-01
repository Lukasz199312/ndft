import mongoose = require("mongoose");
export interface I_User {
    _id: any,
    name: String,
    displayName: String,
    password: String,
    salt: string,
    email: String,
    isActive: { type: Boolean, default: false },
    VerificationCode: String,
    expires: { type: Date, expires: 86400, default: Date }
}