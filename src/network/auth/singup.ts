import {instance} from "@network/network.ts";
import {IRegister} from "@network/interfaces/auth/register.ts";

export const singUp = (data: IRegister) => {
    const {email, lastName, firstName, patronymicName, phoneNumber} = data;
    const payload = {
        email,
        surname: lastName,
        name: firstName,
        phoneNumber,
        patronymic: patronymicName
    }
    return instance.post('/auth/sign-up', payload)
}