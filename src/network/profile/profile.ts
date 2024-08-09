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

export const postSendSubscriptionRequest = () => {
    return instance.post('app-user/send-subscription-request')
}

export const myAds = async (pageNo: number = 0, pageSize: number = 18) => {
    try {
        const response = await instance.get(`account/my-advertisements?pageNumber=${pageNo}&pageSize=${pageSize}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error fetching ads:", error);
        throw error;
    }
}
