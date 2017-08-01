import { I_Route } from "./i_route";

export interface I_UserGroup {
    _id: any,
    name: string,
    _permission: I_Route[]
}