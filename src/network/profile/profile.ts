import {instance} from "@network/network.ts";
import {IProfile} from "@network/interfaces/profile/profile.ts";

export const getProfile = (): Promise<IProfile> => {
    return instance.get('/profile').then(response => response.data);
}