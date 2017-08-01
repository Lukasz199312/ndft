import mongoose = require("mongoose");
import { I_User } from './i_user';


export interface I_UserModel extends I_User, mongoose.Document { }

var userSchema = new mongoose.Schema({
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        displayName: String,
        password: String,
        salt: String,
        email: String,
        isActive: { type: Boolean, default: false },
        VerificationCode: String,
        expires: { type: Date, expires: 86400, default: Date.now }
});


var model = mongoose.model<I_UserModel & mongoose.Document >("Users", userSchema, "users");
export {model};