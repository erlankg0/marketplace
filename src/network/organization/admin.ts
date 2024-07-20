import {instance} from "@network/network.ts";

export const createOrganization = () => {
    return instance.post('organization/create-organization');
}