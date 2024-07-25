export interface IADS {
    title: string,
    description: string,
    count: number | 0,
    price: number,
    phone?: string,
    email?: string
}

export interface IOrder {
    title: string;
    description: string;
    price: number;
    phone?: string,
    email?: string,
}


export interface ISize {
    size: string,
    quantity: number,
}

export interface ISelectSize {
    category: string,
    sizes: ISize[],
}