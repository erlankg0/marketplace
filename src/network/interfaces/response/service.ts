import {ISize} from "@network/interfaces/order/order.ts";

export interface IData {
    id: number,
    imageUrl: string,
    name: string,
    description: string,
    price: number,
    authorImageUrl: string,
    authorImage?: string,
    authorFullName: string,
    images?: string[],
    serviceImages?: string[],
    equipmentImages?: string[],
    orderImages?: string[],
    orderStatus?: string,
    orderCandidates?: ICandidates[],
    imagePath?: string,
    date?: string | Date
    contactInfo?: string,
    dateOfExecution?: Date | string,
    orderItems?: ISize[]
    quantity?: number,
    type?: string,
    updatedAt: string | Date,
}

export interface ICandidates {
    name: string,
    description: string
}