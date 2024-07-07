import {instance} from "@network/network.ts";
import {IRegister} from "@network/interfaces/auth/register.ts";

export const singUp = (data: IRegister) => {
    const {email, lastName, firstName, patronymicName, phoneNumber} = data;
    const payload = {
        email,
        lastName,
        firstName,
        phoneNumber,
        patronymicName
    }
    return instance.post('/auth/register', payload)
}