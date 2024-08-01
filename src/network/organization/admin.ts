import {instance} from "@network/network.ts";

export const createOrganization = (formData: FormData) => {
    return instance.post('organization/create-organization', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export const getOrganization = async () => {
    try {
        const response = await instance.get('organization');
        return response
    } catch (error) {
        throw `Error: ${error}`
    }
}