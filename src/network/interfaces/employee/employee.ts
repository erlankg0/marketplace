export interface IEmployee {
    id: number,
    fullName: string,
    email: string,
    orders: number[],
    position: string
}

export interface IEmployeeDetail {
    employeeId: number,
    employeeFullName: string,
    orders: object[],
    isLast: boolean,
    totalCount: number
}