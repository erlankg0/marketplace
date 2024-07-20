import {instance} from "@network/network.ts";

export const getAllEquipment = () => {
    return instance.get('equipment/get-all-equipments');
}