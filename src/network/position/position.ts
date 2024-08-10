import {instance} from "@network/network.ts";
import {AxiosResponse} from "axios";
import {IPosition} from "@network/interfaces/position/position.ts";

export const getAllPosition = async (): Promise<AxiosResponse<IPosition[]>> => {
    try {
        return await instance.get('position/get-all-positions')
    } catch (error) {
        throw `Error: ${error}`
    }
}

export const createPosition = async (formData: FormData) => {
    try {
        return await instance.post('position/add-position', formData)
    } catch (error) {
        throw `Error: ${error}`
    }
}