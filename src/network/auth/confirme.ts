import {instance} from "../network.ts";
import {IActivateCode} from "../interfaces/auth/activate_code.ts";

export const activate_code = (data: IActivateCode) => {
    return instance.post(`auth/confirm-email?email=${data.email}&code=${data.code}`);
}

export const reSendCode = (email: string) => {
    return instance.post(`auth/resend-confirmation-code?email=${email}`)
}
