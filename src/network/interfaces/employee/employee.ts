export interface IEmployee {
    fullName: string;
    image: string;
    salary?: number | string
    contactInfo?: string
}

export interface IOrder {
    id: number | string;
    name: string;
    description: string;
    price: number;
    date: Date,
    employees: IEmployee[];
    authorFullName: string;
    authorImage: string;
    authorContactInfo: string;
}

export interface IEmployeeDetail {
    employeeId: number;
    employeeFullName: string;
    orders: IOrder[];
    isLast: boolean;
    totalCount: number;
}
