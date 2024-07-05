import {instanse} from "../network.ts";
import {IRegister} from "../interfaces/auth/register.ts";

export const register = (date: IRegister) =>{
    console.log(date);
    return instanse.post('/account/register', date)
}