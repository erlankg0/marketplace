import {instance} from "@network/network.ts";

export const signIn = async (email: string) => {
    return instance.post(`auth/login?email=${email}`)
};

export const logout = () => {
    return instance.post('auth/log-out');
}