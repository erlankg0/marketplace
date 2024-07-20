import {instance} from "../network.ts";

export const changePassword = () => {
    return instance.post('/accounts/account/change_password')
}

export const losePassword = (email: string) => {
    return instance.post('/accounts/account/lose_password', {email: email})
}