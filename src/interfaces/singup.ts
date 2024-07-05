import {IName} from "@interfaces/name.ts";
import {IContacts} from "@interfaces/contacts.ts";
import {IRemember} from "@interfaces/remember.ts";

export interface ISingUp extends IName, IContacts, IRemember {
    isAuthenticated: boolean;
    password: string,
    password_confirm: string,
}