export interface IOrder {
    name: string;
    description: string;
    price: number;
    contactInfo: string
}

export interface IDetailOrder extends IOrder {
    authorFullName: string,
    authorImage: string,
    dateOfExecution: Date,
    id: number,
    orderImages: string[],
    orderItems: ISize[],
    orderStatus: string | null,
    price: number
}

export interface ISize {
    size: string,
    quantity: number,
}

export interface ISelectSize {
    category: string,
    sizes: ISize[],
}