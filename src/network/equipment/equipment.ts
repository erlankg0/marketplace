import {instance} from "@network/network.ts";

export const getAllEquipment = (pageNo: number = 0, pageSize: number = 18) => {
    return instance.get(`equipment/get-all-equipments?pageNumber=${pageNo}&pageSize=${pageSize}`).then(response => response.data);
}

export const getEquipmentById = async (id: number) => {
    try {
        const response = await instance.get(`equipment/get-equipment-detailed/${id}`)
        return response.data.advertisement
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const searchEquipment = async (query: string) => {
    try {
        const response = await instance.get(`equipment/search-equipment?query=${query}`);
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const buyEquipment = async (id: number) => {
    try {
        const response = await instance.get(`equipment/buy-equipment/${id}`);
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}
export const postEquipment = async (data: FormData) => {
    try {
        const response = await instance.post('equipment/add-equipment', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const deleteEquipment = async (id: number) => {
    try {
        return await instance.delete(`equipment/delete-equipment/${id}`)
    } catch (error) {
        throw `Error: ${error}`
    }
}

export const hideEquipment = async (id: number) => {
    try {
        return await instance.get(`equipment/hide/${id}`);
    } catch (error) {
        throw `Error: ${error}`;
    }
}