import {instance} from "../network.ts";
import {IActivateCode} from "../interfaces/auth/activate_code.ts";

export const activate_code = (data: IActivateCode) => {
    return instance.post(`/accounts/auth/verify-code?email=${data.email}&code=${data.code}`);
}

export const reSendCode = (email: string) => {
    return instance.post(`/accounts/auth/send-code?email=${email}`)
}
