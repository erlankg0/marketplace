import {instanse} from "../network.ts";

export const changePassword = () => {
    return instanse.post('/account/change_password')
}

export const losePassword = (email: string) => {
    return instanse.post('/account/lose_password', {email: email})
}