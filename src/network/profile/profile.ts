import {instance} from "@network/network.ts";
import {IEditProfile, IProfile} from "@network/interfaces/profile/profile.ts";

export const getProfile = (): Promise<IProfile> => {
    return instance.get('account/profile').then(response => response.data);
}

export const putProfile = (profile: IEditProfile) => {
    return instance.put('account/profile/edit', {
        name: profile.name,
        surname: profile.surname,
        patronymic: profile.patronymic,
        phoneNumber: profile.phoneNumber
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
export const postImageProfile = async (formData: FormData) => {
    const response = await instance.post('account/profile/uploadImage', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

