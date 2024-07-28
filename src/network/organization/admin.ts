import {instance} from "@network/network.ts";

export const createOrganization = (formData: FormData) => {
    return instance.post('organization/create-organization', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}