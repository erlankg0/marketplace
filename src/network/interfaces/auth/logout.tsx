import {instance} from "@network/network.ts";

export const logout = () => {
    return instance.post('auth/log-out');
}