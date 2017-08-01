import mongoose = require("mongoose");
import { I_UserGroup } from "./i_user-group";

interface I_UserGroupModel extends mongoose.Document, I_UserGroup { }

var schema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    _permission : [{ type: mongoose.Schema.Types.ObjectId, ref: 'RouteModel' }]
});

var UserGroupModel = mongoose.model<I_UserGroupModel>("UserGroup", schema, "userGroup");
export = UserGroupModel;