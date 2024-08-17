import {IData} from "@network/interfaces/response/service.ts";

export interface ICards {
    advertisement: IData[],
    isLast: boolean,
    totalCount: number
}