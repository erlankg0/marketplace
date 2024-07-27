export interface IOrder {
    name: string;
    description: string;
    price: number;
    contactInfo: string
}


export interface ISize {
    size: string,
    quantity: number,
}

export interface ISelectSize {
    category: string,
    sizes: ISize[],
}