import {instance} from "../network.ts";

export const changePassword = () => {
    return instance.post('/account/change_password')
}

export const losePassword = (email: string) => {
    return instance.post('/account/lose_password', {email: email})
}