import {instance} from "@network/network.ts";

export const getMonitoringCurrentOrders = async () => {
    try {
        return await instance.get('order/organization-current-orders-monitoring')
    } catch (error) {
        throw `Error: ${error}`;
    }
}