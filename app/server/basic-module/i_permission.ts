import { User } from '../user/user';
export interface I_Permission {

    /**
     * check if user has access to component
     */

    checkPermission(user: User): boolean;

    /**
     * return component name
     */

    getName(): string;

}