import {IName} from "@interfaces/name.ts";
import {IContacts} from "@interfaces/contacts.ts";

export interface IEmployer extends IName, IContacts {
    appointment: string,
    phoneNumber: string
}