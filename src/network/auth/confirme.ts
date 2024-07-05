import {instanse} from "../network.ts";
import {IActivateCode} from "../interfaces/auth/activate_code.ts";

export const activate_code = (data: IActivateCode) => {
    return instanse.post('/account/activate_code', data);
}
