import mongoose = require("mongoose");
import { I_UserGroup } from "./i_user-group";

export interface I_RouteModel extends mongoose.Document, I_UserGroup {}

var schema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    path: String,
    method: String
});

var model = mongoose.model<I_RouteModel>('RouteModel', schema, 'routeModel');
export {model};