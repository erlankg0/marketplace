export interface IOrganizationData {
    id: number,
    imagePath: string,
    name: string,
    description: string,
    createdAt: Date,
}

interface IOrder {
    id: string | number,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    status: string
}

export interface IOrganizationOrders {
    organizationId: string | number,
    organizationName: string,
    organizationDescription: string,
    orders: IOrder[],
    isLast: boolean,
    totalCount: number,
}