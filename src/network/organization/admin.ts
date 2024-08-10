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
        return await instance.get('organization/get-organization-detailed')
    } catch (error) {
        throw `Error: ${error}`
    }
}

export const sendInvitation = async (formData: FormData) => {
    try {
        return await instance.post('organization/send-invitation', formData);
    } catch (error) {
        throw `Error: ${error}`;
    }
}

export const getOrganizationOrdersByStage = async (stage: 'completed' | 'current', pageNo: number = 0, pageSize: number = 4) => {
    try {
        return await instance.get(`order/get-organization-orders-by-stage?pageNumber=${pageNo}&pageSize=${pageSize}&stage=${stage}`)
    } catch (error) {
        throw `Error: ${error}`
    }
}