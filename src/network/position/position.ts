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