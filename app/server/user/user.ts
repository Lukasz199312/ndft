//import { AccessLevel } from '../access-level/access-level';
/**
 * It represents abstract user in system
 */
export class User {
    name: string;
    group: string;

    constructor(name: string, group: string) {
        this.group = group;
        this.name = name;
    }
}

