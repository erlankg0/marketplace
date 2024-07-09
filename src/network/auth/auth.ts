import {instance} from "@network/network.ts";

export const singIn = (email: string) => {
    return instance.post(`/auth/login?email=${email}`)
}