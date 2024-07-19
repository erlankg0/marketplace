import {instance} from "@network/network.ts";
import {IProfile, IEditProfile} from "@network/interfaces/profile/profile.ts";

export const getProfile = (): Promise<IProfile> => {
    return instance.get('account/profile').then(response => response.data);
}

export const putProfile = (profile: IEditProfile) => {
    return instance.put('account/profile/edit', {profile}, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}